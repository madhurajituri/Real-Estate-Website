import React, { Suspense } from 'react'
import { listData } from '../lib/dummydata'
import Filter from '../components/Filter';
import Card from '../components/Card';
import Map from '../components/Map';
import { Await, useLoaderData } from 'react-router-dom';

function Listpage() {
    // const data = listData;
    const data = useLoaderData();

    return (
        <div className='bg-green-50 flex min-h-screen w-full h-screen -mt-16'>
            <div className='flex w-full'>
                <div className='w-2/3 overflow-y-scroll flex flex-col gap-10 p-10'>
                    <Filter />
                    <Suspense fallback={<p>Loading...</p>}>
                        <Await
                            resolve={data.postResponse}
                            errorElement={
                                <p>Error loading posts!</p>
                            }
                        >
                            {(postResponse) => (
                                // console.log(postResponse)
                                < div className='flex flex-col gap-10'>
                                    {postResponse.data.map((item) => (
                                        <Card key={item.id} item={item} />
                                    ))}
                                </div>
                            )}
                        </Await>
                    </Suspense>
                </div>
                <div className='w-1/3 bg-[#a9c09e] h-[100%]'>
                    <Suspense fallback={<p>Loading...</p>}>
                        <Await
                            resolve={data.postResponse}
                            errorElement={
                                <p>Error loading posts!</p>
                            }
                        >
                            {(postResponse) => (
                                // console.log(postResponse)
                                <Map items={postResponse.data} />
                            )}
                        </Await>
                    </Suspense>
                </div>
            </div>
        </div >
    )
}

export default Listpage