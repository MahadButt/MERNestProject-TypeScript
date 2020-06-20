import React, { Component } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import Api from '../API';
import { Link } from 'react-router-dom'
import { LoginState } from './interfaces/interfaces'


class App extends Component<{}, LoginState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            password: "",
            message: "",
            isLoggedIn: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        if (sessionStorage.length > 0) {
            window.location.href = "/"
        }
    }
    handleInputChange(event: { target: { name: any; value: any; }; }) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit = (event: any) => {
        Api.post('/admin/login', {
            email: this.state.email,
            password: this.state.password
        })
            .then((response) => {
                if (response.data.success) {
                    let token = response.data.successResponse.accessToken;
                    let id = response.data.successResponse.id;
                    let email = response.data.successResponse.email;
                    let firstname = response.data.successResponse.firstname;
                    let lastname = response.data.successResponse.lastname;
                    let user = {
                        id: id,
                        email: email,
                        firstname: firstname,
                        lastname: lastname
                    }
                    sessionStorage.setItem('token', token)
                    sessionStorage.setItem('user', JSON.stringify(user))
                    window.location.href = "/";
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
                        email: "",
                        password: "",
                        message: error,
                        isLoggedIn: false
                    }, function () {
                        console.log(err.response);
                    });
                }
            });
        event.preventDefault();
    };
    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let message;
        let messcolor;
        if (isLoggedIn === false) {
            message = this.state.message;
            messcolor = 'red'
        }
        return (
            <Container className="mt-5">
                <Row className="justify-content-md-center pt-5">
                    <Col md="auto">
                        <p className="text-center">Login to access your account</p>
                        <strong><p className="text-center" style={{ color: messcolor }}>
                            {message}
                        </p></strong>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name="email" type="email" placeholder="Enter email" value={this.state.email} onChange={this.handleInputChange} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                            </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" value={this.state.password} onChange={this.handleInputChange} type="password" placeholder="Password" />
                            </Form.Group>
                            <Button className="btn btn-block mt-2" variant="primary" type="submit">
                                Login
                                    </Button>
                        </Form>
                        <p className="mt-2 text-center">Don't have an account?<Link to="/signup"> Sign Up</Link></p>
                    </Col>
                </Row>
            </Container>
        );
    }
    ;
}
;
export default App;