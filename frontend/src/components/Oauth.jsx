import { Button } from 'flowbite-react'
import { FcGoogle } from "react-icons/fc";
import React from 'react'

function Oauth() {
    async function handleGoogleClick(){
        
    }
  return (
    <Button onClick={handleGoogleClick} type='button' gradientDuoTone='pinkToOrange' outline><FcGoogle className='w-6 h-6 mr-2'/>
     Continue with Google
    </Button>
  )
}

export default Oauth