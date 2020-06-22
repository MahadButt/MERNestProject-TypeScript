import React, { useState } from 'react';
import { Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutAdmin, deleteAdmin } from '../../redux'

function LogoutButton(props: any) {
    return (
        <Button onClick={props.onClick}>
            Logout
        </Button>
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
function DeleteButton(props: any) {
    return (
        <Button style={{ marginLeft: '10px' }} onClick={props.onClick}>
            Delete Account
        </Button>
    );
}
function AlertDismissible() {
    const [show, setShow] = useState(true);

    return (
        <>
            <Alert show={show} variant="success">
                <Alert.Heading>How's it going?!</Alert.Heading>
                <p>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
                    lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
                    fermentum.
          </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setShow(false)} variant="outline-success">
                        Close me ya'll!
            </Button>
                </div>
            </Alert>

            {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
        </>
    );
}
function AddUserButton() {
    return (
        <Link to="/addUser">
            <Button style={{ marginLeft: '10px' }}>
                Add User
        </Button>
        </Link>
    );
}
function UserListButton() {
    return (
        <Link to="/users">
            <Button style={{ marginLeft: '10px' }}>
                Users List
        </Button>
        </Link>
    );
}
function App(props: any) {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1 className="my-4">Welcome back!</h1>
                    <LogoutButton onClick={() => props.logoutAdmin()} />
                    <AddUserButton />
                    <EditProfileButton />
                    <DeleteButton onClick={() => props.deleteAdmin()} />
                    <UserListButton />
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
        logoutAdmin: function () {
            dispatch(logoutAdmin());
        },
        deleteAdmin: function () {
            dispatch(deleteAdmin());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);