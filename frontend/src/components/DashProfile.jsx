import { Alert, Button, TextInput } from "flowbite-react"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from "../firebase/Firebase"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { signOutSuccess, updateFailure, updateStart, updateSucess } from "../redux/user/userSlice"
import { Link } from "react-router-dom"


function DashProfile() {
    const{currentuser} = useSelector(state => state.user)
    const [imagefile, setImagefile] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null)
    const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null)
    const [imageFileUploadError, setImageFileUploadError] = useState(null)
    const filePickerRef = useRef()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({})
  
    const handleEventChange = (e)=>{
     const file = e.target.files[0]
     if(file){
        setImagefile(file)
        setImageFileUrl(URL.createObjectURL(file))
     }
    
    }

   

    useEffect(()=>{
     if(imagefile){
        uploadImage()
     }
    },[imagefile])
    const uploadImage = async()=>{
        setImageFileUploadError(null)
        const storage = getStorage(app)
        const fileName = new Date().getTime() + imagefile.name
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imagefile)
        uploadTask.on('state_changed', (snapshot)=>{
            
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setImageFileUploadingProgress(progress.toFixed(0))
        },  (error)=>{
            setImageFileUploadError('could not upload image (file must be less than 2MB)')
            setImageFileUploadingProgress(null)
            setImagefile(null)
            setImageFileUrl(null)
        }, ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadurl)=>{
                setImageFileUrl(downloadurl)
                setFormData({...formData, profilePicture:downloadurl})
            })
        })
       
    }
    const handleChange = (e) =>{
        setFormData({...formData, [e.target.id]:e.target.value})
    }
    
    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(Object.keys(formData).length===0){
            return;
        }
        try {
            dispatch(updateStart())
            const res = await fetch(`/api/user/update/${currentuser._id}`,{
                method: 'PUT',
                headers:{
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if(!res.ok){
                dispatch(updateFailure(data.message))
            }else{
                dispatch(updateSucess(data))
            }
        } catch (error) {
            dispatch(updateFailure(error.message))
        }
    }

    const handleSignOut = async()=>{
        try {
            const res = await fetch('/api/user/signout', {
                method:'POST',

            })

            const data = await res.json();
            if(!res.ok){
                console.log(data.message);
            }else{
                dispatch(signOutSuccess())
            }
        } catch (error) {
            console.log(error.message);
        }
    }
  return (
    <div className="max-w-lg mx-auto p-3 w-full ">
        <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input hidden type="file" name="" accept="image/*" id="" onChange={handleEventChange} ref={filePickerRef}/>
            <div onClick={()=>filePickerRef.current.click()} className="w-32 relative h-32 self-center rounded-full flex flex-col cursor-pointer shadow-md overflow-hidden">
             {imageFileUploadingProgress && <CircularProgressbar value={imageFileUploadingProgress || 0} text={`${imageFileUploadingProgress}%`} strokeWidth={5} styles={{root:{width:'100%', height:'100%', position:'absolute', top:0, left:0}, path:{
                stroke:`rgba(62, 152, 199, ${imageFileUploadingProgress/100})`
             }}}/>}
            <img src={imageFileUrl || currentuser.user.profilePicture} alt="user" className={`rounded-full object-cover w-full h-full border-8 border-[lightgray] ${imageFileUploadingProgress && imageFileUploadingProgress < 100 && 'opacity-60'}`}/>
            </div>
            {imageFileUploadError &&  <Alert color='failure'>{imageFileUploadError}</Alert>}
           
           <TextInput onChange={handleChange} type="text" id="username" placeholder="username" defaultValue={currentuser.user.username} />
           <TextInput onChange={handleChange} type="email" id="email" placeholder="email" defaultValue={currentuser.user.email} />
           <TextInput onChange={handleChange} type="password" id="password" placeholder="password" defaultValue={'******'} />
           <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
           {
            currentuser?.user?.isAdmin && (
                <Link to='/create-post'>
                 <Button type="button" gradientDuoTone='purpleToPink' className="w-full" >
                   Create a post
                </Button>
                </Link>
                
            )
           }
        </form>
        <div className="text-red-500 flex justify-between mt-5">
            <span className="cursor-pointer">Delete Account</span>
            <span onClick={handleSignOut} className="cursor-pointer">Sign Out</span>
        </div>
    </div>
  )
}

export default DashProfile