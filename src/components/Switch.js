import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Trip from './Trip';
import Login from './Login';
import City from './City';

export default class Switchh extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/trip/:id/' component={City}/>
        <Route path='/trip/' component={Trip}/>
        <Route path='/login/' component={Login}/>
      </Switch>
    )
  }
}
