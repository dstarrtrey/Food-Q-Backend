import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import Login from './src/screens/Login';
import Secured from './src/screens/Secured';


// https://scotch.io/tutorials/react-native-app-with-authentication-and-user-management-in-15-minutes#toc-create-your-base-project
// I used this as a guide, but I havn't setup a link to a Database, as we're not gonna use the storm one. And the storm one is appearantly bought out and gone.


class ReactNativeMainextends Component {

  state = {
    isLoggedIn: false
  }

  render() {

    if (this.state.isLoggedIn) 
      return <Secured 
          onLogoutPress={() => this.setState({isLoggedIn: false})}
        />;
    else 
      return <Login 
          onLoginPress={() => this.setState({isLoggedIn: true})}
        />;
  }

}

AppRegistry.registerComponent(ReactNativeMain , () => ReactNativeMain );