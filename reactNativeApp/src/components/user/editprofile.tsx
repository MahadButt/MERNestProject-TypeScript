import React, { Component, useState } from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, TextInput, TouchableOpacity,ActivityIndicator, View, Alert } from 'react-native';
import { EditFormState } from './interfaces/interfaces'
import { Text, Button, Input ,Image} from 'react-native-elements';
import styles from '../../assets/css/main'
import AsyncStorage from '@react-native-community/async-storage'
import Api from '../API';

function LogoutButton(props: { onClick: any }) {
    return (
        <Button buttonStyle={{ margin: 5 }} title='Logout' type="outline" onPress={props.onClick} />
    );
}
function HomeButton() {
    return (
        <Button buttonStyle={{ margin: 5 }} title='Home' type="outline" onPress={() => Actions.dashboard()} />
    );
}
export default class App extends React.Component<{}, EditFormState> {
    constructor(props: any) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount = () => {
        AsyncStorage.getItem('firstName').then((firstName: any) => this.setState({ 'firstName': firstName }))
        AsyncStorage.getItem('lastName').then((lastName: any) => this.setState({ 'lastName': lastName }))
        AsyncStorage.getItem('email').then((email: any) => this.setState({ 'email': email }))
    }
    setFirstName = (value: any) => {
        AsyncStorage.setItem('firstName', value)
        this.setState({ firstName: value })
    }
    setlastName = (value: any) => {
        AsyncStorage.setItem('lastName', value)
        this.setState({ lastName: value })
    }
    setEmail = (value: any) => {
        AsyncStorage.setItem('email', value)
        this.setState({ email: value })
    }
    handleSubmit = async (event: any) => {
        Api.put('/admin/update', {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email
        }, {
            headers: { 'authorization': await AsyncStorage.getItem('token') }
        })
            .then((response) => {
                if (response.data.success) {
                    Alert.alert("Profile Updated Successfully");
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
                    Alert.alert(error);
                }
            });
    };
    destroySession = () => {
        AsyncStorage.clear();
        Actions.dashboard();
    }
    render() {
        return (
            <View style={styles.container}>
                 <Image style={styles.image} source={require('../../assets/images/mahad.jpg')} PlaceholderContent={<ActivityIndicator />}/>
                <View style={styles.multiButtonContainer}>
                    <LogoutButton onClick={this.destroySession} />
                    <HomeButton />
                </View>
                <Text h3 style={{ marginBottom: 30 }}>Edit Profile</Text>
                <Input
                    style={styles.input}
                    value={this.state.firstName}
                    autoCapitalize='none'
                    onChangeText={(firstName) => this.setState({ firstName })}
                />
                <Input
                    style={styles.input}
                    value={this.state.lastName}
                    autoCapitalize='none'
                    onChangeText={(lastName) => this.setState({ lastName })}
                />
                <Input
                    style={styles.input}
                    value={this.state.email}
                    autoCapitalize='none'
                    onChangeText={(email) => this.setState({ email })}
                />
                <Button buttonStyle={styles.button} title="Update"
                    onPress={this.handleSubmit} />
            </View>
        );
    }
}
