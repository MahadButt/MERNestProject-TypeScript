import React, { useState } from 'react';
import { Button, Alert, Container, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { editAdmin, logoutAdmin } from '../../redux'
import jwt from 'jsonwebtoken'

function LogoutButton(props: { onClick: any }) {
    return (
        <Button onClick={props.onClick}>
            Logout
        </Button>
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
function HomeButton() {
    return (
        <Link to="/">
            <Button className="ml-2">
                Home
            </Button>
        </Link>
    );
}
function App(props: any) {
    let token: any = sessionStorage.getItem('token');
    const data: any = jwt.decode(token)
    const [firstname, setfirstname] = useState(data.admin.firstname);
    const [lastname, setlastname] = useState(data.admin.lastname);
    const [email, setemail] = useState(data.admin.email);
    const isEdited = props.isEdited;
    let message;
    let messcolor;
    if (isEdited) {
        message = props.message;
        messcolor = 'green';
    } else if (isEdited === false) {
        message = props.message;
        messcolor = 'red'
    }
    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1 className="my-4">Welcome back!</h1>
                    <LogoutButton onClick={() => props.logoutAdmin()} />
                    <UserListButton />
                    <HomeButton />
                </Col>
            </Row>
            <Row className="justify-content-md-center mt-5">
                <Col md="auto">
                    <h3 className='text-center mb-3'>Update Profile</h3>
                    <strong><p className='text-center' style={{ color: messcolor }} >
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
                        <Button className="btn btn-block mt-2" variant="primary" onClick={() => props.editAdmin(firstname, lastname, email)}>Update</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
const mapStateToProps = (state: any) => {
    return {
        firsname:state.admin.firstname,
        lastname: state.admin.lastname,
        email:state.admin.email,
        message: state.admin.message,
        isEdited: state.admin.isEdited
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        logoutAdmin: function () {
            dispatch(logoutAdmin());
        },
        editAdmin: function (firstname: any, lastname: any, email: any) {
            dispatch(editAdmin(firstname, lastname, email))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);