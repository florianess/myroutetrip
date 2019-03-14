import React from 'react'
import { Typography } from '@material-ui/core';
import { Query } from 'react-apollo';
import gql from "graphql-tag";

const TripDetail = ({ match, trip }) => {
  return (
    <Query query={gql`
    {
      trips(id: "${match.params.id}") {
        description
        name
        isPublic
        tripSteps {
          city
        }
      }
    }
  `}>
      {({ data, loading }) => {
        const dataTrip = !loading && data.trips[0];
        return(
          <div>
            <Typography variant="h4">{!loading ? dataTrip.name : (trip && trip.name) || ""}</Typography>
            <Typography>{!loading ? dataTrip.description : (trip && trip.description) || ""}</Typography>
            <Typography variant="h6">Etapes</Typography>
            { !loading && dataTrip.tripSteps.map((s, i) => (
              <Typography key={i}>{s.city}</Typography>
            ))}
          </div>
        )
      }}
    </Query>
  )
}

export default TripDetail