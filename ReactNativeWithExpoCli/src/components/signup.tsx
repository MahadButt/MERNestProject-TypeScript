import React, { Component, useState } from 'react';
import { Actions } from 'react-native-router-flux';
import { Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, View, AsyncStorage } from 'react-native';
// import { TextInput } from 'react-native-paper'
import { Text, Button, Input } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import Api from '../components/API';


interface SignUpState { [x: number]: any; firstname: string; lastname: string; email: string; password: any; isRegisterd: any }
export default class Signup extends Component<{}, SignUpState> {
    constructor(props: any) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            // message: "",
            isRegisterd: ""
        };
        // this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // handleInputChange(event: { target: { name: any; value: any; }; }) {
    //     this.setState({
    //         [event.target.name]: event.target.value
    //     });
    // }
    handleSubmit = (event: any) => {
        // this.setState({ info: true });
        Api.post('/users/signup', {
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            email: this.state.email,
            password: this.state.password
        })
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        firstname: "",
                        lastname: "",
                        email: "",
                        password: "",
                        // message: response.data.successResponse,
                        isRegisterd: true
                    }, function () {
                        alert(response.data.successResponse);
                    });
                }
            })
            .catch(err => {
                let error: any;
                if (typeof (err.response.data.message) === "string") {
                    error = err.response.data.message;
                } else if (typeof (err.response.data.message) === "object") {
                    error = err.response.data.message[0];
                }
                if (err.response) {
                    this.setState({
                        firstname: "",
                        lastname: "",
                        email: "",
                        password: "",
                        // message: error,
                        isRegisterd: false
                    }, function () {
                        alert(error);
                    }
                    );
                }
                // else if(err.request){
                //     console.log(err.request);
                // }else{
                //     console.log(err.message);
                // }
            });
        // event.preventDefault();
    };
    render() {
        // const isRegisterd = this.state.isRegisterd;
        // let message;
        // let messcolor;
        // if (isRegisterd) {
        //     message = this.state.message;
        //     messcolor = 'green';
        // } else if (isRegisterd === false) {
        //     message = this.state.message;
        //     messcolor = 'red'
        // }
        return (
            //Style for ScrollView must be applied with contentContainerStyle;
            <ScrollView contentContainerStyle={styles.container}>
                <Text h3 style={{ marginBottom: 30 }}>Signup</Text>
                {/* <Text style={{ color: messcolor, marginBottom: 30,fontSize: 18  }}>
                    {message}
                </Text> */}
                <Input
                    style={styles.input}
                    placeholder="Enter Your FirstName"
                    value={this.state.firstname}
                    autoCapitalize='none'
                    onChangeText={firstname => this.setState({ firstname })}
                />
                <Input
                    style={styles.input}
                    placeholder="Enter Your LastName"
                    value={this.state.lastname}
                    autoCapitalize='none'
                    onChangeText={(lastname) => this.setState({ lastname })}
                />
                <Input
                    style={styles.input}
                    placeholder="Enter Your Email"
                    value={this.state.email}
                    autoCapitalize='none'
                    onChangeText={(email) => this.setState({ email })}
                />
                <Input
                    style={styles.input}
                    placeholder="Enter Your Password"
                    value={this.state.password}
                    autoCapitalize='none'
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />
                {/* <Button title="Signup" type="outline" style={styles.button}
                    onPress={this.handleSubmit}/> */}
                <Button buttonStyle={styles.button} title="SignUp"
                    onPress={this.handleSubmit} />
                {/* <TouchableOpacity style={styles.button}
                    onPress={this.handleSubmit}>
                    <Text style={styles.buttonText}>SignUp</Text>
                </TouchableOpacity> */}
                <Text>Have already an account?  <Text style={styles.LinkText} onPress={() => Actions.login()}>Login Here</Text></Text>
            </ScrollView>
        );
    }
    ;
}
;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        padding: 10,
        margin: 15,
        width: 300,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    button: {
        width: 300,
        margin: 15,
        backgroundColor: "skyblue",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
    },
    LinkText: {
        fontSize: 18,
        color: 'skyblue',
    }
});