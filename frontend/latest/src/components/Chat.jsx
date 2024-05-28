import React, { useState } from 'react'
import { userData } from '../lib/dummydata'

function Chat() {
    const john = userData;
    const [close , setclose] = useState(false);
    const [message , setmessage] = useState("");
    return (
        <div className='w-full h-full'>
            <div className='messages'>
                <div className='text-xl font-bold'>Messages</div>
                <div className='flex flex-col gap-3 mt-4 h-[300px] overflow-y-scroll px-2 scroll-smooth'>
                    <div className='flex gap-2 w-full h-fit p-2 cursor-pointer bg-yellow-50 rounded-lg'>
                        <img src={john.img} className='w-8 h-8 rounded-full object-cover'></img>
                        <div className='text-xs flex flex-col justify-between'>
                            <div className='font-bold'>{john.name}</div>
                            <div className='break-all'>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</div>
                        </div>
                    </div>
                    <div className='flex gap-2 w-full h-fit p-2 cursor-pointer bg-yellow-50 rounded-lg'>
                        <img src={john.img} className='w-8 h-8 rounded-full object-cover'></img>
                        <div className='text-xs flex flex-col justify-between'>
                            <div className='font-bold'>{john.name}</div>
                            <div className='break-all'>Lorem ipsum dolor sit amet consectetur</div>
                        </div>
                    </div>
                    <div className='flex gap-2 w-full h-fit p-2 cursor-pointer bg-yellow-50 rounded-lg'>
                        <img src={john.img} className='w-8 h-8 rounded-full object-cover'></img>
                        <div className='text-xs flex flex-col justify-between'>
                            <div className='font-bold'>{john.name}</div>
                            <div className='break-all'>Lorem ipsum dolor</div>
                        </div>
                    </div>
                    <div className='flex gap-2 w-full h-fit p-2 cursor-pointer bg-yellow-50 rounded-lg'>
                        <img src={john.img} className='w-8 h-8 rounded-full object-cover'></img>
                        <div className='text-xs flex flex-col justify-between'>
                            <div className='font-bold'>{john.name}</div>
                            <div className='break-all'>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</div>
                        </div>
                    </div>
                    <div className='flex gap-2 w-full h-fit p-2 cursor-pointer bg-yellow-50 rounded-lg'>
                        <img src={john.img} className='w-8 h-8 rounded-full object-cover'></img>
                        <div className='text-xs flex flex-col justify-between'>
                            <div className='font-bold'>{john.name}</div>
                            <div className='break-all'>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</div>
                        </div>
                    </div>
                    <div className='flex gap-2 w-full h-fit p-2 cursor-pointer bg-yellow-50 rounded-lg'>
                        <img src={john.img} className='w-8 h-8 rounded-full object-cover'></img>
                        <div className='text-xs flex flex-col justify-between'>
                            <div className='font-bold'>{john.name}</div>
                            <div className='break-all'>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</div>
                        </div>
                    </div>
                </div>
            </div>
            {!close && <div className='chatbox border-2 border-gray-400 w-full rounded-md mt-10'>
                <div className="top bg-green-200 w-full h-10 rounded-t-md p-1 px-2 flex justify-between items-center">
                    <div className='flex gap-2 items-center justify-center'>
                        <img src={john.img} className='w-8 h-8 rounded-full object-cover'></img>
                        <div className='font-semibold text-sm'>{john.name}</div>
                    </div>
                    <div onClick={()=>setclose(true)} className='cursor-pointer'>X</div>
                </div>
                <div className="center bg-green-50 w-full p-2 h-[220px] overflow-y-scroll gap-4 flex flex-col text-xs">
                    <div className="flex flex-col gap-1 w-fit max-w-[50%] bg-yellow-50 p-2 rounded-md ">
                        <div className=''>Lorem ipsum dolor sit amet consectetur</div>
                        <div className='text-gray-400'>1 hour ago</div>
                    </div>
                    <div className="flex flex-col gap-2 self-end text-right w-fit max-w-1/2 bg-yellow-50 p-2 rounded-md">
                        <div className=''>Lorem ipsum</div>
                        <div className='text-gray-400'>1 hour ago</div>
                    </div>
                    <div className="flex flex-col gap-2 w-fit max-w-[50%] bg-yellow-50 p-2 rounded-md">
                        <div className=''>Lorem ipsum dolor sit amet consectetur</div>
                        <div className='text-gray-400'>1 hour ago</div>
                    </div>
                    <div className="flex flex-col gap-2 w-fit max-w-[50%] self-end text-right bg-yellow-50 p-2 rounded-md">
                        <div className=''>Lorem ipsum dolor sit amet consectetur</div>
                        <div className='text-gray-400'>1 hour ago</div>
                    </div>
                    <div className="flex flex-col gap-2 w-fit max-w-[50%] bg-yellow-50 p-2 rounded-md">
                        <div className=''>Lorem ipsum dolor sit amett explicabo?</div>
                        <div className='text-gray-400'>1 hour ago</div>
                    </div>
                    <div className="flex flex-col gap-2 w-fit max-w-[50%] self-end text-right bg-yellow-50 p-2 rounded-md">
                        <div className=''>Lorem ipsum dolor sit ament explicabo?</div>
                        <div className='text-gray-400'>1 hour ago</div>
                    </div>
                    <div className="flex flex-col gap-2 w-fit max-w-[50%] bg-yellow-50 p-2 rounded-md">
                        <div className=''>Lorem ipsum dolor provident explicabo?</div>
                        <div className='text-gray-400'>1 hour ago</div>
                    </div>
                </div>
                <div className="bottom w-full bg-green-200 rounded-b-md border-2 h-10 justify-between gap-3 py-1 px-2 flex">
                    <input value={message} onChange={(e)=>setmessage(e.target.value)} className='w-full h-full rounded-lg' type="text"></input>
                    <div className='bg-yellow-100 text-sm cursor-pointer text-black hover:bg-green-300 items-center text-center p-2 rounded-md'>
                        <div>Send</div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Chat