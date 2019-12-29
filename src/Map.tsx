import React from 'react';
import './Map.css';
import {Map as LeafletMap, TileLayer, GeoJSON} from 'react-leaflet';
import {LatLngLiteral} from 'leaflet';
import { GeoJsonObject } from 'geojson';

const defaultGPX = 'resources/gpx/meerbeek.gpx';

export interface State{
    lat: number,
    lng: number,
    zoom: number,
    currentGPX: string,
    fetchedGPX: GeoJsonObject | undefined
}

export interface Props{
    gpx: string | undefined
}

export class Map extends React.Component<Props,State>{
    constructor(props: Props){
        super(props);
        this.state = {
            lat: 50.8833,
            lng: 4.6,
            zoom: 12,
            currentGPX: defaultGPX,
            fetchedGPX: undefined
        };
    }

    fetchGPX(gpx: string){
        if(gpx !== this.state.currentGPX){
            fetch(gpx.replace('.gpx', '.json'))
            .then(response => {
                response.json().then( json => {
                    this.setState({
                        currentGPX: gpx,
                        fetchedGPX: json
                    });
                })
            })
        }
    }

    render(){
        const position: LatLngLiteral = {
            lat: this.state.lat, 
            lng: this.state.lng
        }

        this.fetchGPX(this.props.gpx ? this.props.gpx : 'resources/gpx/meerbeek.gpx');

        const geojsonLayer = this.state.fetchedGPX ? (<GeoJSON data={this.state.fetchedGPX} />) : null;
        return (
            <LeafletMap center={position} zoom={this.state.zoom}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
              />
              {geojsonLayer}
            </LeafletMap>
          );
    }
}