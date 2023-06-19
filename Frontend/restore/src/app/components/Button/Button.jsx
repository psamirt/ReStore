import React from 'react';

function Boton({ text, secondary }) {
  return (
    <>
      {!secondary ? (
        <button className='px-4 py-2 bg-yellow-400  hover:bg-yellow-500 transition rounded-lg text-slate-800 font-medium '>
          {text}
        </button>
      ) : (
        <button className='px-4 py-2 bg-inherit border-2 border-yellow-400 hover:bg-yellow-400 hover:text-slate-800 transition rounded-lg text-inherit font-medium '>
          {text}
        </button>
      )}
    </>
  );
}

export default Boton;
