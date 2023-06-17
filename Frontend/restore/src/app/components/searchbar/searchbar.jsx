'use client';
import axios from 'axios';
import React, { useState } from 'react';

export default function Searchbar(
  {
       setSearchResult,
       setExistingSearch,
       existingSearch,
  }
) {
  //debe recibir una function de setear la busqueda, setear si existe una busqueda, y saber si existe una busqueda
  //para que el componente padre tenga acceso a los resultados
  //y se pueda mapear esta data si la search existe
  /*
        en el componente padre:
          const [searchResult, setSearchResult] = useState([]);
          const [existingSearch, setExistingSearch] = useState(false);

          <Searchbar  
            setSearchResult={setSearchResult}
            setExistingSearch={setExistingSearch}
            existingSearch={ existingSearch}
            />

          y despues condicionalmente mostrar los resultados:
                <ProductsContainer data={existingSearch ? searchResult : laOtraDataQueNoSeaDeBusqueda} />
    */
  const [inputValue, setInputValue] = useState('');
  //estos se eliminarian de aca una vez que estan en el componente padre:
  // const [searchResult, setSearchResult] = useState([]);
  // const [existingSearch, setExistingSearch] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation()
    setExistingSearch(true);

    const { value } = event.target[0];

    // setLoading(true);
    try {
      const {
        data
      } = await axios.get(endpoint, {
        params: { name: value },
      });
      console.log(data);
      //logica para volver al principio (hay que hacerla):
      //   dispatch(setPageToOne());
      setSearchResult(data);
      //   setLoading(false);
    } catch (error) {
      console.log('...............', error.message);
      //   setLoading(false);
      //tirar state de error y que muestre la 404.
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDeleteSearch = () => {
    setExistingSearch(false);
    setInputValue('');
    setSearchResult([]);
    //setear errorres a false
    //llevar al principio de la pagina
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} action=''>
          <input
            placeholder='Buscar...'
            value={inputValue}
            onChange={handleInputChange}
            type='text'
          />
        </form>
      </div>
      {existingSearch ? (
        <button onClick={handleDeleteSearch}>Borrar búsqueda</button>
      ) : null}
    </div>
  );
}

const endpoint = 'http://localhost:3001/categories/technology/searchName';
