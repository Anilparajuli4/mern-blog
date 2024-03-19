

import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"


function Signin() {
  const [formData, setFormData] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  function handleChange(e){
   setFormData({...formData, [e.target.id]:e.target.value})
  }
 async function handleSubmit(e){
    e.preventDefault()
    if( !formData.email || !formData.password){
      return setErrorMessage('please fill all the form')
    }
    try {
      setLoading(true)
       const res = await fetch('/api/auth/signin', {
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(formData),
       })
       const data = await res.json()
       setLoading(false)
       navigate('/')
       if(data.success === false){
        return setErrorMessage(data.message)
       }
      
    } catch (error) {
      setLoading(false)
      setErrorMessage(error.message)
      
    }
  }
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
        <Link to='/' className=" text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Anil</span>
            Blog
        </Link>
        <p className="text-sm mt-5">this is blog page you can sign up with your email and password or with google</p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="your email"/>
              <TextInput type="text" placeholder="Email" id="email" onChange={handleChange}/>
            </div>
            <div>
              <Label value="your password"/>
              <TextInput type="text" placeholder="Password" id="password" onChange={handleChange}/>
            </div>
            <Button gradientDuoTone='purpleToPink' type="submit" disabled={loading}>{loading ? (<Spinner size='sm' />) : 'Sign up'}</Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Dont Have an account?</span>
            <Link to='signup' className="text-blue-500">
              signup
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className="mt-5 " color='failure'>{errorMessage}</Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Signin