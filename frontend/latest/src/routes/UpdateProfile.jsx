import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import noAvatar from '../../public/noAvatar.png'
import apirequest from '../lib/apirequest.js';
import { useNavigate } from 'react-router-dom';
import UploadWidget from '../components/UploadWidget.jsx';

function UpdateProfile() {

    const { currentuser, updateuser } = useContext(AuthContext);
    const [error, seterror] = useState("");
    const [avatar, setavatar] = useState([]);
    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        const { username, email, password} = Object.fromEntries(formdata);

        try {
            // console.log(currentuser.id)
            const res = await apirequest.put(`/user/${currentuser.id}`, {
                username, email, password ,profile:avatar[0]
            });
            // console.log(res.data)
            updateuser(res.data);
            seterror("");
            navigate("/profile");

        } catch (err) {
            console.log(err);
            seterror(err.response.data);
            // console.log(err.response.data);
        }
    }

    return (
        <div className='h-screen bg-green-100 w-full flex -mt-16'>
            <div className='w-2/3 bg-green-50 h-full items-center justify-center flex'>
                <div className='flex flex-col gap-10'>
                    <div className='text-5xl font-bold'>Update Profile</div>
                    <form onSubmit={handlesubmit}>
                        <div className='flex flex-col gap-4'>
                            <label className='flex flex-col gap-2'>
                                <div>Username</div>
                                <input name="username" type="text" className='w-72 h-10 rounded-md p-2' defaultValue={currentuser.username}></input>
                            </label>
                            <label className='flex flex-col gap-2'>
                                <div>Email</div>
                                <input name="email" type="email" className='w-72 h-10 rounded-md p-2' defaultValue={currentuser.email}></input>
                            </label>
                            <label className='flex flex-col gap-2'>
                                <div>Password</div>
                                <input name="password" type="password" className='w-72 h-10 rounded-md p-2'></input>
                            </label>
                            <button className='bg-yellow-100 hover:bg-yellow-200 items-center text-center p-2 w-72 border-2 border-yellow-200 rounded-md'>Update</button>
                        </div>
                    </form>
                    {error && <div className='text-sm text-red-400 -mt-6'>
                        {error}
                    </div>}
                </div>
            </div>
            <div className='w-1/3 bg-[#a9c09e] flex items-center justify-center flex-col gap-3'>
                <img src={avatar[0] || currentuser.profile || noAvatar} className='rounded-full w-56 h-56'></img>
                <UploadWidget uwConfig={{
                    cloudName:"madhurajituri",
                    uploadPreset:"estate",
                    multiple:false,
                    maxImageFileSize:2000000 //2MB
                }}
                setState={setavatar}
                />
            </div>
        </div>
    )
}

export default UpdateProfile