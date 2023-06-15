// import function to register Swiper custom elements
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { register } from 'swiper/element/bundle';
import 'swiper/swiper-bundle.css';
// register Swiper custom elements
register();

export default function Carousel() {
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiperContainer = swiperRef.current;
    const params = {
      navigation: true,
      pagination: true,
      injectStyles: [
        `
          .swiper-button-next,
          .swiper-button-prev {
            color: white;
          }
          .swiper-pagination-bullet{

            background-color: white;
          }
      `,
      ],
    };

    Object.assign(swiperContainer, params);
    swiperContainer.initialize();
  }, []);

  return (
    <swiper-container
      init='false'
      ref={swiperRef}
      slides-per-view='1'
      navigation='true'
      pagination='true'
      loop='true'
      // autoplay-delay='5000'
      // autoplay-disable-on-interaction='false'
    >
      <swiper-slide>
        <div className='bg-black relative'>
          <div className='swiper-lazy-preloader'></div>
          <Image
            className='object-cover aspect-[16/5] max-w-full opacity-70'
            src='https://i.ytimg.com/vi/oD_3wMh5kLg/maxresdefault.jpg'
            alt='celulares'
            loading='lazy'
            width={1280}
            height={720}
          />
          <p
            className='text-gray-100 text-3xl font-semibold drop-shadow-2xl absolute z-10 top-1/2 left-1/2 text-center'
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            ¡Aprovecha descuentos en celulares!
          </p>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div className='bg-black relative'>
          <div className='swiper-lazy-preloader'></div>
          <Image
            className='object-cover aspect-[16/5] max-w-full opacity-70'
            src='https://imagekit.androidphoria.com/wp-content/uploads/Lenovo-Tab-M10-Plus-3er-gen-mejor-tablet-menos-200-euros-2023.jpg'
            alt='tablets'
            loading='lazy'
            width={1200}
            height={675}
          />
          <p
            className='text-gray-100 text-3xl font-semibold drop-shadow-2xl absolute z-10 top-1/2 left-1/2 text-center'
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            Las mejores tablets del mercado
          </p>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div className='bg-black relative'>
          <div className='swiper-lazy-preloader'></div>
          <Image
            className='object-cover aspect-[16/5] max-w-full opacity-70'
            src='https://s3.studytonight.com/curious/uploads/pictures/1635942900-106730.jpg'
            alt='dispositivos'
            loading='lazy'
            width={2000}
            height={1143}
          />
          <p
            className='text-gray-100 text-3xl font-semibold drop-shadow-2xl absolute z-10 top-1/2 left-1/2 text-center'
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            ¡Se acerca el dia del padre!
          </p>
        </div>
      </swiper-slide>
    </swiper-container>
  );
}
