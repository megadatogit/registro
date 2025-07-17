import React from 'react'
import type { Route } from './+types/post'

const post = ({params}: Route.ComponentProps  ) => {

    console.log({params})

  return (
    <div>
      <h1>post {params.postId}</h1>
    </div>
  )
}

export default post
