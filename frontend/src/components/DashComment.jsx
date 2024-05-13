
import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashComment() {
  const { currentuser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
        const startIndex = comments.length
      try {
        const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
        
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentuser?.user?.isAdmin) {
      fetchUsers();
    }
  }, [currentuser?.user?._id]);



  const handleDeleteComment = async () => {
    try {
        const res = await fetch(`api/user/deleteusers/${commentIdToDelete}`,{
            method: 'DELETE',
        })
        const data = await res.json()
        if(res.ok){
            setComments((prev)=> prev.filter((data)=> data._id !== commentIdToDelete))
            setShowModal(false)
        }else{
            console.log(data.message);
        }
    } catch (error) {
        console.log(error.message)
    }
    // try {
    //     const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
    //         method: 'DELETE',
    //     });
    //     const data = await res.json();
    //     if (res.ok) {
    //         setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
    //         setShowModal(false);
    //     } else {
    //         console.log(data.message);
    //     }
    // } catch (error) {
    //     console.log(error.message);
    // }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentuser?.user?.isAdmin && comments?.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>Number of Likes</Table.HeadCell>
              <Table.HeadCell>Postid</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {comments?.map((comm) => (
              <Table.Body className='divide-y' key={comm._id}>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(comm.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={comm.profilePicture}
                      alt={comm.content}
                      className='w-10 h-10 object-cover bg-gray-500 rounded-full'
                    />
                  </Table.Cell>
                  <Table.Cell>{comm.usernam}</Table.Cell>
                  <Table.Cell>{comm.email}</Table.Cell>
                  <Table.Cell>
                    {comm.isAdmin ? (
                      <FaCheck className='text-green-500' />
                    ) : (
                      <FaTimes className='text-red-500' />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comm._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
             
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no comment yet!</p>
      )}
      
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
              Are you sure you want to delete this user?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteComment}>
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
  );
}