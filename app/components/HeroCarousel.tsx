"use client";

import Image from "next/image";

const HeroCarousel = () => {
  return (
    <div className="relative hidden sm:flex  max-w-[700px]  h-[600px] w-full bg-transparent rounded-[30px] ">
       {/* <Carousel
        showThumbs={false}
         autoPlay
        infiniteLoop
         interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((image) => (
          <Image 
            src={image.imgUrl}
            alt={image.alt}
            width={484}
            height={484}
            className="object-contain"
            key={image.alt}
          />
        ))}
      </Carousel> */}

      <Image 
        src="/assets/images/iphone.png"
        alt="arrow"
        width={1000}
        height={1000}
        className="w-full h-full"
      /> 
    </div>
  )
}

export default HeroCarousel