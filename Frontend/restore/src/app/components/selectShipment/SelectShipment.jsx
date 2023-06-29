import React from 'react';

export default function SelectShipment({
  selectedMethod,
  setSelectedMethod,
  setSelectedLocation,
}) {
  const handleRadioChange = (e) => {
    //setear el selected a un find en las locations con el id que voy a recibir
    const { value } = e.target;
    if (value === 'no enviar') setSelectedLocation(null);
    setSelectedMethod(value);
  };
  return (
    <form>
      <div className='flex justify-between'>
        <label htmlFor='recibir' className='flex'>
          Recibir paquete
        </label>
        <input
          name='location'
          value={'enviar'}
          className='w-5 h-5 self-center'
          type='radio'
          checked={selectedMethod === 'enviar'}
          onChange={handleRadioChange}
        />
      </div>
      <div className='flex justify-between'>
        <label htmlFor='retirar' className='flex'>
          Retirar paquete
        </label>
        <input
          name='location'
          value={'no enviar'}
          className='w-5 h-5 self-center'
          type='radio'
          checked={selectedMethod === 'no enviar'}
          onChange={handleRadioChange}
        />
      </div>
    </form>
  );
}
