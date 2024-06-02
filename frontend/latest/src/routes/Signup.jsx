import React, { useState } from 'react'
import house from '../../public/house.jpg'
import { Link, useNavigate } from 'react-router-dom';
import apirequest from '../lib/apirequest.js';

function Signup() {
  const [username , setusername] = useState("");
  const [email , setemail] = useState("");
  const [password , setpassword] = useState("");
  const [error , seterror] = useState("");
  const navigate = useNavigate();
  const [isloading , setisloading] = useState(false);

  async function handleregister (e){
    e.preventDefault();
    setisloading(true);
    const formdata = new FormData(e.target);
    const username = formdata.get("username");
    const email = formdata.get("email");
    const password = formdata.get("password");
    // console.log(username,email,password);
    try{
      const res = await apirequest.post("/auth/register" , {
        username , email , password
      })
      // console.log(res.data);
      navigate("/signin");

    }catch(err){
      console.log(err);
      seterror("Failed to create user!");
      // console.log(err.response.data.message);
    }finally{
      setisloading(false);
    }

  }

    return (
      <div className='h-screen -mt-16 flex w-full'>
          <div className='h-full w-2/3 px-10 flex justify-center bg-green-50 flex-col gap-10'>
            <div className='bg-yellow-50 p-10 gap-4 flex flex-col'>
              <div className='text-4xl font-bold'>Create an Account</div>
              <form className='flex flex-col gap-2' onSubmit={handleregister}>
                <input name="username" type="text" className='p-2 rounded-sm border-black w-full h-14' required value={username} onChange={e=>setusername(e.target.value)} placeholder="Username"></input>
                <input name="email" type="email" className='p-2 rounded-sm border-black w-full h-14' required value={email} onChange={e=>setemail(e.target.value)} placeholder='Email'></input>
                <input name="password" type="password" className='p-2 rounded-sm border-black w-full h-14' required value={password} onChange={e=>setpassword(e.target.value)} placeholder='Password'></input>
                <button disabled={isloading} type="submit" className='rounded-sm p-3 bg-green-100 my-4 hover:bg-green-200'>Register</button>
              </form>
              {error && <div className='text-sm text-red-400 -mt-6'>
                {error}
                </div>}
              <Link to="/signin" className='underline text-sm tracking-tight text-green-900'>Have an account?</Link>
            </div>
          </div>
          <div className="bg-[#a9c09e] w-1/3 flex h-full items-center">
              <img className='w-[500px]' src={house}></img>
          </div>
      </div>
  )
}

export default Signup