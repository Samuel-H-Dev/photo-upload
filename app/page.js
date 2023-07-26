"use client"

import { useState } from 'react'
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyD-5yYQxvZ7H1oPxWw0FBTNRUXYhgARFCI",
  authDomain: "my-first-firestore-sh.firebaseapp.com",
  projectId: "my-first-firestore-sh",
  storageBucket: "my-first-firestore-sh.appspot.com",
  messagingSenderId: "129156024139",
  appId: "1:129156024139:web:328ff20aec92bb45eb8ace"
};


export default function Home() {
  const [file, setFile] = useState()
  const [uploadedfile, setUploadedFile] = useState()
  
  const handleFile = (e) => {
    console.log(e.target.files[0])  
    setFile(e.target.files[0])

    //connect to storage
    const app = initializeApp(firebaseConfig); //connects to our project
    const storage = getStorage(app) //connects to storage 
    //create reference to our file in storage using filename
    const filename = e.target.files[0].name
    const imgRef = ref(storage, "photos/" + filename)
    //magic way to get url
    const url = `https://firebasestorage.googleapis.com/v0/b/my-first-firestore-sh.appspot.com/o/photos%2F${filename}?alt=media`
    //upload
    uploadBytes(imgRef, e.target.files[0])
    .then(() => (setUploadedFile(url)))
    .catch(alert)
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className='text-3xl font-bold'>Upload a Photo</h1>
      <input type="file" accept='image/*' onChange={handleFile}/>  {/* * means get all of that type which means accept att images ex: png, jpeg, gif etc ***** more ex: application/pdf, application/json,*/}
       {file && 
       <div className='w-1/2 h-1/2'>
       <h2 className='text-xl font-semibold '>Image from computer:</h2>
       <img className='object-cover' src={URL.createObjectURL(file)} />
       </div>
       }
       {uploadedfile && 
       <div className='w-1/2 h-1/2'>
       <h2 className='text-xl font-semibold '>Image from storage:</h2>
       <img className='object-cover' src={uploadedfile} />
       </div>
       }
    </main>
  )
}
