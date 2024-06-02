import React, { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Layout() {
  return (
    <div className='bg-zinc-800 min-h-screen w-full'>
      <div className='max-w-[1220px] ml-auto mr-auto flex flex-col'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}
function RequireAuth() {

  const {currentuser} = useContext(AuthContext);

  return (
    !currentuser ? (
      <Navigate to="/signin" />
    )
      :
      (
        <div className='bg-zinc-800 min-h-screen w-full'>
          <div className='max-w-[1220px] ml-auto mr-auto flex flex-col'>
            <Navbar />
            <Outlet />
          </div>
        </div>
      )
  )
}

export { Layout, RequireAuth }