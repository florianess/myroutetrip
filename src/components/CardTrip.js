import React from 'react'
import {
    Typography,
    Card,
    CardContent,
    CardActionArea,
    CardMedia
} from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function CardTrip({ name, description, photo, id }) {
    return (
        <Link to={{ pathname: `/trip/${id}`, state: { trip: { name, description, photo }}}} style={{ textDecoration: 'none' }}>
            <Card key={id} style={{ width: '25vw', minWidth: 256, margin: '1rem' }}>
                <CardActionArea>
                    <CardMedia style={{ height: 128 }} image="https://festival.liquicity.com/wp-content/uploads/2017/11/Ticketbanner.jpg" title='photo' />
                </CardActionArea>
                <CardContent>
                    <Typography variant="h6">{name}</Typography>
                    <Typography>{description}</Typography>
                </CardContent>
            </Card>
        </Link>
    )
}
