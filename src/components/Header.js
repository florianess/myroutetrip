import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Avatar, Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';

import MRTlogo from '../assets/MRTlogo.svg';

const requestBody = idToken => ({
    query: `
      query {
        logOrSign(idToken: "${idToken}")
      }
    `
  })

export default class Header extends React.Component {

    state = { isLog: false, openMenu: false }

  componentDidMount = () => {
    this.renderSignIn() 
  }

  renderSignIn = () => {
    if (window.gapi) {
        window.gapi.signin2.render('g-signin2', {
          onsuccess: this.onSignIn
        });
    } else {
        setTimeout(() => this.renderSignIn(), 100)
    }
  }

  onSignIn = async (googleUser) => {
    var profile = googleUser.getBasicProfile();
    const idToken = googleUser.getAuthResponse().id_token;
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
    window.localStorage.setItem("token", body.data.logOrSign);
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
    return (
        <AppBar style={{ height: 64 }}>
            <Toolbar>
            <IconButton style={{ marginRight: '1rem', backgroundColor: 'transparent' }} disableRipple disableTouchRipple>
                <img src={MRTlogo} style={{ width: 'auto', height: 'auto', maxHeight: 32 }} alt="Logo" />
            </IconButton>
            <Typography variant="h3" color="inherit" style={{ flex: 1 }}>
                <Link to='/' style={{ textDecoration: 'none', color:'white', fontFamily: "'Amatic SC', cursive"}}>
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
            <Menu open={Boolean(anchorEl)} onClose={() => this.setState({ anchorEl: null })} anchorEl={anchorEl}>
                <MenuItem onClick={() => this.onLogOut()}>Log out</MenuItem>
            </Menu>
        </AppBar>
    )
    }
}
