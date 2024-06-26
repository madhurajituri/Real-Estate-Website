import React, { useContext, useState } from 'react'
import Slider from '../components/Slider.jsx'
// import { userData, singlePostData } from '../lib/dummydata'
import { MdLocationOn, MdOutlineChat } from 'react-icons/md';
import utilities from '../../public/utility.png'
import pet from '../../public/pet.png'
import fee from '../../public/fee.png'
import restaurant from '../../public/restaurant.png'
import bus from '../../public/bus.png'
import size from '../../public/size.png'
import school from '../../public/school.png'
import { MdOutlineBathroom, MdOutlineBed, MdOutlineSave } from 'react-icons/md';
import Map from '../components/Map.jsx'
import { useLoaderData, useNavigate } from 'react-router-dom';
import dompurify from 'dompurify';
import { AuthContext } from '../context/AuthContext.jsx';
import apirequest from '../lib/apirequest.js';

function Singlepage() {

    // const post = singlePostData;
    // const user = userData;
    const post = useLoaderData();
    const currentuser = useContext(AuthContext);
    const [saved , setsaved] = useState(post.isSaved);
    // console.log(post);
    
    const handleSave = async () => {
        if(!currentuser){
            const navigate = useNavigate();
            navigate("/signin");
        }
        setsaved((prev)=>!prev);
        try{
            const saved = await apirequest.post("/user/save" , {postID:post.id});
        }
        catch(err){
            setsaved((prev)=>!prev);
            console.log(err);
        }
    }

    return (
        <div className='flex w-full h-full '>
            <div className='w-2/3 h-full bg-green-50 pt-32 min-h-screen -mt-16'>
                <div className='p-10 w-full h-full flex flex-col gap-5'>
                    <div className='w-full h-full'>
                        <Slider images={post.images} />
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='flex flex-col gap-2'>
                            <div className='text-2xl'>{post.title}</div>
                            <div className='flex gap-2 items-center'>
                                <MdLocationOn />
                                <div>{post.address} , {post.city}</div>
                            </div>
                            <div className='p-2 bg-green-200 rounded-sm w-fit h-fit'>${post.price}</div>
                        </div>
                        <div className='w-24 h-24 bg-yellow-100 rounded-xl flex flex-col gap-1 items-center justify-center'>
                            <img className="w-16 h-16 rounded-full object-cover" src={post.user.profile} />
                            <div className='font-semibold text-xs'>{post.user.username}</div>
                        </div>
                    </div>
                    <div className='text-sm' dangerouslySetInnerHTML={{__html: dompurify.sanitize(post.postDetail.desc)}}></div>
                </div>
            </div>
            <div className='bg-[#a9c09e] w-1/3 p-4'>
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-4'>
                        <div className='font-bold text-sm'>General</div>
                        <div className='text-xs flex-flex col'>
                            <div className="flex gap-2 border-[1px] border-gray-400 bg-yellow-50 rounded-2xl p-1">
                                <img src={utilities} className='w-8 h-8'></img>
                                <div>
                                    <div className='font-semibold'>Utilities</div>
                                    <div className="text-xs capitalize">{post.postDetail.utilities} is responsible</div>
                                </div>
                            </div>
                            <div className="flex gap-2 border-[1px] border-gray-400 bg-yellow-50 rounded-2xl p-1">
                                <img src={pet} className='w-8 h-8'></img>
                                <div>
                                    <div className='font-semibold'>Pet Policy</div>
                                    <div className="text-xs capitalize">{post.postDetail.petPolicy}</div>
                                </div>
                            </div>
                            <div className="flex gap-2 border-[1px] border-gray-400 bg-yellow-50 rounded-2xl p-1">
                                <img src={fee} className='w-8 h-8'></img>
                                <div>
                                    <div className='font-semibold'>Property Fees</div>
                                    <div className="text-xs">{post.postDetail.propertyFees}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='font-bold text-sm'>Room sizes</div>
                        <div className='flex justify-between items-center text-xs'>
                            <div className="flex gap-2 border-[1px] border-gray-400 bg-yellow-50 rounded-2xl p-2">
                                <img src={size} className='w-4 h-4' />
                                <div>{post.postDetail.size} sqm ({post.postDetail.size*12} sqft)</div>
                            </div>
                            <div className="flex gap-2 border-[1px] border-gray-400 bg-yellow-50 rounded-2xl p-2">
                                <MdOutlineBed className='w-4 h-4' />
                                <div>{post.bedroom} Bed</div>
                            </div>
                            <div className="flex gap-2 border-[1px] border-gray-400 bg-yellow-50 rounded-2xl p-2">
                                <MdOutlineBathroom className='w-4 h-4' />
                                <div>{post.bathroom} Bathroom</div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='font-bold text-sm'>Nearby Places</div>
                        <div className='p-2 flex text-sm rounded-2xl justify-between items-center bg-yellow-50 border-[1px] border-gray-400'>
                            <div className="flex gap-2 items-center justify-center rounded-2xl p-1">
                                <img src={restaurant} className='w-4 h-4'></img>
                                <div>
                                    <div className='font-semibold'>Restaurant</div>
                                    <div className="text-xs">{post.postDetail.restaurant}m away</div>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center justify-center rounded-2xl p-1">
                                <img src={school} className='w-4 h-4'></img>
                                <div>
                                    <div className='font-semibold'>School</div>
                                    <div className="text-xs">{post.postDetail.school}m away</div>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center justify-center rounded-2xl p-1">
                                <img src={bus} className='w-4 h-4'></img>
                                <div>
                                    <div className='font-semibold'>Bus Stop</div>
                                    <div className="text-xs">{post.postDetail.bus}m away</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className='font-bold text-sm'>Location</div>
                        <div className='w-full h-[260px] -mt-20'>
                            <Map items={[post]}/>
                        </div>
                    </div>
                    <div className='flex justify-between items-center text-sm'>
                        <div className='bg-yellow-100 rounded-md cursor-pointer flex p-2 gap-2 justify-between items-center hover:bg-yellow-200'>
                            <MdOutlineChat className='w-5 h-5 text-green-700' />
                            <div>Send a Message</div>
                        </div>
                        <div onClick={handleSave} className='bg-yellow-100 rounded-md cursor-pointer flex p-2 gap-2 justify-between items-center hover:bg-yellow-200'>
                            <MdOutlineSave className='w-5 h-5 text-green-700' />
                            <div>{saved? "Place Saved":"Save the Place"}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Singlepage