import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='bg-zinc-800 min-h-screen w-full'>

    <div className='max-w-[1220px] ml-auto mr-auto flex flex-col'>
        <Navbar/>
        <Outlet/>
    </div>
    </div>
  )
}

export default Layout