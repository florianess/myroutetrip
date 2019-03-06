import React, { Component } from 'react';
import {
  TextField,
  Button
} from '@material-ui/core';
import '../Login.scss';

export default class City extends Component {
  render() {
    return (
      <div>
        Etape de {this.props.match.params.id}
      </div>
    )
  }
}