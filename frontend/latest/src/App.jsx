import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Routes, BrowserRouter, Route, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './routes/Home.jsx'
import Listpage from './routes/Listpage.jsx'
import {Layout ,  RequireAuth } from './routes/Layout.jsx'
import Singlepage from './routes/Singlepage.jsx'
import ProfilePage from './routes/ProfilePage.jsx'
import Signup from './routes/Signup.jsx'
import Signin from './routes/Signin.jsx'
import UpdateProfile from './routes/UpdateProfile.jsx'
import CreatePost from './routes/CreatePost.jsx'
import { singlePostLoader } from './lib/loaders.js'

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
          element:<Singlepage/>,
          loader:singlePostLoader
        },
        {
          path:"/signup",
          element:<Signup/>
        },
        {
          path:"/signin",
          element:<Signin/>
        }
      ]
    },
    {
      path:"/",
      element:<RequireAuth/>,
      children:[
        {
          path:"/profile",
          element:<ProfilePage/>
        },
        {
          path:"/profile/update",
          element:<UpdateProfile/>
        },
        {
          path:"/profile/createpost",
          element:<CreatePost/>
        }
      ],
    }
  ])  
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App