import React from 'react'
import {Link} from 'react-router-dom'
import {  Button } from 'antd';
import { getSessionData,removeSessionData } from './utils/common'

export default function Dashboard({history}) {
    const session = getSessionData()

    const logout = () => {
        removeSessionData()
        history.push('/login')
    }

    return (
        <div>
            <h1>Dashboard</h1>
            {/* <h2>Welcome {session.username} </h2> */}
            {
                session ? <Button onClick={logout} >logout</Button> :  <Button><Link to='/login' >login</Link></Button>
            }
           
            
        </div>
    )
}
