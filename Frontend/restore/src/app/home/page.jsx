import React from 'react';
import { fetchOfers } from './fetch';
import { Navbar } from '../components/navbar/navbar';
import Carousel from '../components/carousel/Carousel';
import { Suspense } from 'react';
import HomeContainer from '../components/HomeContainer/HomeContainer';
import Link from 'next/link';
import Footer from '../components/footer/footer';


async function Home() {
  const data = await fetchOfers();
  // const data = window !== undefined ? await fetchOfers() : {};
  // const ubicaciones = data.result.map(producto => producto.Ubicacion)
  // const marcas = data.result.map(producto => producto.Marca)
  // const estado = data.result.map(producto => producto.state)

  return (
    <>
      <Navbar />
      <Carousel />
      <div className='mx-auto container px-4 mb-8'>
        <div className='flex align-middle justify-center gap-16 py-8 flex-wrap gap-y-4'>
          <Link
            title='click to visit ConsolasyVideojuegos'
            href={'/home/ConsolasyVideojuegos'}
          >
            <img width="80" height="80" src="https://img.icons8.com/external-justicon-lineal-color-justicon/80/external-joystick-notifications-justicon-lineal-color-justicon.png" alt="external-joystick-notifications-justicon-lineal-color-justicon"/>
          </Link>
          <Link title='click to visit TV' href={'/home/TV'}>
          <img width="80" height="80" src="https://img.icons8.com/external-rabit-jes-outline-color-rabit-jes/80/external-tv-home-decoration-rabit-jes-outline-color-rabit-jes.png" alt="external-tv-home-decoration-rabit-jes-outline-color-rabit-jes"/>
          </Link>
          <Link title='click to visit Celulares' href={'/home/Celulares'}>
          <img width="80" height="80" src="https://img.icons8.com/plasticine/80/iphone.png" alt="iphone"/>
          </Link>
          <Link
            title='click to visit ElectronicaAudioVideo'
            href={'/home/ElectronicaAudioVideo'}
          >
           <img width="80" height="80" src="https://img.icons8.com/deco/80/video.png" alt="video"/>
          </Link>
          <Link title='click to visit Computacion' href={'/home/Computacion'}>
          <img width="80" height="80" src="https://img.icons8.com/plasticine/80/workstation.png" alt="workstation"/>
          </Link>{' '}
          <Link
            title='click to visit CamarasyAccesorios'
            href={'/home/CamarasyAccesorios'}
          >
          <img width="80" height="80" src="https://img.icons8.com/fluency/80/camera-on-tripod.png" alt="camera-on-tripod"/>
          </Link>
        </div>
        <h2 className='text-4xl text-center mb-4 font-medium text-blue-900'>
          {' '}
          Ofertas Limitadas!
        </h2>
        <Suspense fallback={<div>Loading...</div>}>
          <HomeContainer data={data}></HomeContainer>
          {/* <ProductsContainer data={data} ubicaciones={ubicaciones} marcas={marcas} estado={estado}/> */}
        </Suspense>
        {/* <HomeContainer data={data}></HomeContainer> */}
      </div>
    </>
  );
}

export default Home;
