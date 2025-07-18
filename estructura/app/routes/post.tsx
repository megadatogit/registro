import { useLoaderData, useParams } from 'react-router';
import type { Route } from './+types/post';

export async function clientLoader({params}: Route.ClientActionArgs) {

  console.log("clientLoader", params)
  const { id } = params;
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}
    `);
  if (!response.ok) {
    throw new Response("Not Found", {status: 404 });
  }
  const post = await response.json();
  return { 
    title: post.title,
    body: post.body,
    id: post.id,
   };
}

const Post = () => {

    const {title, body, id} = useLoaderData();

  return (
    <div className='flex flex-col-reverse w-'>
      <h1 className='text-2xl text-amber-600 '>{title}</h1>
      <p className='italic'>{body}</p>
      <p className='font-extrabold'>Post ID: {id}</p>
    </div>
  )
}

export default Post;
