import React, { Component } from 'react';
import { Button, Alert, Container, Row, Col } from 'react-bootstrap';
import Api from '../API';
import ReactTable from 'react-table-6'
import { Link } from 'react-router-dom'
import 'react-table-6/react-table.css'
import { ListState } from './interfaces/interfaces'

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
class App extends Component<{}, ListState> {
    constructor(props: any) {
        super(props);
        this.state = {
            users: []
        };
    }
    componentWillMount() {
        if (sessionStorage.length <= 0) {
            window.location.href = '/login'
        }
    }
    destroySesion = () => {
        sessionStorage.clear();
        window.location.href = "/login";
    }
    componentDidMount() {
        const user = JSON.parse(sessionStorage.getItem('user') || '{}');
        Api.get('/users/userlist', {
            headers: { 'authorization': sessionStorage.getItem('token') }
        })
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        users: response.data.successResponse
                    });
                }
            }).catch(err => {
                if (err.response) {
                    console.log(err.response);
                }
            });
    };
    render() {
        const { users } = this.state;
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
            <div className="text-center mt-5">
                <div className="mb-5">
                    <h1 className="my-4">Welcome back!</h1>
                    <LogoutButton onClick={this.destroySesion} />
                    <HomeButton/>
                    <EditProfileButton />
                </div>
                <ReactTable
                    data={users}
                    columns={columns}
                    defaultPageSize={5}
                    pageSizeOptions={[5, 10, 15]}
                ></ReactTable>
            </div >
        );
    }
    ;
}
;
export default App;