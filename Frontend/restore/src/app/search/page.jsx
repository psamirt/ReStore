import React from 'react'
import { fetchSearch } from '../home/fetch'
import ProductsContainer from '../components/ProductsContainer/ProductsContainer'
import { Navbar } from '../components/navbar/navbar'
import NotFound from '../home/[category]/[productId]/notFound'

async function Search({ searchParams }) {
  const data = await fetchSearch(searchParams.search)
  const ubicaciones = [...new Set(data.result.map(producto => producto.Ubicacion))];
  const marcas = [...new Set(data.result.map(producto => producto.Marca))];
  const estado = [...new Set(data.result.map(producto => producto.state))];
  if (data.length === 0) return  <NotFound></NotFound>
  return (
    <div>
      <Navbar></Navbar>
      <ProductsContainer data={data} ubicaciones={ubicaciones} marcas={marcas} estado={estado} />
    </div>
  )
}

export default Search