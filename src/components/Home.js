import React from 'react'
import image from "../bgg.jpg"

const Home = () => {
  return (
    <main>
        <img src={image} alt="testingimages" className='absolute object-cover w-full h-full' />
        <section className='relative flex justify-center min-h-screen pt-12 lg:pt-64 px-8'>
            <h1 className='text-6xl text-green-100 font-bold leading-none lg:leading-snug home-name'>Jebastine Anthony</h1>
        </section>
    </main>
  )
}

export default Home