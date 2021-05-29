import { Route, Redirect } from 'react-router-dom';
import { getSessionData } from './common';

import React from 'react'

export default function PrivateRoute( { component: Component,...rest } ) {
    return (
        <Route {...rest} 
        render={ props => getSessionData() ? <Component {...props} /> : <Redirect to={ {pathname: '/login', state: { from: props.location } } }  />  }
        />
    )
}

