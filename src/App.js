import React from 'react';

import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import './App.scss';
import Switch from './components/Switch';
import Header from './components/Header'

const client = token => {
  return new ApolloClient({
    uri: "http://localhost:3001/graphql",
    headers: {
      ...token && { Authorization: `Bearer ${token}`}
    }
  });
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFA800"
    },
    secondary: {
      main: "#19FF8B"
    }
  }
})

export default function App() {
  const token = window.localStorage.getItem("token");

  return (
    <ApolloProvider client={client(token)}>
      <MuiThemeProvider theme={theme}>
          <Header />
          <main style={{ margin: 64, paddingTop: '1rem' }}>
            <Switch/>
          </main>
      </MuiThemeProvider>
    </ApolloProvider>
  );  
}