import {Button} from 'flowbite-react'

function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
    <div className='flex-1 flex justify-center flex-col'>
        <h2 className='text-2xl'>learn more about JavaScript?</h2>
        <p className='text-gray-500'>Checkout these resources with 100 JavaScript project</p>
        <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
            <a href="http://www.100jsprojects.com" target='_blank' rel='noopener noreferrer'>
                100 JavaScript project
            </a>
        </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg" alt="img" />
        </div>
    </div>
    
  )
} 

export default CallToAction