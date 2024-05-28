import React from 'react'
import { useState } from 'react';

function Searchbar() {
    const types = ["Buy", "Rent"];
    const [query, setquery] = useState({
        type: "buy",
        location: "",
        maxprice: 0,
        minprice: 0,
    });

    function switchItem(item) {
        setquery((prev) => ({ ...prev, type: item }));
    };

    return (

        <>
            <div className='flex flex-col'>
                <div className='flex'>
                    {types.map((type) => (
                        <div key={type} onClick={() => switchItem(type)} className={query.type===type?"active":"non-active"}>{type}</div>
                    ))}
                </div>
                <form className='flex items-center'>
                    <input className='justify-center px-2 w-40 h-10 border-2 bg-white' type="text" placeholder="Location" name="location" />
                    <input className='justify-center px-2 w-40 h-10 border-2 bg-white' type="number" placeholder="Maximum Price" name="maxprice" max={10000000} min={0} />
                    <input className='justify-center px-2 w-40 h-10 border-2 bg-white' type="number" placeholder="Minimum Price" name="minprice" max={10000000} min={0} />
                    <div className='hover:bg-green-300 p-2 mx-2 bg-green-200 rounded-md'>Search</div>
                </form>
            </div>
        </>

    )
}

export default Searchbar