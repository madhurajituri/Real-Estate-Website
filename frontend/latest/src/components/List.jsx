import React from 'react'
import Card from './Card.jsx'

function List({posts}) {
  return (
    <div className='flex flex-col gap-10'>
        {posts.map(post=>(
            <Card item={post} key={post.id}/>
        ))}
    </div>
  )
}

export default List