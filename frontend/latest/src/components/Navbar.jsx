import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../public/logo.jpg"
import { userData } from '../lib/dummydata';

function Navbar() {
    const user = true;
    const john = userData;
    return (
        <div className='w-[1220px] py-3 px-10 z-10 bg-zinc-800 text-white flex justify-center items-center'>
            <nav className='flex justify-between w-full items-center font-bold'>
                <div className="flex gap-10 items-center justify-center">
                    <Link to="/" className='flex gap-2 hover:scale-[1.2] transition-all'>
                        <img src={logo} className='w-6 h-6 rounded-full'></img>
                        <span>Estatic</span>
                    </Link>
                    <Link to="/" className='hover:scale-[1.2] transition-all'>Home</Link>
                    <Link to="/about" className='hover:scale-[1.2] transition-all'>About</Link>
                    <Link to="/contact" className='hover:scale-[1.2] transition-all'>Contact</Link>
                    <Link to="/agents" className='hover:scale-[1.2] transition-all'>Agents</Link>
                </div>
                {user ? (
                    <div className="flex gap-8 items-center justify-center">
                        <div className='flex gap-2 justify-center items-center'>
                            <img src={john.img} className='object-cover w-10 h-10 rounded-full object-center'></img>
                            <div className='text-md font-bold'>{john.name}</div>
                        </div>
                        <Link to="/profile" className='hover:scale-[1.2] transition-all'>
                            <div className='bg-green-200 relative text-black hover:bg-green-300 items-center text-center p-2 rounded-md'>
                                <div>Profile</div>
                                <div className='bg-red-500 z-100 rounded-full w-4 h-4 text-xs text-white absolute top-0 right-0 translate-x-[20%] -translate-y-[20%]'>3</div>
                            </div>
                        </Link>
                    </div>
                ) : (

                    <div className="flex gap-10 items-center justify-center">
                        <Link to="/signin" className='hover:scale-[1.2] transition-all'>Sign In</Link>
                        <Link to="/signup" className='hover:scale-[1.2] transition-all'><div className='bg-green-200 text-black hover:bg-green-300 items-center text-center p-2 rounded-md'>Signup</div></Link>
                    </div>
                )}
            </nav>
        </div>
    )
}

export default Navbar