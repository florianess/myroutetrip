import React, { Component } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography,
  Avatar,
  Menu,
  MenuItem
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import './App.scss';
import Switch from './components/Switch';

const client = token => {
  return new ApolloClient({
    uri: "http://localhost:3001/graphql",
    headers: {
      ...token && { Authorization: `Bearer ${token}`}
    }
  });
}

const requestBody = idToken => ({
  query: `
    query {
      logOrSign(idToken: "${idToken}")
    }
  `
})

class App extends Component {

  state = { isLog: false, openMenu: false }

  componentDidMount = () => {
    this.renderSignIn() 
  }

  renderSignIn = () => {
    window.gapi.signin2.render('g-signin2', {
      onsuccess: this.onSignIn
    });
  }

  onSignIn = async (googleUser) => {
    var profile = googleUser.getBasicProfile();
    const idToken = googleUser.getAuthResponse().id_token
    console.log(idToken); // This is null if the 'email' scope is not present.
    this.setState({
      isLog: true,
      photo: profile.getImageUrl(),
      name: profile.getName()
    })
    const res = await fetch('http://localhost:3001/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody(idToken)),
      headers: { "Content-Type": "application/json" }
    });
    const body = await res.json();
    console.log(body)
    window.localStorage.setItem("token", body.data.logOrSign)
  }

  onLogOut = () => {
    window.gapi.auth2.getAuthInstance().signOut().then(() => {
      this.setState({ isLog: false, anchorEl: null });
      this.renderSignIn();
    });
    window.localStorage.removeItem("token")
  }
  
  render() {
    const { isLog, photo, name, anchorEl } = this.state;

    const token = window.localStorage.getItem("token");

    return (
      <ApolloProvider client={client(token)}>
        <div className='app'>
          <div className="top">
            <AppBar position="static">
              <Toolbar>
                <Typography variant="title" color="inherit" style={{ flex: 1 }}>
                  <Link to='/' style={{ textDecoration: 'none', color:'white'}}>
                    My Route Trip
                  </Link>
                </Typography>
                <div>
                  { isLog ?
                    <Avatar alt={name} src={photo} onClick={(e) => this.setState({ anchorEl: e.currentTarget })} style={{ cursor: 'pointer' }}/> :
                    <div id="g-signin2"/>
                  }
                </div> 
              </Toolbar>
            </AppBar>
          </div>
          <div className='main'><Switch/></div>
          <Menu open={Boolean(anchorEl)} onClose={() => this.setState({ anchorEl: null })} anchorEl={anchorEl}>
            <MenuItem onClick={() => this.onLogOut()}>Log out</MenuItem>
          </Menu>
        </div>
      </ApolloProvider>
    );  
  }
}

export default App;
