import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Login from './components/user/login'
import Signup from './components/user/signup'
import Home from './components/user/dashboard'
import EditProfile from './components/user/editprofile'
// hideNavBar={true}   
const Routes = () => (
   <Router>
      <Scene key="root" hideNavBar={true}>   
         <Scene key="dashboard" component={Home} title="Home" initial={true} />
         <Scene key="login" component={Login} title="Login" />
         <Scene key="signup" component={Signup} title="Signup" />
         <Scene key="edit" component={EditProfile} title="Edit Profile"/>
      </Scene>
   </Router>
)
export default Routes