import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

function Filter() {
    const [searchParams , setSearchParams] = useSearchParams();
    // console.log(searchParams.get("city"))

    const [params , setParams] = useState({
        type: searchParams.get("type") || "",
        minprice: searchParams.get("minprice") || 0,
        maxprice: searchParams.get("maxprice") || 1000000000,
        city: searchParams.get("city") || "",
        bedroom: searchParams.get("bedroom") || 1,
        property: searchParams.get("property") || "",
    })

    function handleChange(e){
        setParams({
            ...params,
            [e.target.name]:e.target.value
        });
    }

    function handleFilter(){
        setSearchParams(params);
    }

    return (
        <div className='w-full flex flex-col gap-2 mt-20'>
            <div className='text-2xl'>Search results for <span className='font-bold'> {searchParams.get("city")} </span></div>
            <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-1'>
                    <label for="location" className='text-xs'>Location</label>
                    <input onChange={handleChange} defaultValue={params.city} className="rounded-md text-sm px-2 py-1" type="text" name="city" id="city" placeholder="City Location" />
                </div>
                <div className='flex justify-between gap-3'>
                    <div className='flex flex-col gap-1'>
                        <label for="type" className='text-xs'>Type</label>
                        <select onChange={handleChange} defaultValue={params.type} className="rounded-md text-sm px-2 py-1 w-24" name="type" id="type" placeholder="Type">
                            <option value="">Any</option>
                            <option value="buy">Buy</option>
                            <option value="rent">Rent</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label for="property" className='text-xs'>Property</label>
                        <select onChange={handleChange} defaultValue={params.property} className="rounded-md text-sm px-2 py-1 w-24" name="property" id="property" placeholder="Property" >
                            <option value="">Any</option>
                            <option value="apartment">Apartment</option>
                            <option value="house">House</option>
                            <option value="condo">Condo</option>
                            <option value="land">Land</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label for="location" className='text-xs'>Min Price</label>
                        <input onChange={handleChange} defaultValue={params.minprice} className="rounded-md text-sm px-2 py-1 w-24" type="number" name="minprice" id="minprice" placeholder="any" />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label for="location" className='text-xs'>Max Price</label>
                        <input onChange={handleChange} defaultValue={params.maxprice} className="rounded-md text-sm px-2 py-1 w-24" type="number" name="maxprice" id="maxprice" placeholder="any" />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label for="location" className='text-xs'>Bedroom</label>
                        <input onChange={handleChange} defaultValue={params.bedroom} className="rounded-md text-sm px-2 py-1 w-24" type="number" name="bedroom" id="bedroom" placeholder="Bedroom" />
                    </div>
                    <div onClick={handleFilter} className='hover:bg-green-300 p-2 bg-green-200 rounded-md items-center justify-center flex cursor-pointer'>Search</div>

                </div>
            </div>
        </div>
    )
}

export default Filter