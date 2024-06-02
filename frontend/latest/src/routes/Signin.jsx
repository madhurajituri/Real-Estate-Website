import React, { useContext, useState } from 'react'
import house from '../../public/house.jpg'
import { Link, useNavigate } from 'react-router-dom';
import apirequest from '../lib/apirequest.js';
import { AuthContext } from '../context/AuthContext.jsx';


function Signin() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const [isloading, setisloading] = useState(false);
  const navigate = useNavigate();

  const { updateuser } = useContext(AuthContext);


  async function handlesignin(e) {
    e.preventDefault();

    setisloading(true);
    const formdata = new FormData(e.target);
    const username = formdata.get("username");
    const password = formdata.get("password");

    try {
      const res = await apirequest.post("/auth/login", {
        username, password
      })
      console.log(res);
      updateuser(res.data);
      navigate("/");

    } catch (err) {
      seterror("Invalid Credentials!");
      console.log(err);
    } finally {
      setisloading(false);
    }

  }

  return (
    <div className='h-screen -mt-16 flex w-full'>
      <div className='h-full w-2/3 px-10 flex justify-center bg-green-50 flex-col gap-10'>
        <div className='bg-yellow-50 p-10 gap-4 flex flex-col'>
          <div className='text-4xl font-bold'>Login into Estatic</div>
          <form className='flex flex-col gap-2' onSubmit={handlesignin}>
            <input name="username" type="text" className='p-2 rounded-sm border-black w-full h-14' required value={username} onChange={e => setusername(e.target.value)} placeholder="Username"></input>
            {/* <input name="email" type="email" className='p-2 rounded-sm border-black w-full h-14' value={email} onChange={e=>setemail(e.target.value)} placeholder='Email'></input> */}
            <input name="password" type="password" className='p-2 rounded-sm border-black w-full h-14' required value={password} onChange={e => setpassword(e.target.value)} placeholder='Password'></input>
            <button disabled={isloading} type="submit" className='rounded-sm p-3 bg-green-100 my-4  hover:bg-green-200'>Login</button>
          </form>
          {error && <div className='text-sm text-red-400 -mt-6'>
            {error}
          </div>}
          <Link to="/signup" className='underline text-sm tracking-tight text-green-900'>Don't have an account? Register here</Link>
        </div>
      </div>
      <div className="bg-[#a9c09e] w-1/3 flex h-full items-center">
        <img className='w-[500px]' src={house}></img>
      </div>
    </div>
  )
}

export default Signin