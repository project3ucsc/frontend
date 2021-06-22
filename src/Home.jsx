import React from 'react'
import {Link} from 'react-router-dom'
import {  Button } from 'antd';
import { getSessionData,removeSessionData } from './utils/common'

export default function Home({history}) {

    
    const logout = () => {
        removeSessionData()
        history.push('/login')
    }
    return (
        <div>
            <h1>Home</h1>
            {
                getSessionData() ? <Button onClick={logout} >logout</Button> :  <Button><Link to='/login' >login</Link></Button>
            }
        </div>
    )
}

