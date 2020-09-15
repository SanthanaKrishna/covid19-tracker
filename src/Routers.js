import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { App } from './container/App'
import { Covid19 } from './app/covid19/Covid19'

export const Routers = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App} />
                <Route path='/covid19' component={Covid19} />
            </Switch>
        </BrowserRouter>
    )
}
