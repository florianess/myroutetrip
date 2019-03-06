import React from 'react';
import {
  Typography,
  Icon
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import '../App.scss';

const Home = () => (
  <Query
    query={gql`
      {
        trips {
          description
          name
        }
      }
    `}
  >
    {({ loading, data }) => {
      console.log(data);
      return (
        <div>
          <div className='title'>
            <Typography variant="display3" gutterBottom align='center'>
              Mes Routes Trips
            </Typography>
          </div>
          <div className='center_circle'>
            <Link to='/trip'>
              <Icon color="primary" style={{ fontSize: 84 }}>
                add_circle
              </Icon>
            </Link>
          </div>
        </div>
      )
    }}
  </Query>
);

export default Home