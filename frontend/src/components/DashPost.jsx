import { Table } from "flowbite-react";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";

function DashPost() {
  const {currentuser} = useSelector((state)=> state.user)
  const [userPost, setUserPost] = useState([])
console.log(userPost);

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
                <span className="font-medium text-red-500 hover:underline cursor-pointer">Delete</span>
              </Table.Cell>
              <Table.Cell>
                <Link className="text-teal-500 hover:underline" to={`/post/${data._id}`}>
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
    </div>
  )
}

export default DashPost