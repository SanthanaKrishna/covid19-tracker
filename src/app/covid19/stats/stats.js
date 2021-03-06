import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';
import './Stats.scss';

export const Stats = ({title, cases, total}) => {
    return (
        <Card className="infoBox">
        <CardContent>
            <Typography className="infoBox__title" color="textSecondary">{title}</Typography>
            <h2 className="infoBox__casses">{cases}</h2>
            <Typography className="infoBox__total" color="textSecondary">{total}</Typography>
        </CardContent>
    </Card>
    )
}
