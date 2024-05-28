import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from "react-icons/md";
import { MdBedroomParent } from "react-icons/md";
import { MdBathroom } from "react-icons/md";
import { HiSave } from "react-icons/hi";
import { FaMessage } from "react-icons/fa6";

function Card({ item }) {
    return (
        <div className='flex gap-10 text-sm w-full'>
            <Link to={`/${item.id}`}>
                <img src={item.images} className=' shadow-black shadow-md w-96 h-36 rounded-md' />
            </Link>
            <div className='w-full flex flex-col gap-4'>
                <Link to={`/${item.id}`} className='font-bold text-green-800'>{item.title}</Link>
                <div className='flex gap-2 items-center'>
                    <MdLocationOn />
                    <div>{item.address}</div>
                </div>
                <div className='p-2 bg-green-200 rounded-sm w-fit h-fit'>${item.price}</div>
                <div className='flex justify-between items-center text-xs'>
                    <div className='flex gap-3'>
                        <div className='bg-green-100 p-1 rounded-sm flex gap-2 items-center'>
                            <MdBedroomParent />
                            <div>{item.bedroom} Bedroom</div>
                        </div>
                        <div className='bg-green-100 p-1 rounded-sm flex gap-2 items-center'>
                            <MdBathroom />
                            <div>{item.bathroom} Bathroom</div>
                        </div>
                    </div>
                    <div className='flex gap-4 justify-center items-center'>
                        <HiSave className='w-4 h-4'/>
                        <FaMessage className='w-3 h-3 mt-1'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card