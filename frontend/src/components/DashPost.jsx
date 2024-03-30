import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react"
import {  useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
function DashPost() {
  const {currentuser} = useSelector((state)=> state.user)
  const [userPost, setUserPost] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [postIdToDelete, setPostIdToDelete]  = useState('')


  useEffect(()=>{
   const fetchPost = async ()=>{
    try {
       const res = await fetch(`api/post/getposts?userId=${currentuser?.user?._id}`)
       const data = await res.json()
       if(res.ok){
        setUserPost(data.posts)
       }
    } catch (error) {
      console.log(error);
    }
   }
   if(currentuser?.user?.isAdmin){
    fetchPost()
   }
  
  },[])

  const handleDeletePost =async()=>{
   setShowModal(false)
   try {
    const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentuser?.user?._id}`, {
      method:'DELETE',

    })
    const data = await res.json()
    if(!res.ok){
      console.log(data.message);
    } else{
      setUserPost((prev)=> prev.filter((post)=> post._id !== postIdToDelete))
    }
    
   } catch (error) {
    console.log(error);
   }
  }
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
     {currentuser?.user?.isAdmin && userPost.length >0 ?(
      <>
       <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Date updated</Table.HeadCell>
            <Table.HeadCell>Post Image</Table.HeadCell>
            <Table.HeadCell>Post Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>
              <span>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          {userPost.map((data)=>(
         
            <Table.Body key={data._id} className="divide-y">
             <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{new Date (data.updatedAt).toLocaleDateString()}</Table.Cell>
              <Table.Cell>
                <Link to={`/post/${data.slug}`}>
                  <img src={data.image} alt={data.title} className="w-20 h-20 object-cover bg-gray-500" />
                </Link>
              </Table.Cell>
              <Table.Cell> <Link className="text-gray-900 dark:text-white" to={`/post/${data.slug}`}>{data.title}</Link></Table.Cell>
              <Table.Cell>{data.category}</Table.Cell>
              <Table.Cell>
                <span onClick={()=>{
                  setShowModal(true)
                  setPostIdToDelete(data._id)
                }} className="font-medium text-red-500 hover:underline cursor-pointer">Delete</span>
              </Table.Cell>
              <Table.Cell>
                <Link className="text-teal-500 hover:underline" to={`/update-post/${data._id}`}>
                <span>Edit</span>
                </Link>
              
              </Table.Cell>
             </Table.Row>
            </Table.Body>
          ))}
       </Table>
      </>
     ):
    (<p>you have no post yet</p>)
    }
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeletePost}>
                Yes, I am sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DashPost