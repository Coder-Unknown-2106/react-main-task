import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectLoginCheck = () => {
    const auth = JSON.parse(localStorage.getItem('logged'))
    return !auth ? <Outlet /> : <Navigate to={'/'} />
}

export default ProtectLoginCheck