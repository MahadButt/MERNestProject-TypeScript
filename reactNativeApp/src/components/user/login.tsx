import React, { Component, useState, isValidElement } from 'react';
import { Actions } from 'react-native-router-flux';
import { Alert, StyleSheet, TextInput, TouchableOpacity, AsyncStorage, View } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import { LoginState } from './interfaces/interfaces'
import styles from '../../assets/css/main'
import Api from '../API';


export default class App extends Component<{}, LoginState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isLoggedIn: "false"
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit = (event: any) => {
        Api.post('/admin/login', {
            email: this.state.email,
            password: this.state.password
        })
            .then(async (response) => {
                if (response.data.success) {
                    let token = response.data.successResponse.accessToken;
                    let id = response.data.successResponse.id;
                    let email = response.data.successResponse.email;
                    let firstName = response.data.successResponse.firstname;
                    let lastName = response.data.successResponse.lastname;
                    await AsyncStorage.setItem('token', token)
                    await AsyncStorage.setItem('id', JSON.stringify(id))
                    await AsyncStorage.setItem('email', email)
                    await AsyncStorage.setItem('firstName', firstName)
                    await AsyncStorage.setItem('lastName', lastName)
                    await AsyncStorage.setItem('isLoggedIn', 'true')
                    Actions.dashboard();
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
                        isLoggedIn: false
                    }, function () {
                        Alert.alert(error);
                    });
                }
            });
        event.preventDefault();
    };
    render() {
        return (
            <View style={styles.container}>
                <Text h3 style={{ marginBottom: 30 }}>Login</Text>
                <Input
                    style={styles.input}
                    placeholder="Enter Your Email"
                    autoCapitalize='none'
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                />
                <Input
                    style={styles.input}
                    placeholder="Enter your Password"
                    autoCapitalize='none'
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
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