import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Home from './pages/Home'
import Repositorio from './pages/Repositorio'
import NotFound from './pages/NotFound'

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/repositorio/:parametro' exact component={Repositorio}/>
                <Route path='*'  component={NotFound}/>
            </Switch>
        </BrowserRouter>
    )
}