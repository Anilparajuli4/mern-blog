import { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import moment from 'moment'


function Comment({comment}) {

 
  const [user, setUser] = useState({})

useEffect(()=>{
  const getUser = async()=>{
    try {
        const res = await fetch(`/api/user/${comment.userId}`)
        
       
        if(res.ok){
          const data = await res.json()
          
        setUser(data)
        }
       
    } catch (error) {
       console.log(error) 
    }
  }
  getUser()
},[comment])


  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className=" flex-shrink-0 mr-3">
        <img className="w-10 h-10 rounded-full bg-gray-200" src={user.profilePicture} alt=""/>
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">{user ? `@${user.username}` : 'anonymous user'}</span>
          <span className="text-gray-500 text-xs">{moment(comment?.createdAt).fromNow()}</span>
        </div>
        <p className="text-gray-500 mb-2">{comment.content}</p>
      </div>
     
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.shape({
    userId: PropTypes.string.isRequired, // Assuming userId is a string and required
    createdAt: PropTypes.instanceOf(Date).isRequired, // Assuming createdAt is a Date and required
    // Add other PropTypes for comment properties if needed
  }).isRequired, // Make the whole comment object required
};

export default Comment