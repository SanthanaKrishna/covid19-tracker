import React, { useState, useEffect } from 'react';
import { Stats } from './stats/stats';
import { Map } from './map/Map';
import { getFetch } from '../../utils/fetchWrapper';

import {
    FormControl, Select, MenuItem,
    Card, CardContent
} from '@material-ui/core';
import './Covid.scss';
import { Table } from './Table/Table';
import { decSortByNumber } from '../../utils/utils';
import { LineGraph } from './LineGraph/LineGraph';
import "leaflet/dist/leaflet.css";

export const Covid19 = () => {

    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('Worldwide');
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);
    const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([]);

    useEffect(() => {
        getFetch('https://disease.sh/v3/covid-19/all')
            .then(data => setCountryInfo(data))

    }, [])

    useEffect(() => {
        getFetch('https://disease.sh/v3/covid-19/countries')
            .then(data => {
                const countries = data.map(country => (
                    {
                        name: country.country,
                        value: country.countryInfo.iso2
                    }
                ))
                const sortedData = decSortByNumber(data, 'cases');
                setTableData(sortedData);
                setMapCountries(data);
                setCountries(countries)
            })
            .catch(err => alert(JSON.stringify(err, null, 2)))
    }, []);

    const onCountryChange = (event) => {
        const countryCode = event.target.value;
        const params = countryCode === 'Worldwide' ? 'all' : countryCode;
        getFetch(`https://disease.sh/v3/covid-19/countries/${params}`)
            .then(data => {
                setCountryInfo(data)
                setCountry(countryCode);
                setMapCenter([data.countryInfo.lat, data.countryInfo.lng]);
                setMapZoom(5);
            })
            .catch(err => alert(JSON.stringify(err, null, 2)))
    }

    return (
        <div className="covid">
            <div className="covid__container">
                <div className="covid__left">
                    <div className="covid__header">
                        {console.log('render covid header')}
                        <h1>COVID-19 TRACKER</h1>
                        <FormControl className="covid__container">
                            <Select variant="outlined" value={country} onChange={onCountryChange}>
                                <MenuItem value={country}>Worldwide</MenuItem>
                                {
                                    countries?.map((country, index) => (
                                        <MenuItem key={index} value={country.value}>{country.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div className="covid__stats">
                        <Stats title="CoronoVirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
                        <Stats title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
                        <Stats title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
                    </div>
                    <Map countries={mapCountries} center={mapCenter} zoom={mapZoom} />
                </div>
                <Card className="covid__right">
                    <CardContent>
                        <h3>Live Cases</h3>
                        <Table countries={tableData} />
                        <h3>World casess</h3>
                        <LineGraph />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
