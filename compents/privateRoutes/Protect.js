import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Protect = () => {
    const auth = JSON.parse(localStorage.getItem('logged'))
    // outlet mentioned in CurrentPage or navigate to login Component 
    return auth ? <Outlet /> : <Navigate to={'/login'} />
}

export default Protect