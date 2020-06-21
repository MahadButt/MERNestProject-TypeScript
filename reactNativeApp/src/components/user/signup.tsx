import React, { Component, useState } from 'react';
import { Actions } from 'react-native-router-flux';
import { Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, View, Alert } from 'react-native';
import { SignUpState } from './interfaces/interfaces'
import { Text, Button, Input } from 'react-native-elements';
import styles from '../../assets/css/main'
import Api from '../API';

export default class Signup extends Component<{}, SignUpState> {
    constructor(props: any) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            isRegisterd: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit = (event: any) => {
        Api.post('/admin/signup', {
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
                        isRegisterd: true
                    }, function () {
                        Alert.alert(response.data.successResponse);
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
                        isRegisterd: false
                    }, function () {
                        Alert.alert(error);
                    }
                    );
                }
            });
    };
    render() {
        return (
            //Style for ScrollView must be applied with contentContainerStyle;
            <ScrollView contentContainerStyle={styles.container}>
                <Text h3 style={{ marginBottom: 30 }}>Signup</Text>
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
                <Button buttonStyle={styles.button} title="SignUp"
                    onPress={this.handleSubmit} />
                <Text>Have already an account?  <Text style={styles.LinkText} onPress={() => Actions.login()}>Login Here</Text></Text>
            </ScrollView>
        );
    }
    ;
}
;
