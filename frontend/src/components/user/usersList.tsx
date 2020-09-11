import React, { Component, useState } from 'react';
import { Button, Alert, Container, Row, Col } from 'react-bootstrap';
import ReactTable from 'react-table-6'
import { Link } from 'react-router-dom'
import 'react-table-6/react-table.css'
import { connect } from 'react-redux'
import jwt from 'jsonwebtoken'
import { config } from '../../config/secret'
import { logoutUser,userdata } from '../../redux'

function LogoutButton(props: { onClick: any }) {
    return (
        <Button onClick={props.onClick}>
            Logout
        </Button>
    );
}
function HomeButton() {
    return (
        <Link to="/">
            <Button className="ml-2">
                Home
            </Button>
        </Link>
    );
}
function EditProfileButton() {
    return (
        <Link to="/edit">
            <Button style={{ marginLeft: '10px' }}>
                Edit Profile
        </Button>
        </Link>
    );
}
function App(props: any) {
    if (sessionStorage.token) {
        jwt.verify(sessionStorage.token, config.secret_key, function (err: any, decoded: any) {
            if (err) {
                props.logoutUser();
            } else {
                props.userdata();
            }
        });
    } else {
        props.logoutUser();
    }
    const columns = [{
        Header: 'Id',
        accessor: 'id'
    }, {
        Header: 'User Name',
        accessor: 'userName'
    }, {
        Header: 'Email',
        accessor: 'email'
    }, {
        Header: 'Password',
        accessor: 'password'
    }, {
        Header: 'CreatedDate',
        accessor: 'date_created'
    }];
    return (
        <Container fluid>
            <Row className="mb-5">
                <Col>
                    <h1 className="my-4">Welcome back!</h1>
                    <LogoutButton onClick={() => props.logoutUser()} />
                    <HomeButton />
                    <EditProfileButton />
                </Col>
            </Row>
            <Row>
                <Col>
                    <ReactTable
                        data={props.users}
                        columns={columns}
                        defaultPageSize={5}
                        pageSizeOptions={[5, 10, 15]}
                    ></ReactTable>
                </Col>
            </Row>
        </Container>
    );
}
const mapStateToProps = (state: any) => {
    return {
        users: state.user.users
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        userdata: function () {
            dispatch(userdata())
        },
        logoutUser: function () {
            dispatch(logoutUser());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);