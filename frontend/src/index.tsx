import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, Switch, NavLink, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
// import App from './App';
import dashboard from './components/admin/dashboard';
import Signup from './components/admin/Signup';
import Login from './components/admin/Login';
import userlist from './components/user/usersList'
import editProfile from './components/admin/EditProfile'
import AddUser from './components/user/addUser'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

const Notfound = () => <h1>Not found</h1>;
const routing = (
    <Router>
        <Switch>
            <Route exact path="/" component={dashboard} />
            <Route exact path="/users" component={userlist} />
            <Route exact path="/edit" component={editProfile} />
            <Route exact path="/addUser" component={AddUser} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route component={Notfound} />
        </Switch>
    </Router>
);

ReactDOM.render(
    routing,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
