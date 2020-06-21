import React, { Component, useState } from 'react';
import { Actions } from 'react-native-router-flux';
import { Alert, FlatList, ActivityIndicator, TouchableOpacity, View, ScrollView } from 'react-native';
import { Text, Button, Input,Image } from 'react-native-elements';
import styles from '../../assets/css/main'
import AsyncStorage from '@react-native-community/async-storage'
import Api from '../API';
import Axios from 'axios';

function LogoutButton(props: { onClick: any }) {
    return (
        <Button buttonStyle={{ margin: 5 }} title='Logout' type="outline" onPress={props.onClick} />
    );
}
function LogInButton() {
    return (
        <Button buttonStyle={{ margin: 5 }} title='LogIn' type="outline" onPress={() => { Actions.login(); }} />
    );
}
function EditProfileButton(props: { onClick: any }) {
    return (
        <Button buttonStyle={{ marginBottom: 5 }} title='Edit Profile' type="outline" onPress={props.onClick} />
    );
}
function DeleteButton(props: { onClick: any }) {
    return (
        <Button buttonStyle={{ margin: 5 }} title='Delete User' type="outline" onPress={props.onClick} />
    );
}
function GuestDashboard() {
    return (
        <View>
            <Text style={styles.item}>login to access your account</Text>
            <LogInButton />
        </View>

    );
}
class UserDashboard extends React.Component<{}, { message: any, data: any[], userdata: any, isEdit: any }>{
    constructor(props: any) {
        super(props);
        this.state = {
            message: "",
            data: [],
            userdata: "",
            isEdit: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.getData = this.getData.bind(this);
    }
    logout = () => {
        AsyncStorage.clear();
        Actions.dashboard();
        this.setState({
            message: "",
            isEdit: "",
            data: []
        });
    }
    handleEditClick() {
        Actions.edit();
    }
    getData() {
        Axios.get('https://jsonplaceholder.typicode.com/users')
            .then((responseJson) => {
                this.setState({ data: responseJson.data })
            }).catch(error => console.log(error));
    }
    handleSubmit = async (event: any) => {
        let id: any = await AsyncStorage.getItem('id');
        // let userdata = JSON.parse(user);
        Api.delete(`/admin/${id}/delete`, {
            headers: { 'authorization': await AsyncStorage.getItem('token') }
        })
            .then((response) => {
                if (response.data.success) {
                    Alert.alert('User Deleted SuccessFully')
                    AsyncStorage.clear();
                }
            }).catch(err => {
                let error: any = err.response.data.message;
                if (err.response) {
                    this.setState({
                        message: error,
                        isEdit: false
                    }, function () {
                        Alert.alert(error);
                    });
                }
            });
    };
    renderItem = (data: { item: any }) => {
        return (
            <TouchableOpacity style={{ borderBottomWidth: 2, paddingVertical: 4, }}>
                <Text style={styles.item}>{data.item.name}</Text>
                <Text style={styles.item}>{data.item.email}</Text>
                <Text style={styles.item}>{data.item.company.name}</Text>
            </TouchableOpacity>
        )

    }
    render() {
        return (
            <ScrollView>
                
                <View style={styles.multiButtonContainer}>
                    <LogoutButton onClick={this.logout} />
                    <DeleteButton onClick={this.handleSubmit} />
                </View>
                <View>
                    <EditProfileButton onClick={this.handleEditClick} />
                    <Button title='Click to fetch data' type="outline" onPress={() => this.getData()} />
                </View>
                <FlatList
                    data={this.state.data}
                    renderItem={item => this.renderItem(item)}
                    keyExtractor={item => item.id.toString()}
                />
            </ScrollView>
        );
    }
}
export default class Dashboard extends React.Component<{}, { isLoggedIn: any, isEdit: any, id: any }> {
    constructor(props: any) {
        super(props);
        this.state = { isEdit: false, isLoggedIn: false, id: "" };

    }
    componentDidMount() {
        // AsyncStorage.getItem('token').then((data: any) => {
        //     if(!data){
        //         Actions.login()
        //     }
        // })
    }
    render() {
        AsyncStorage.getItem('isLoggedIn', (err, result) => {
            this.setState({ isLoggedIn: result });
        });
        if (this.state.isLoggedIn == 'true') {
            return (
                <View style={styles.container}>
                     <Image style={styles.image} source={require('../../assets/images/logo.png')} PlaceholderContent={<ActivityIndicator />}/>
                    <UserDashboard />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <GuestDashboard />
                </View>
            );
        }
    }
}