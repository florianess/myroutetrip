import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Trip from './Trip';
import Login from './Login';
import City from './City';
import TripDetail from './TripDetail';

const SwitchComponent = () => (
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/trip/create/' component={Trip}/>
    <Route path='/trip/:id/' render={(props) => <TripDetail {...props} trip={{...props.location.state && props.location.state.trip }}/>}/>
    <Route path='/login/' component={Login}/>
  </Switch>
);

export default SwitchComponent
