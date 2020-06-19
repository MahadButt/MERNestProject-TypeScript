import React, { useState } from 'react';
import { Button, Alert, Container, Row, Col } from 'react-bootstrap';
import Api from '../API';
import { Link } from 'react-router-dom'

function LogoutButton(props: { onClick: any }) {
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
function DeleteButton(props: { onClick: any }) {
    return (
        <Button onClick={props.onClick} style={{ marginLeft: '10px' }}>
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
class UserDashboard extends React.Component<{}, { message: any; }>{
    constructor(props: any) {
        super(props);
        this.state = {
            message: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    destroySesion = () => {
        sessionStorage.clear();
        window.location.href = "/login";
    }
    handleSubmit = (event: any) => {
        const user = JSON.parse(sessionStorage.getItem('user') || '{}');
        Api.delete(`/admin/${user.id}/delete`, {
            headers: { 'authorization': sessionStorage.getItem('token') }
        })
            .then((response) => {
                if (response.data.success === true) {
                    this.destroySesion();
                    window.location.href = "/login";
                }
            }).catch(err => {
                let error: any = err.response.data.message;
                if (err.response) {
                    this.setState({
                        message: error
                    }, function () {
                        console.log(err.response);
                    });
                }
            });
    };
    render() {
        return (
            <div>
                <h1 className="my-4">Welcome back!</h1>
                <LogoutButton onClick={this.destroySesion} />
                <AddUserButton />
                <EditProfileButton />
                <DeleteButton onClick={this.handleSubmit} />
                <UserListButton />
            </div>
        );
    }
}
class App extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }
    componentDidMount() {
        if (sessionStorage.length <= 0) {
            window.location.href = '/login'
        }
    }
    render() {
        return (
            <div>
                <UserDashboard />
            </div>
        );
    }
}

export default App;