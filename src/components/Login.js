import React, { Component } from 'react';
import {
  TextField,
  Button
} from '@material-ui/core';
import '../Login.scss';

export default class Login extends Component {
    state = {

    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleClick = () => {
        console.log(this.state.email);    
    }

  render() {
    return (
      <div className='login'>
        <TextField
            className='input'
            label="Email"
            margin="normal"
            onChange={this.handleChange('email')}
        />
        <TextField
            className='input'
            label="Password"
            type="password"
            margin="normal"
            onChange={this.handleChange('password')}
        />
        <Button color="inherit" className='connexion' onClick={this.handleClick}>
            Se connecter
        </Button>
      </div>
    )
  }
}