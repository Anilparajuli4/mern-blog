import { Button, Label, TextInput } from "flowbite-react"
import { Link } from "react-router-dom"


function SignUp() {
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
          <form className="flex flex-col gap-4">
            <div>
              <Label value="your username"/>
              <TextInput type="text" placeholder="Username" id="username"/>
            </div>
            <div>
              <Label value="your email"/>
              <TextInput type="text" placeholder="Email" id="username"/>
            </div>
            <div>
              <Label value="your password"/>
              <TextInput type="text" placeholder="Password" id="username"/>
            </div>
            <Button gradientDuoTone='purpleToPink' type="submit">Sign up</Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='signin' className="text-blue-500">
              signin
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp