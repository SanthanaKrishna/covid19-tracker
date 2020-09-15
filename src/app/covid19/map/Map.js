import React from 'react';
import { Map as LeafletMap, TileLayer, Circle, Popup } from 'react-leaflet';
import './Map.scss';
import numeral from 'numeral';

export const Map = ({ countries, center, zoom }) => {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright>OpenStreetMap</a> contributors'
                />

            </LeafletMap>
        </div>
    )
}


const casesTypeColors = {
    cases: {
        hex: '#CC1034',
        rgb: 'rgb(204,16,52,0.5)',
        half_op: 'rgba(125,215,29,0.5)',
        multiplier: 800,
    },
    recovered: {
        hex: '#7dd71d',
        rgb: 'rgb(125, 215,29)',
        half_op: 'rgba(125,215,29,0.5)',
        multiplier: 1200
    },
    deaths: {
        hex: '3fb4443',
        rgb: 'rbg(251,68,67)',
        half_op: 'rgba(251,68,67,0.5)',
        multiplier: 2000,
    }
}

export const showDataOnMap = (data, casesType = 'cases') => (
    data.map(country => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.lng]}
            fillOpcaity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }
        >
            <Popup>
                <h1>Im a Pop</h1>
            </Popup>
        </Circle>
    ))
);