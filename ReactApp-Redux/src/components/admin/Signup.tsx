import React, { Component, useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUpAdmin } from '../../redux'
function App(props: any) {
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    let msg;
    let messcolor;
    if (props.isRegisterd) {
        msg = props.message;
        messcolor = 'green';
    } else if (props.isRegisterd === false) {
        msg = props.message;
        messcolor = 'red'
    }
    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center p-5">
                <Col className="p-5" lg='auto'>
                    <h3 className="text-center">Signup</h3>
                    <Form>
                        <strong><p className="text-center" style={{ color: messcolor }}>
                            {msg}
                        </p></strong>
                        <Row>
                            <Col md='6'>
                                <Form.Group>
                                    <Form.Control name="firstname" type="text" placeholder="Enter FirstName" value={firstname} onChange={(e: any) => setfirstname(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md='6'>
                                <Form.Group>
                                    <Form.Control name="lastname" type="text" placeholder="Enter LastName" value={lastname} onChange={(e: any) => setlastname(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md='6'>
                                <Form.Group>
                                    <Form.Control name="email" type="email" placeholder="Enter email" value={email} onChange={(e: any) => setemail(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md='6'>
                                <Form.Group>
                                    <Form.Control name="password" type="password" placeholder="Enter Password" value={password} onChange={(e: any) => setpassword(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button className="btn btn-block mt-2 text-center" variant="primary" onClick={() => props.signUpAdmin(firstname, lastname, email, password)}>
                            Signup
                        </Button>
                    </Form>
                    <p className="text-center mt-3">Have already an account? <Link to="/login">Login Here</Link></p>
                </Col>
            </Row>
        </Container>
    )
}
const mapStateToProps = (state: any) => {
    return {
        firstname: state.admin.firstname,
        lastname: state.admin.lastname,
        email: state.admin.email,
        password: state.admin.password,
        message: state.admin.message,
        isRegisterd: state.admin.isRegisterd
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        signUpAdmin: function (firstname: any, lastname: any, email: any, password: any) {
            dispatch(signUpAdmin(firstname, lastname, email, password));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);