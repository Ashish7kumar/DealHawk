import React from 'react'
import Image from 'next/image'
const page = () => {
  return (
    <>
    <section className="px-6 md:px-20 border-2 py-20 border-blue-500
    ">
    <div className='flex max-xl:flex-col gap-16'>
      <div className="flex flex-col justify-center">
    <p className='small-text'>
      Shop Intelligently, Save Effortlessly:
      <Image src="/assets/icons/arrow-right.svg" alt="arrow-right"
      width={16}
      height={16}/>

      
    </p>
    <h1 className="head-text">
      Unleash the power of
      <span className='text-primary'> DealHawk</span>
    </h1>
       <p className="mt-6">
         Powerfull product that helps customers discover top-rated products at the lowest prices with intelligent, easy-to-use tools
       </p>
       SearchBar
      </div>
      heroCarousel
    </div>
    </section>
    </>
  )
}

export default page
