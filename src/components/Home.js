import React from 'react';
import { Typography, Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import '../App.scss';
import CardTrip from './CardTrip';

const Home = () => (
  <Query
    query={gql`
      {
        trips {
          description
          name
          _id
          isPublic
        }
      }
    `}
  >
    {({ loading, data, error }) => {
      console.log(data);
      // if (error) {
      //   console.log('other:    ', other)
      // }
      return (
        <div>
          <div className='title'>
            <Typography variant="h3" gutterBottom style={{ textDecoration: 'underline', margin: '2rem 1rem', fontFamily: "'Amatic SC', cursive" }}>
              Mes Routes Trips
            </Typography>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
            { data.trips && data.trips.map((t, i) => (
              <CardTrip name={t.name} description={t.description} id={t._id} photo={t.photo} />
            )) }
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