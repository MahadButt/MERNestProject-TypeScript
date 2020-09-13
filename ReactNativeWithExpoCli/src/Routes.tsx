import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Login from './components/login'
import Signup from './components/signup'
import Home from './components/dashboard'
// hideNavBar={true}   
const Routes = () => (
   <Router>
      <Scene key="root" hideNavBar={true}>   
         <Scene key="dashboard" component={Home} title="Home" initial={true} />
         <Scene key="login" component={Login} title="Login" />
         <Scene key="signup" component={Signup} title="Signup" />
      </Scene>
   </Router>
)
export default Routes