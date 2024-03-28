import { Button, FileInput, Select, TextInput } from "flowbite-react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function CreatePost() {
  return (
    <div className="max-w-3xl p-3 mx-auto max-h-screen">
      <h1 className="text-center my-7 text-3xl font-semibold">Create Post</h1>
      <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row justify-between ">
            <TextInput type="text" placeholder="Title" required id='title' className="flex-1"/>
            <Select>
              <option value='uncatogrized'>Select a category</option>
              <option value='javascript'>Javascript</option>
              <option value='reactjs'>React js</option>
              <option value='nextjs'>Next js</option>
            </Select>
          </div>
          <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <FileInput type='file'  accept="image/*"/>
            <Button type="button" gradientDuoTone='purpleToBlue' outline>Upload image</Button>
          </div>
          <ReactQuill required theme='snow' placeholder="write something..." className="h-72 mb-12"/>
          <Button typr='submit' gradientDuoTone='purpleToPink' >Publish</Button>
      </form>
    </div>
  )
}

export default CreatePost