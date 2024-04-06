import { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import {Button, Spinner} from 'flowbite-react'
import CallToAction from '../components/CallToAction'
import CommentSection from './CommentSection'

function PostPage() {
    const {postSlug} = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [post, setPost] = useState(null)

    useEffect(()=>{
     const fetchPost = async()=>{
        try {
            setLoading(true)
            const res = await fetch(`/api/post/getPosts?slug=${postSlug}`)
            const data = await res.json()
          
          if(!res.ok){
            setError(true)
            setLoading(false)
            return
          }
          if(res.ok){
            setPost(data?.posts[0]);
            setLoading(false)
            setError(false)
          }
        } catch (error) {
            setLoading(false)
            setError(true)
        }
     }
     fetchPost()
    },[postSlug])
    if(loading){
        return <div className='flex justify-center items-center h-screen'>
            <Spinner size='xl'></Spinner>
        </div>
    }
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen '>
        <h1 className='3xl mt-10 p-3 text-center font-sans max-w-2xl mx-auto lg:text-4xl'>{post?.title}</h1>
     <Link to={`/search?category=${post?.category}`} className='self-center'>
     <Button color='gray' pill size='xs'>
        {post?.category}
     </Button>
     </Link>
     <img src={post?.image} alt={post?.title} className='mt-10 p-3 max-h-[600px] w-full object-cover'/>
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto text-xs w-full max-w-2xl '>
        <span>{post && new Date(post.createdAt).toLocaleString()}</span>
        <span className='italic'>{post && (post?.content.length / 1000).toFixed(0)} mins read</span>
      </div>
      <div className='p-3 max-w-2xl mx-auto w-full post-content' dangerouslySetInnerHTML={{__html:post?.content}}>
          
      </div>
      <div className='max-w-4xl  mx-auto w-full'>
        <CallToAction/>
      </div>
      <div>
        <CommentSection postId={post._id}/>
      </div>
    </main>
  )
}

export default PostPage