"use client"

import { useState } from 'react'
import Image from 'next/image'

export default function Home() {
 const [file, setFile] = useState()

 const handleFile = (e) => {
    console.log(e.target.files[0])  
    setFile(e.target.files[0])

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
    </main>
  )
}
