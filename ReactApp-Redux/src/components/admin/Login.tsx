import React, { Component, useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginAdmin } from '../../redux'
import jwt from 'jsonwebtoken'
import { config } from '../../config/secret'

function App(props: any) {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const isLoggedIn = props.isLoggedIn;
    let msg;
    let messcolor;
    if (isLoggedIn === false) {
        msg = props.message;
        messcolor = 'red'
    }
    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center pt-5">
                <Col md="auto">
                    <p className="text-center">Login to access your account</p>
                    <Form>
                        <strong><p className="text-center" style={{ color: messcolor }}>
                            {msg}
                        </p></strong>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Enter email" value={email} onChange={(e: any) => setemail(e.target.value)} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                    </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" value={password} onChange={(e: any) => setpassword(e.target.value)} type="password" placeholder="Password" />
                        </Form.Group>
                        <Button className="btn btn-block mt-2" variant="primary" onClick={() => props.loginAdmin(email, password)}>
                            Login
                            </Button>
                    </Form>
                    <p className="mt-2 text-center">Don't have an account?<Link to="/signup"> Sign Up</Link></p>
                </Col>
            </Row>
        </Container>
    )
}
const mapStateToProps = (state: any) => {
    return {
        email: state.admin.email,
        password: state.admin.password,
        message: state.admin.message,
        isLoggedIn: state.admin.isLoggedIn
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        loginAdmin: function (email: any, password: any) {
            dispatch(loginAdmin(email, password));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);