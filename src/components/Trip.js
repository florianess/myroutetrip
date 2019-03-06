import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import '../Trip.scss';
import { 
  TextField,
  Button, 
  Icon,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton
 } from '@material-ui/core';

export default class Trip extends Component {
  
  state = {
    lat: 43.653226,
    lng: -79.3831843,
    zoom: 7,
    list: [
      {lat: 40.7127753, lng: -74.0059728, name: "New York"},
      {lat: 45.5016889, lng: -73.567256, name: "Montréal"},
      {lat: 45.4215296, lng: -75.69719309999999, name: "Ottawa"},
      {lat: 43.653226, lng: -79.3831843, name: "Toronto"}
    ],
    placeID: '',
    name: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  add() {
    const { name, placeID } = this.state;
    let address = name;
    if (address.includes(' ')) {
      address = address.replace(' ', '+');
    }
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBGh70AWF7oc7gAZZNT6j48CEUZZG4RGC0`)
      .then(res => res.json())
      .then(res => {
        if (res.status === 'OK') {
          const loc = res.results[0].geometry.location;
          const name = res.results[0].formatted_address 
          let city = {...loc, name }
          this.setState(state => ({
            zoom: 7,
            lat: loc.lat,
            lng: loc.lng,
            list: [...state.list, city],
            placeID: '',
            name: ''
          }))
        }
      })
  }

  handleKey(e) {
    if (e.key === 'Enter') {
      this.setState({ name: document.getElementById('citySearch').value }, () => {
        this.add();
      })
    }
  }

  focus = (event, lat, lng) => {
    this.setState({lat, lng});
  }

  delete = (event, city) => {
    let cities = this.state.list.filter(c => JSON.stringify(c) !== JSON.stringify(city));
    this.setState({list: cities});
  }

  componentDidMount() {
    this.autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('citySearch'));
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect); 
  }

  handlePlaceSelect = () => {
    const addressSelected = this.autocomplete.getPlace();
    const placeID = addressSelected.place_id;
    const name = addressSelected.formatted_address
    this.setState({ placeID, name });
  }
  

  render() {
    const position = [this.state.lat, this.state.lng];
    this.add = this.add.bind(this);
    this.handleKey = this.handleKey.bind(this);
    const list = this.state.list.map((c, i) => 
      <ListItem button onClick={event => this.focus(event, c.lat,c.lng)} key={i}>
        <ListItemIcon>
          <Icon color="primary">place</Icon>
        </ListItemIcon>
        <ListItemText primary={c.name}/>
        <ListItemSecondaryAction >
          <IconButton>
            <Link to={window.location.pathname.concat('/',c.name)}>
              <Icon color="primary">add_to_photos</Icon>
            </Link>
            
          </IconButton>
          <IconButton onClick={event => this.delete(event,c)}>
            <Icon color="primary">delete</Icon>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>);
    const markers = this.state.list.map((l, i) => 
      <Marker position={[l.lat, l.lng]} key={i}>
        <Popup>
          Etape à {l.name}
        </Popup>
    </Marker>);
    
    return (
      <div className='content' ref='main'>
        <div className='list'>
        <TextField
          id="citySearch"
          label="Ville"
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
          onKeyPress={this.handleKey}
        />
        <Button aria-label="Search" onClick={this.add}>
          <Icon color="primary">
            search
          </Icon>
        </Button>
        <List component="nav">
          {list}
        </List>
        </div>
        <div className="map">
          <Map className="mapHeight" center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
      </Map>
          
        </div>
      </div>
    )
  }
}
