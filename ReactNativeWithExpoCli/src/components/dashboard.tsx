import React, { Component, useState } from 'react';
import { Actions } from 'react-native-router-flux';
import { Image, StyleSheet, FlatList, TextInput, TouchableOpacity,View,ScrollView, AsyncStorage } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import Api from '../components/API';
import Axios from 'axios';

function LogoutButton(props: { onClick: any }) {
    return (
        <Button buttonStyle={{ marginBottom: 10, marginTop: 50 }} title='Logout' type="outline" onPress={props.onClick} />
    );
}
function LogInButton() {
    return (
        <Button buttonStyle={{ marginBottom: 10, marginTop: 50 }} title='LogIn' type="outline" onPress={() => { Actions.login(); }} />
    );
}
function EditProfileButton(props: { onClick: any }) {
    return (
        <Button buttonStyle={{ marginBottom: 10 }} title='Edit Profile' type="outline" onPress={props.onClick} />
    );
}
function DeleteButton(props: { onClick: any }) {
    return (
        <Button buttonStyle={{ marginBottom: 10 }} title='Delete User' type="outline" onPress={props.onClick} />
    );
}
function GuestDashboard() {
    return (
        <LogInButton />
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
    async componentDidMount() {
        let userJson: any = await AsyncStorage.getItem('user');
        let user = JSON.parse(userJson)
        this.setState({ userdata: user });
    }
    logout = () => {
        AsyncStorage.clear();
        this.setState({
            message: "",
            isEdit: "",
            data: []
        });
    }
    handleEditClick() {
        this.setState({ isEdit: true });
    }
    getData() {
        Axios.get('https://jsonplaceholder.typicode.com/users')
            .then((responseJson) => {
                this.setState({ data: responseJson.data })
            }).catch(error => console.log(error));
    }
    handleSubmit = async (event: any) => {
        let user: any = await AsyncStorage.getItem('user');
        let userdata = JSON.parse(user);
        Api.delete(`/users/${userdata.id}/delete`)
            .then((response) => {
                console.log(response);
                if (response.data.success) {
                    AsyncStorage.clear();
                    alert('User Deleted Successfully');
                }
            }).catch(err => {
                let error: any = err.response.data.message;
                if (err.response) {
                    this.setState({
                        message: error,
                        isEdit: false
                    }, function () {
                        console.log(err.response);
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
        const isEdit = this.state.isEdit;
        let EditForm;
        if (isEdit) {
            EditForm = <EditFormComp user={this.state.userdata} />;
        }
        return (
            <ScrollView>
                <LogoutButton onClick={this.logout} />
                <DeleteButton onClick={this.handleSubmit} />
                <EditProfileButton onClick={this.handleEditClick} />
                <Button title='Click to fetch data' type="outline" onPress={() => this.getData()} />
                {EditForm}
                <FlatList
                    data={this.state.data}
                    renderItem={item => this.renderItem(item)}
                    keyExtractor={item => item.id.toString()}
                />
            </ScrollView>
        );
    }
}
interface EditFormState { message: string; firstname: string; lastname: string; email: string; isEdited: any }
class EditFormComp extends React.Component<{ user: any }, EditFormState>{
    constructor(props: any) {
        super(props);
        const { user } = this.props;
        this.state = {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            message: "",
            isEdited: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleSubmit = (event: any) => {
        // this.setState({ info: true });
        Api.put(`/users/${this.props.user.id}/update`, {
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            email: this.state.email
        })
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        message: response.data.successResponse,
                        isEdited: true
                    }, function () {
                        alert("Profile Update Successfully");
                    });
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
                        message: error,
                        isEdited: false
                    }, function () {
                        alert(error);
                    });
                }
            });
        // event.preventDefault();
    };
    render() {
        // const isEdited = this.state.isEdited;
        // let message;
        // let messcolor;
        // if (isEdited) {
        //     message = this.state.message;
        //     messcolor = 'green';
        // } else if (isEdited === false) {
        //     message = this.state.message;
        //     messcolor = 'red'
        // }
        return (
            <View style={styles.container}>
                <Text h3 style={{ marginBottom: 30 }}>Update Profile</Text>
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
                <Button buttonStyle={styles.button} title="Update Profile"
                    onPress={this.handleSubmit} />

            </View>
        );
    }
    ;
}
;
export default class Dashboard extends React.Component<{}, { isLoggedIn: any, isEdit: any, id: any }> {
    constructor(props: any) {
        super(props);
        this.state = { isEdit: false, isLoggedIn: false, id: "" };

    }
    // componentWillMount() {
    //     const user = JSON.parse(AsyncStorage.getItem('user'));
    //     // if (sessionStorage.length <= 0) {
    //     //     window.location.href = "/login"
    //     // }
    // }
    render() {
        AsyncStorage.getItem('isLoggedIn', (err, result) => {
            this.setState({ isLoggedIn: result });
        });

        if (this.state.isLoggedIn == 'true') {
            return (
                <View>
                    <UserDashboard />
                </View>
            );
        } else {
            return (
                <View>
                    <GuestDashboard />
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
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
    input: {
        padding: 10,
        margin: 15,
        width: 300,
        borderColor: '#7a42f4',
        borderWidth: 1
    }
})