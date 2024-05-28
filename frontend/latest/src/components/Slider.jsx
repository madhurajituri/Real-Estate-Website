import React from 'react'
import { IoArrowBackCircle } from "react-icons/io5";
import { useState } from 'react';

function Slider({ images }) {

    const [imageindex, setimageindex] = useState(null);

    const changeslide = (direction) => {
        if(direction==="left"){
            if(imageindex===0){
                setimageindex(images.length-1);
            }
            else{
                setimageindex(imageindex-1);
            }
        }else{
            if(imageindex===images.length-1){
                setimageindex(0);
            }
            else{
                setimageindex(imageindex+1);
            }
        }
    }

    return (
        <div>
            {imageindex !== null &&
                <div className='absolute w-full h-screen top-0 z-[1000] left-1/2 -translate-x-[50%] z-100 bg-zinc-800 flex gap-20 items-center justify-center'>
                    <div className="arrow">
                        <IoArrowBackCircle onClick={()=>changeslide("left")} className='w-20 h-20 text-white text-sm' />
                    </div>
                    <div className="h-full">
                        <img src={images[imageindex]} className='h-full object-cover w-[1220px]' />
                    </div>
                    <div className="arrow">
                        <IoArrowBackCircle onClick={()=>changeslide("right")} className='rotate-180 w-20 h-20 text-white text-sm' />
                    </div>
                    <div className='absolute top-5 cursor-pointer right-10 text-white text-lg' onClick={()=>setimageindex(null)}>X</div>
                </div>
            }
            <div className='flex h-fit w-full gap-10 -mt-16'>
                <div className="w-2/3">
                    <img onClick={()=>setimageindex(0)} src={images[0]} className='object-cover w-full h-[330px] rounded-md border-2 border-gray-400' />
                </div>
                <div className="w-1/3 h-[330px] flex flex-col justify-between">
                    {images.slice(1).map((item, index) => (
                        <img onClick={()=>setimageindex(index+1)} src={item} key={index} className='h-[100px] rounded-md border-2 border-gray-400 object-cover' />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Slider