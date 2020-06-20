import React from 'react';
import { Button, Alert, Container, Row, Col, Form } from 'react-bootstrap';
import Api from '../API';
import { Link } from 'react-router-dom'
import { EditFormState } from './interfaces/interfaces'
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
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleInputChange(event: { target: { name: any; value: any; }; }) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit = (event: any) => {
        // this.setState({ info: true });
        Api.put(`/admin/update`, {
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            email: this.state.email
        }, {
            headers: { 'authorization': sessionStorage.getItem('token') }
        })
            .then((response) => {
                console.log(response);
                if (response.data.success) {
                    this.setState({
                        message: response.data.successResponse,
                        isEdited: true
                    });
                }
            }).catch(err => {
                let error;
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
                        console.log(err.response);
                    });
                }
            });
        event.preventDefault();
    };
    render() {
        const isEdited = this.state.isEdited;
        let message;
        let messcolor;
        if (isEdited) {
            message = this.state.message;
            messcolor = 'green';
        } else if (isEdited === false) {
            message = this.state.message;
            messcolor = 'red'
        }
        return (
                <Row className="justify-content-md-center mt-5">
                    <Col md="auto">
                        <h3 className='text-center mb-3'>Update Profile</h3>
                        <strong><p className='text-center' style={{ color: messcolor }} >
                            {message}
                        </p></strong>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Label>Firstname</Form.Label>
                                <Form.Control name="firstname" type="text" placeholder="Enter firstname" value={this.state.firstname} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control name="lastname" type="text" placeholder="Enter lastname" value={this.state.lastname} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name="email" type="email" placeholder="Enter email" value={this.state.email} onChange={this.handleInputChange} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                            </Form.Text>
                            </Form.Group>
                            <Button className="btn btn-block mt-2" variant="primary" type="submit">Update</Button>
                        </Form>
                    </Col>
                </Row>
        );
    }
    ;
}
;
class App extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        if (sessionStorage.length <= 0) {
            window.location.href = '/login'
        }
    }
    destroySesion = () => {
        sessionStorage.clear();
        window.location.href = "/login";
    }
    render() {
        const user = JSON.parse(sessionStorage.getItem('user') || '{}');
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h1 className="my-4">Welcome back!</h1>
                        <LogoutButton onClick={this.destroySesion} />
                        <UserListButton />
                        <HomeButton />
                    </Col>
                </Row>
                <EditFormComp user={user} />
            </Container>
        );
    }
}

export default App;