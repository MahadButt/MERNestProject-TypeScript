import React, { Component } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import Api from '../API';
import { Link } from 'react-router-dom'
import { SignUpState } from './interfaces/interfaces'

class App extends Component<{}, SignUpState> {
    constructor(props: any) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            message: "",
            isRegisterd: ""
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
        Api.post('/admin/signup', {
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            email: this.state.email,
            password: this.state.password
        })
            .then((response) => {
                console.log(response);
                if (response.data.success) {
                    this.setState({
                        firstname: "",
                        lastname: "",
                        email: "",
                        password: "",
                        message: response.data.successResponse,
                        isRegisterd: true
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
                        firstname: "",
                        lastname: "",
                        email: "",
                        password: "",
                        message: error,
                        isRegisterd: false
                    }, function () {
                        console.log(err.response);
                    });
                }
            });
        event.preventDefault();
    };
    render() {
        const isRegisterd = this.state.isRegisterd;
        let message;
        let messcolor;
        if (isRegisterd) {
            message = this.state.message;
            messcolor = 'green';
        } else if (isRegisterd === false) {
            message = this.state.message;
            messcolor = 'red'
        }
        return (
            <Container className="mt-5">
                <Row className="justify-content-md-center pt-5">
                    <Col md="auto">
                        <h3 className="text-center">Signup</h3>
                        <strong><p className="text-center" style={{ color: messcolor }}>
                            {message}
                        </p></strong>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group as={Row}>
                                <Col md={6}>
                                    <Form.Control name="firstname" type="text" placeholder="Enter FirstName" value={this.state.firstname} onChange={this.handleInputChange} />
                                </Col>
                                <Col md={6}>
                                    <Form.Control name="lastname" type="text" placeholder="Enter LastName" value={this.state.lastname} onChange={this.handleInputChange} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col md={6}>
                                    <Form.Control name="email" type="email" placeholder="Enter email" value={this.state.email} onChange={this.handleInputChange} />
                                </Col>
                                <Col md={6}>
                                    <Form.Control name="password" type="password" placeholder="Enter Password" value={this.state.password} onChange={this.handleInputChange} />
                                </Col>
                            </Form.Group>
                            <Button className="btn btn-block mt-2 text-center" variant="primary" type="submit">
                                Signup
                                </Button>
                        </Form>
                        <p className="text-center mt-3">Have already an account? <Link to="/login">Login Here</Link></p>
                    </Col>
                </Row>
            </Container>
        );
    }
    ;
}
;
export default App;