import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Searchbar() {
    const types = ["buy", "rent"];
    const [query, setquery] = useState({
        type: "buy",
        city: "",
        maxprice: 0,
        minprice: 0,
    });

    function switchItem(item) {
        setquery((prev) => ({ ...prev, type: item }));
    };

    function handleChange(e) {
        setquery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    return (

        <>
            <div className='flex flex-col'>
                <div className='flex'>
                    {types.map((type) => (
                        <div key={type} onClick={() => switchItem(type)} className={query.type === type ? "active" : "non-active"}>{type}</div>
                    ))}
                </div>
                <form className='flex items-center'>
                    <input onChange={handleChange} className='justify-center px-2 w-40 h-10 border-2 bg-white' type="text" placeholder="Location" name="city" />
                    <input onChange={handleChange} className='justify-center px-2 w-40 h-10 border-2 bg-white' type="number" placeholder="Maximum Price" name="maxprice" max={10000000} min={0} />
                    <input onChange={handleChange} className='justify-center px-2 w-40 h-10 border-2 bg-white' type="number" placeholder="Minimum Price" name="minprice" max={10000000} min={0} />
                    <Link to={`listpage?type=${query.type}&maxprice=${query.maxprice}&minprice=${query.minprice}&city=${query.city}`}>
                        <button className='hover:bg-green-300 p-2 mx-2 bg-green-200 rounded-md'>Search</button>
                    </Link>
                </form>
            </div>
        </>

    )
}

export default Searchbar