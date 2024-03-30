import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react"
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from "../firebase/Firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from "react-router-dom";


function UpdatePost() {
  const [imageFile, setImageFile] = useState(null)
  const [imageFileUrl, setImageFileUrl]= useState(null)
  const [imageUploadProgress, setImageUploadProgress] = useState(null)
  const [imageUploadError, setImageUploadError] = useState(null)
  const [formData, setFormData] = useState({})
  const [publisError, setPublishError] = useState(null)
  const navigation = useNavigate()
  const {postId} = useParams()
  console.log(postId);

  useEffect(()=>{
    try {
     const fetchPost = async()=>{
       const res = await fetch(`/api/post/getposts?postId=${postId}`)
       const data = await res.json()
       console.log(data);
       if(!res.ok){
         console.log(data.message);
         setPublishError(data.message)
       }
       if(res.ok){
         setPublishError(null)
         setFormData(data.posts[0])
       }
     }
    fetchPost()
    } catch (error) {
     console.log(error);
    }
   },[postId])
  console.log(formData);
  function handleFileChange(e){

   const file = e.target.files[0]
   if(file){
    setImageFile(file)
   setImageFileUrl(URL.createObjectURL(file))
   }

  }

  const uploadImage = async ()=>{
    try {
      if(!imageFile){
        setImageUploadError('Please select an image')
        return 
      }
      setImageUploadError(null)
      const storage = getStorage(app);
      const filename = new Date().getTime() + imageFile.name;
      const storageRef = ref(storage, filename)
      const uploadTask = uploadBytesResumable(storageRef, imageFile)
      uploadTask.on('state_changed', (snapshot)=>{
        const progress =(snapshot.bytesTransferred /snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0))
      }, (error)=>{
        setImageUploadError('image upload failed')
        setImageUploadProgress(null)
      }, ()=> {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadurl)=>{
          setImageUploadProgress(null)
          setImageUploadError(null)
          setFormData({...formData, image:downloadurl})
        })
      })
  
    } catch (error) {
      setImageUploadError('image upload failed')
      setImageUploadProgress(null)
      console.log(error);
    }
   
  }

const handelSubmit = async(e)=>{
  e.preventDefault()

try {
  const res = await fetch('/api/post/create', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body:JSON.stringify(formData)
  })
  const data = await res.json()

  if(!res.ok){
    setPublishError(data.message)
    return
  }
  if(res.ok){
    setPublishError(null)
    navigation(`/post/${data.slug}`)
  }

} catch (error) {
  setPublishError('something went wrong')
}
}

  return (
    <div className="max-w-3xl p-3 mx-auto min-h-screen">
      <h1 className="text-center my-7 text-3xl font-semibold">Create Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handelSubmit}>
          <div className="flex flex-col gap-4 sm:flex-row justify-between ">
            <TextInput type="text" placeholder="Title" value={formData.title} required id='title' className="flex-1" onChange={(e)=>setFormData({...formData, title:e.target.value})}/>
            <Select onChange={(e)=>setFormData({...formData, category:e.target.value})} value={formData.category}>
              <option value='uncatogrized'>Select a category</option>
              <option value='javascript'>Javascript</option>
              <option value='reactjs'>React js</option>
              <option value='nextjs'>Next js</option>
            </Select>
          </div>
          <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <FileInput onChange={handleFileChange} type='file'  accept="image/*"/>
            <Button disabled={imageUploadProgress} type="button" gradientDuoTone='purpleToBlue' outline onClick={uploadImage}>{imageUploadProgress? <div className="w-16 h-15">
              <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
            </div>:'Upload image'}</Button>
          </div>
          {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
          {formData.image && (
            <img src={formData.image} alt="upload" className="h-72 w-full object-cover" />
          )}
          <ReactQuill value={formData.content} onChange={(value)=>setFormData({...formData, content:value})} required theme='snow' placeholder="write something..." className="h-72 mb-12"/>
          <Button type='submit' gradientDuoTone='purpleToPink' >Publish</Button>
          {publisError && <Alert color='failure'>{publisError}</Alert>}
      </form>
    </div>
  )
}

export default UpdatePost