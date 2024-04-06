import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import {Alert, Button, TextInput, Textarea} from 'flowbite-react'
import { useState } from 'react'

function CommentSection({postId}) {
   const {currentuser} = useSelector((state)=> state.user)
   const [comment, setComment] = useState('')
   const [commentError, setCommentError] = useState(null)

console.log(currentuser);
   const commentHandler = async(e)=>{
   e.preventDefault()
   if(comment.length > 200 ){
    return 
   }
 if(comment === ''){
    return setCommentError('enter someting ')
 }
   try {
     const res = await fetch('/api/comment/create',{
        method:'POST',
        headers: {'Content-Type' : 'application/json'},
        body:JSON.stringify({content:comment, postId, userId:currentuser?.user?._id})
     })
     const data= await res.json()
    //  if(!res.ok){
    //     console.log(data.message);
    //  }
     if(res.ok){
        setComment('')
        setCommentError(null)
     }
    
   } catch (error) {
     setCommentError(error.message)
   }
   }

  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
        {
            currentuser ?
            (
               <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                <p>Signed as:</p>
                <img className='h-5 w-5 object-cover rounded-full' src={currentuser?.profilePicture} alt='profile'></img>
                <Link to='/dashboard?tab=profile' className='text-xs text-cyan-600 hover:underline'>
                  @{currentuser?.user?.username}
                </Link>
               </div>
            ):(
                <div className='text-sm text-teal-500 my-5 flex gap-1'>
                    You must be sigined in to a comment
                    <Link to='/sign-in' className='text-blue-500 hover:underline'>
                      Sign in
                    </Link>
                </div> 
            )
        }

        {currentuser && (
            <>
            <form onSubmit={commentHandler} className='border border-teal-500 rounded-md p-3'>
                <Textarea onChange={(e)=> setComment(e.target.value)} placeholder='Add a comment...' rows='3' maxLength='200'/>
                <div className='flex justify-between items-center mt-5'>
                    <p className='text-xs '>{200 - comment.length} character remaining </p>
                    <Button outline gradientDuoTone='purpleToBlue' type='submit'>
                        submit
                    </Button>
                </div>
            </form>
            {commentError && (<Alert color='failure' className='mt-5'>{commentError}</Alert>)}
          </>
        )}
    </div>
  )
}

export default CommentSection