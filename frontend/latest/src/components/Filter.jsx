import React, { useState } from 'react'

function Filter() {
    const [location, setlocation] = useState("");
    const [minprice, setminprice] = useState(0);
    const [maxprice, setmaxprice] = useState(0);
    const [bedroom, setbedroom] = useState(0);
    const [type, settype] = useState("");
    const [property, setproperty] = useState("");


    return (
        <div className='w-full flex flex-col gap-2 mt-20'>
            <div className='text-2xl'>Search results for...</div>
            <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-1'>
                    <label for="location" className='text-xs'>Location</label>
                    <input className="rounded-md text-sm px-2 py-1" type="text" value={location} name="location" id="location" placeholder="City Location" />
                </div>
                <div className='flex justify-between gap-3'>
                    <div className='flex flex-col gap-1'>
                        <label for="type" className='text-xs'>Type</label>
                        <select className="rounded-md text-sm px-2 py-1 w-24" value={type} name="type" id="type" placeholder="Type">
                            <option value="">Any</option>
                            <option value="buy">Buy</option>
                            <option value="rent">Rent</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label for="property" className='text-xs'>Property</label>
                        <select className="rounded-md text-sm px-2 py-1 w-24" value={property} name="property" id="property" placeholder="Property" >
                            <option value="">Any</option>
                            <option value="apartment">Apartment</option>
                            <option value="house">House</option>
                            <option value="condo">Condo</option>
                            <option value="land">Land</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label for="location" className='text-xs'>Min Price</label>
                        <input className="rounded-md text-sm px-2 py-1 w-24" type="number" value={minprice} name="minprice" id="minprice" placeholder="any" />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label for="location" className='text-xs'>Max Price</label>
                        <input className="rounded-md text-sm px-2 py-1 w-24" type="number" value={maxprice} name="maxprice" id="maxprice" placeholder="any" />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label for="location" className='text-xs'>Bedroom</label>
                        <input className="rounded-md text-sm px-2 py-1 w-24" type="number" value={bedroom} name="bedroom" id="bedroom" placeholder="Bedroom" />
                    </div>
                    <div className='hover:bg-green-300 p-2 bg-green-200 rounded-md items-center justify-center flex'>Search</div>

                </div>
            </div>
        </div>
    )
}

export default Filter