import React from 'react'
import { listData } from '../lib/dummydata'
import Filter from '../components/Filter';
import Card from '../components/Card';
import Map from '../components/Map';

function Listpage() {
    const data = listData;
    return (
        <div className='bg-green-50 flex min-h-screen w-full h-screen -mt-16'>
            <div className='flex w-full'>
                <div className='w-2/3 overflow-y-scroll flex flex-col gap-10 p-10'>
                    <Filter />
                    <div className='flex flex-col gap-10'>
                        {data.map((item) => (
                            <Card key={item.id} item={item} />
                        ))}
                    </div>
                </div>
                <div className='w-1/3 bg-[#a9c09e] h-[100%]'>
                    <Map items={data}/>
                </div>
            </div>
        </div>
    )
}

export default Listpage