import React, { useState } from 'react'
import UploadWidget from '../components/UploadWidget.jsx'
import Reactquill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import apirequest from '../lib/apirequest.js';
import { useNavigate } from 'react-router-dom';

function CreatePost() {

    const [images, setImages] = useState([]);
    const [desc, setDesc] = useState("");
    const [error, seterror] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        const inputs = Object.fromEntries(formdata);
        // console.log(inputs);
        // console.log(inputs);
        try {
            const res = await apirequest.post("/post", {
                    postData: {
                        title: inputs.title,
                        address: inputs.address,
                        price: parseInt(inputs.price),
                        bedroom: parseInt(inputs.bedroom),
                        bathroom: parseInt(inputs.bathroom),
                        city: inputs.city,
                        type: inputs.type,
                        latitude: inputs.latitude,
                        longitude: inputs.longitude,
                        images: images,
                        property: inputs.property
                    },
                    postDetail: {
                        desc: desc,
                        petPolicy: inputs.petpolicy,
                        utilities: inputs.utilities,
                        propertyFees: inputs.incomepolicy,
                        size: parseInt(inputs.size),
                        bus: parseInt(inputs.bedroom),
                        school: parseInt(inputs.bathroom),
                        restaurant: parseInt(inputs.restaurant)
                    },
            });
            // res.status(200).json(res.data);
            navigate("/" + res.data.id);

        } catch (err) {
            console.log(err);
            seterror(err.response.data);
        }
    }

    return (
        <div className='h-full py-32 bg-green-100 w-full flex flex-col gap-8 -mt-16 items-center justify-center'>
            <div className='font-bold text-5xl text-center'>Create Post</div>
            <form onSubmit={handleSubmit} className='px-20 w-full flex items-center justify-center gap-10 flex-col'>
                <div className='flex justify-between gap-10 w-full'>
                    <label className='w-full'>
                        <div className='font-semibold text-md'>Title</div>
                        <input required name="title" className='w-full h-12 p-1 text-sm rounded-md'></input>
                    </label>
                    <label className='w-full'>
                        <div className='font-semibold text-md'>Price</div>
                        <input required name="price" className='w-full h-12 p-1 text-sm rounded-md'></input>
                    </label>
                    <label className='w-full'>
                        <div className='font-semibold text-md'>Address</div>
                        <input required name="address" className='w-full h-12 p-1 text-sm rounded-md'></input>
                    </label>
                </div>
                <label className='w-full'>
                    <div className='font-semibold text-md'>Description</div>
                    {/* <textarea className='w-full h-36 rounded-md p-2 text-sm'></textarea> */}
                    <Reactquill required theme="snow" onChange={setDesc} value={desc} className='h-32 mb-10 mt-2' />
                </label>
                <div className='flex justify-between gap-10 w-full'>
                    <label className='w-full'>
                        <div className='font-semibold text-md'>City</div>
                        <input name="city" required className='w-full h-12 p-1 text-sm rounded-md'></input>
                    </label>
                    <label className='w-full'>
                        <div className='font-semibold text-md'>Bedroom Number</div>
                        <input min={1} required type="number" name="bedroom" className='w-full h-12 p-1 text-sm rounded-md'></input>
                    </label>
                    <label className='w-full'>
                        <div className='font-semibold text-md'>Bathroom Number</div>
                        <input min={1} required type="number" name="bathroom" className='w-full h-12 p-1 text-sm rounded-md'></input>
                    </label>
                </div>
                <div className='flex justify-between gap-10 w-full'>
                    <label className='w-full'>
                        <div className='font-semibold text-md'>Latitude</div>
                        <input name="latitude" required className='w-full h-12 p-1 text-sm rounded-md'></input>
                    </label>
                    <label className='w-full'>
                        <div className='font-semibold text-md'>Longitude</div>
                        <input name="longitude" required className='w-full h-12 p-1 text-sm rounded-md'></input>
                    </label>
                    <label className='w-full'>
                        <div className='font-semibold text-md'>Type</div>
                        <select required className="rounded-md h-12 text-sm px-2 py-1 w-full" name="type">
                            <option value="buy">Buy</option>
                            <option value="rent" defaultChecked>Rent</option>
                        </select>
                    </label>
                </div>
                <div className='flex justify-between gap-10 w-full'>
                    <label className='w-full'>
                        <div className='font-semibold text-md'>Utitlities Policy</div>
                        <select name="utilities" className='rounded-md h-12 text-sm px-2 py-1 w-full'>
                            <option value="owner">Owner is responsible</option>
                            <option value="tenant">Tenant is responsible</option>
                            <option value="shared">Shared</option>
                        </select>
                    </label>
                    <label className='w-full'>
                        <div className='font-semibold text-md'>Pet Policy</div>
                        <select name="petpolicy" className='rounded-md h-12 text-sm px-2 py-1 w-full'>
                            <option value="allowed">Allowed</option>
                            <option value="not-allowed">Not Allowed</option>
                        </select>
                    </label>
                    <label className='w-full'>
                        <div className='font-semibold text-md'>Income Policy</div>
                        <input name="incomepolicy" className='w-full h-12 p-1 text-sm rounded-md'></input>
                    </label>
                </div>
                <div className='flex justify-between gap-10 w-full'>
                    <label className='w-full'>
                        <div className='font-semibold text-md'>Property</div>
                        <select required name="property" className='rounded-md h-12 text-sm px-2 py-1 w-full'>
                            <option value="apartment">Apartment</option>
                            <option value="land">Land</option>
                            <option value="condo">Condo</option>
                            <option value="house">House</option>
                        </select>
                    </label>
                    <label className='w-full'>
                        <div className='font-semibold text-md'>Restaurant</div>
                        <input type="number" name="restaurant" className='w-full h-12 p-1 text-sm rounded-md'></input>
                    </label>
                    <label className='w-full'>
                        <div className='font-semibold text-md'>Bus</div>
                        <input type="number" name="bus" className='w-full h-12 p-1 text-sm rounded-md'></input>
                    </label>
                </div>
                <div className='flex justify-between gap-10 w-full'>
                    <label className='w-full'>
                        <div className='font-semibold text-md'>Total Size (sqft)</div>
                        <input type="number" name="size" className='w-full h-12 p-1 text-sm rounded-md'></input>
                    </label>
                    <label className='w-full'>
                        <div className='font-semibold text-md'>School</div>
                        <input type="number" name="school" className='w-full h-12 p-1 text-sm rounded-md'></input>
                    </label>

                </div>
                <div className='flex gap-1 items-center justify-center'>
                    {images.map((image, index) => (
                        <img className='h-20' src={image} key={index} alt="" />
                    ))}
                    <UploadWidget
                        uwConfig={{
                            multiple: true,
                            cloudName: "madhurajituri",
                            uploadPreset: "estate",
                            maxImageFileSize: 200000000
                        }}
                        setState={setImages}
                        
                    />
                </div>
                <button className='bg-yellow-100 -mb-20 hover:bg-yellow-200 items-center text-center p-2 w-72 border-2 border-yellow-200 rounded-md'>Add post</button>
            </form >
            {error && <div className='text-sm text-red-400'>
                {error}
            </div>}
        </div >
    )
}

export default CreatePost