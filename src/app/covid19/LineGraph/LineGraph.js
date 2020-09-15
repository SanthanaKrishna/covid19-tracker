import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';
import { getFetch } from '../../../utils/fetchWrapper';

const options = {
    legend: {
        display: false
    },
    elements: {
        point: {
            radius: 0,
        }
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
            label: (tooltipItemm, data) => {
                return numeral(tooltipItemm.value).format('+0,0')
            }
        }
    },
    scales: {
        xAxes: [
            {
                type: 'time',
                time: {
                    format: 'MM/DD/YY',
                    tooltipFormat: 'll'
                }
            }
        ],
        yAxes: [
            {
                gridLines: {
                    display: false
                },
                tricks: {
                    callback: (value, index, values) => {
                        return numeral(value).format('0a')
                    }
                }
            }
        ]
    },

}

export const LineGraph = ({ casesType = 'cases' }) => {
    const [data, setData] = useState({});


    const buildChartData = (data, casesType) => {
        const chartData = [];
        let lastDataPoint;
        // data.casesType is object so we will use for 
        for (let date in data[casesType]) {
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint)
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData;
    }

    useEffect(() => {
        getFetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then(data => {
                const chartData = buildChartData(data, casesType)
                setData(chartData)
                console.log('cases data', chartData)
            })
            .catch(err => alert(JSON.stringify(`cases API: ${err}`, null, 2)))
    }, [casesType])

    return (
        <div>
            <h1>sasdada</h1>
            {
                data?.length > 0 && <Line
                    options={options}
                    data={{
                        datasets: [
                            {
                                data: data,
                                backgroundColor: "rgba(204,16, 52, 0.5)",
                                borderColor: "#CC1034"
                            }
                        ]
                    }} />
            }
        </div>
    )
}
