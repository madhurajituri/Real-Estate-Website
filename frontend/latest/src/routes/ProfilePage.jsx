import React, { Suspense, useContext, useEffect } from 'react'
import { listData, userData } from '../lib/dummydata'
import Card from '../components/Card';
import Chat from '../components/Chat';
import apirequest from '../lib/apirequest.js';
import { Await, Link, useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import noAvatar from '../../public/noAvatar.png'
import List from '../components/List.jsx';

function ProfilePage() {
    // const cards = listData;
    const navigate = useNavigate();
    const data = useLoaderData();

    const { currentuser, updateuser } = useContext(AuthContext);

    const handlelogout = async () => {
        try {
            await apirequest.post("/auth/logout");
            updateuser(null);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-full h-full flex'>
            <div className='details w-2/3 h-screen overflow-y-scroll -mt-16  bg-green-50 p-10 pt-24 flex flex-col gap-6'>
                <div className='flex justify-between items-center w-full'>
                    <div className='text-3xl font-bold'>User Information</div>
                    <div className='flex gap-2'>
                        <div className='bg-green-200 text-sm cursor-pointer font-semibold text-black hover:bg-green-300 items-center text-center p-2 rounded-md'>
                            <Link to="/profile/update">Update Profile</Link>
                        </div>
                        <div onClick={handlelogout} className='bg-yellow-100 text-sm cursor-pointer font-semibold text-black hover:bg-yellow-200 items-center text-center p-2 rounded-md'>
                            <div>Logout</div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2 text-sm'>
                    <div className='flex justify-between w-80 items-center'>
                        <div>
                            <div className='flex gap-2'>
                                <div className='font-semibold'>Name: </div>
                                <div className='capitalize'>{currentuser.username}</div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='font-semibold'>Email: </div>
                                <div>{currentuser.email}</div>
                            </div>
                        </div>
                        <img src={currentuser.profile || noAvatar} className='h-16 w-16 rounded-full object-cover'></img>
                    </div>
                </div>
                <div className='flex flex-col gap-8'>
                    <div className='justify-between flex items-center'>
                        <div className='text-lg font-semibold'>My List</div>
                        <div className='bg-green-200 text-sm cursor-pointer font-semibold text-black hover:bg-green-300 items-center text-center p-2 rounded-md'>
                            <Link to="/profile/createpost"><div>Add New Post</div></Link>
                        </div>
                    </div>
                    <div className='font-semibold text-3xl my-4'>All Posts</div>
                    <Suspense fallback={<p>Loading...</p>}>
                        <Await
                            resolve={data.postResponse}
                            errorElement={
                                <p>Error loading posts!</p>
                            }
                        >
                            {(postResponse) => (
                                // console.log(postResponse)
                                <List posts={postResponse.data.allPosts} />
                            )}
                        </Await>
                    </Suspense>
                    <div className='font-semibold text-3xl my-4'>Saved Posts</div>
                    <Suspense fallback={<p>Loading...</p>}>
                        <Await
                            resolve={data.postResponse}
                            errorElement={
                                <p>Error loading posts!</p>
                            }
                        >
                            {(postResponse) => (
                                // console.log(postResponse)
                                <List posts={postResponse.data.saved} />
                            )}
                        </Await>
                    </Suspense>
                </div>
            </div>
            <div className='message bg-[#a9c09e] -mt-16 w-1/3 p-10 pt-24 h-screen'>
                <Suspense fallback={<p>Loading...</p>}>
                    <Await
                        resolve={data.chatResponse}
                        errorElement={
                            <p>Error loading chats!</p>
                        }
                    >
                        {(chatResponse) => (
                            <Chat chats={chatResponse.data}/>
                        )}
                    </Await>
                </Suspense>
            </div>
        </div>
    )
}

export default ProfilePage