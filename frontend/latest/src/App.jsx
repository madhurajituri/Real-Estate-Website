import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Routes, BrowserRouter, Route, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './routes/Home.jsx'
import Listpage from './routes/Listpage.jsx'
import Layout from './routes/Layout.jsx'
import Singlepage from './routes/Singlepage.jsx'
import ProfilePage from './routes/ProfilePage.jsx'

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/listpage",
          element:<Listpage/>
        },
        {
          path:"/:id",
          element:<Singlepage/>
        },
        {
          path:"/profile",
          element:<ProfilePage/>
        }
      ]
    }
  ])  
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App