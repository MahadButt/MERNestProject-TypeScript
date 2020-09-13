import React, { Component, useState, isValidElement } from 'react';
import { Actions } from 'react-native-router-flux';
import { Image, StyleSheet, TextInput, TouchableOpacity, View, AsyncStorage } from 'react-native';
// import { TextInput } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import { Text, Button, Input } from 'react-native-elements';
import Api from '../components/API';
import Dashboard from '../components/dashboard'
// import android from './assets/n-lg.png'

interface LoginState { [x: number]: any; email: string; password: any; isLoggedIn: any }
export default class App extends Component<{}, LoginState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            password: "",
            // message: "",
            isLoggedIn: "false"
        };
        // this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // handleInputChange(nativeEvent: { target: { name: any; value: any; }; }) {
    //   this.setState({
    //     [nativeEvent.target.name]: nativeEvent.target.value
    //   });
    // }
    handleSubmit = (event: any) => {
        // this.setState({ info: true });
        Api.post('/users/login', {
            email: this.state.email,
            password: this.state.password
        })
            .then(async (response) => {
                if (response.data.success) {
                    let myObj = response.data.successResponse
                    await AsyncStorage.setItem('user', JSON.stringify(myObj))
                    await AsyncStorage.setItem('isLoggedIn', 'true')
                    Actions.dashboard();
                    // window.location.href = "/dashboard";
                }
            }).catch(err => {
                let error: any;
                if (typeof (err.response.data.message) === "string") {
                    error = err.response.data.message;
                } else if (typeof (err.response.data.message) === "object") {
                    error = err.response.data.message[0];
                }
                if (err.response) {
                    this.setState({
                        email: "",
                        password: "",
                        // message: error,
                        isLoggedIn: false
                    }, function () {
                        alert(error);
                    });
                }
                // else if(err.request){
                //     console.log(err.request);
                // }else{
                //     console.log(err.message);
                // }
            });
        event.preventDefault();
    };
    render() {
        // const isLoggedIn = this.state.isLoggedIn;
        // let message;
        // let messcolor;
        // if (isLoggedIn === false) {
        //     message = this.state.message;
        //     messcolor = 'red'
        // }
            return (
                <View style={styles.container}>
                    <Text h3 style={{ marginBottom: 30 }}>Login</Text>
                    {/* <Text style={{ color: messcolor, marginBottom: 30, fontSize: 20 }}>
                        {message}
                    </Text> */}
                    <Input
                        style={styles.input}
                        placeholder="Enter Your Email"
                        // placeholderTextColor='rgba(28,53,63, 1)'
                        autoCapitalize='none'
                        onChangeText={email => this.setState({ email })}
                        defaultValue={this.state.email}
                    />
                    <Input
                        style={styles.input}
                        placeholder="Enter your Password"
                        autoCapitalize='none'
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({ password })}
                        defaultValue={this.state.password}
                    />
                    <TouchableOpacity style={styles.button}
                        onPress={this.handleSubmit}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <Text>Don't have an account? <Text style={styles.LinkText} onPress={() => Actions.signup()}>Sign Up</Text></Text>
                </View>
            );
        }
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
