import React, { useState } from 'react';
import { Button, Alert, Container, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import jwt from 'jsonwebtoken'
import { config } from '../../config/secret'
import { addUser, logoutUser } from '../../redux'

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
function UserListButton() {
    return (
        <Link to="/users">
            <Button className="ml-2">
                Users List
        </Button>
        </Link>
    );
}
function App(props: any) {
    if (sessionStorage.token) {
        jwt.verify(sessionStorage.token, config.secret_key, function (err: any, decoded: any) {
            if (err) {
                props.logoutUser();
            }
        });
    } else {
        props.logoutUser();
    }
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [email, setemail] = useState("");
    const isEdited = props.isEdited;
    const usercreated = props.usercreated;
    let message;
    let messcolor;
    if (usercreated) {
        message = props.message;
        messcolor = 'green';
    } else if (usercreated === false) {
        message = props.message;
        messcolor = 'red'
    }
    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1 className="my-4">Welcome back!</h1>
                    <LogoutButton onClick={() => props.logoutUser()} />
                    <UserListButton />
                    <HomeButton />
                </Col>
            </Row>
            <Row className="justify-content-md-center mt-5">
                <Col md="auto">
                    <h3 className="text-center">Create User</h3>
                    <strong><p className="text-center" style={{ color: messcolor }}>
                        {message}
                    </p></strong>
                    <Form>
                        <Form.Group>
                            <Form.Label>Firstname</Form.Label>
                            <Form.Control name="firstname" type="text" placeholder="Enter firstname" value={firstname} onChange={(e: any) => setfirstname(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Lastname</Form.Label>
                            <Form.Control name="lastname" type="text" placeholder="Enter lastname" value={lastname} onChange={(e: any) => setlastname(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Enter email" value={email} onChange={(e: any) => setemail(e.target.value)} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Button className="btn btn-block mt-2" variant="primary" onClick={() => props.addUser(firstname, lastname, email)}>Create User</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = (state: any) => {
    return {
        firsname: state.user.firstname,
        lastname: state.user.lastname,
        email: state.user.email,
        message: state.user.message,
        usercreated: state.user.usercreated
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        addUser: function (firstname: any, lastname: any, email: any) {
            dispatch(addUser(firstname, lastname, email));
        },
        logoutUser: function () {
            dispatch(logoutUser());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);