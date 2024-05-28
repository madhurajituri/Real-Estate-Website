import React from 'react'
import Pin from './Pin.jsx'
import {
    MapContainer,
    TileLayer
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

function Map({ items }) {
    return (
        <div className='w-full h-full flex items-center justify-center pt-20'>

            <MapContainer center={[51.505, -0.09]} zoom={7} scrollWheelZoom={false} className='w-[90%] h-[90%] rounded-lg'>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {items.map((item)=>(
                    <Pin key={item.id} item={item}/>
                ))}
            </MapContainer>
        </div>
    )
}

export default Map