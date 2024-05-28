import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'

function Pin({ item }) {
    return (
        <Marker position={[item.latitude, item.longitude]}>
            <Popup>
                <img className='h-10 w-22 rounded-md' src={item.images} />
                <Link to={`/${item.id}`}>{item.title}</Link>
                <div>{item.bedroom} BHK</div>
                <div>${item.price}</div>
            </Popup>
        </Marker>
    )
}

export default Pin