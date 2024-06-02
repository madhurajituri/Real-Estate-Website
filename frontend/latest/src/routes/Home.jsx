import React, { useContext } from 'react'
import house from '../../public/house.jpg'
import Searchbar from '../components/Searchbar'
import { AuthContext } from '../context/AuthContext'


function Home() {

    const {currentuser} = useContext(AuthContext);
    console.log(currentuser);
    
    return (
        <div className='h-screen -mt-16 flex w-full'>
            <div className='h-full w-2/3 px-10 flex justify-center bg-green-50 flex-col gap-10'>
                <div className="font-bold text-4xl">Find Real Estate and Buy your Dream Place.</div>
                <div className="text-base tracking-tighter">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum accusamus maiores molestiae laboriosam, voluptatem nulla repellat! Odit debitis sequi quaerat, vel totam fugit fugiat reprehenderit molestias fuga, facilis veritatis dolorem tempora vero sint adipisci?</div>
                <Searchbar />
                <div className='flex justify-between'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-2xl font-bold'>16+</h1>
                        <h4 className='text-slate-500'>Years of Experience</h4>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-2xl font-bold'>200</h2>
                        <h4 className='text-slate-500'>Award Gained</h4>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-2xl font-bold'>1200+</h2>
                        <h4 className='text-slate-500'>Property Sold</h4>
                    </div>
                </div>
            </div>
            <div className="bg-[#a9c09e] w-1/3 flex h-full items-center">
                <img className='w-[500px]' src={house}></img>
            </div>
        </div>
    )
}

export default Home