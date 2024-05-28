import React from 'react'
import { listData, userData } from '../lib/dummydata'
import Card from '../components/Card';
import Chat from '../components/Chat';

function ProfilePage() {
    const user = userData;
    const cards = listData;
    return (
        <div className='w-full h-full flex'>
            <div className='details w-2/3 h-screen overflow-y-scroll -mt-16  bg-green-50 p-10 pt-24 flex flex-col gap-6'>
                <div className='flex justify-between items-center w-full'>
                    <div className='text-3xl font-bold'>User Information</div>
                    <div className='bg-green-200 text-sm cursor-pointer font-semibold text-black hover:bg-green-300 items-center text-center p-2 rounded-md'>
                        <div>Update Profile</div>
                    </div>
                </div>
                <div className='flex flex-col gap-2 text-sm'>
                    <div className='flex justify-between w-80 items-center'>
                        <div>
                            <div className='flex gap-2'>
                                <div className='font-semibold'>Name: </div>
                                <div>{user.name}</div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='font-semibold'>Email: </div>
                                <div>{user.email}</div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='font-semibold'>Contact: </div>
                                <div>{user.contact}</div>
                            </div>
                        </div>
                        <img src={user.img} className='h-16 w-16 rounded-full object-cover'></img>
                    </div>
                </div>
                <div className='flex flex-col gap-8'>
                    <div className='justify-between flex items-center'>
                        <div className='text-lg font-semibold'>My List</div>
                        <div className='bg-green-200 text-sm cursor-pointer font-semibold text-black hover:bg-green-300 items-center text-center p-2 rounded-md'>
                            <div>Add New Post</div>
                        </div>
                    </div>
                    {cards.map((item,index)=>(
                        <Card item={item} key={index}/>
                    ))}
                </div>
            </div>
            <div className='message bg-[#a9c09e] -mt-16 w-1/3 p-10 pt-24 h-screen'>
                <Chat/>
            </div>
        </div>
    )
}

export default ProfilePage