import React from 'react'
import {Link} from 'react-router-dom'
import {  Button } from 'antd';

export default function Home({history}) {
    return (
        <div>
            <h1>Home</h1>
            <Button><Link to='/login' >login</Link></Button>
            <Button onClick={() => {history.push('/login')}} >logout</Button>
        </div>
    )
}
