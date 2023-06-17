import React from 'react'
import { fetchSearch } from '../home/fetch'
import ProductsContainer from '../components/ProductsContainer/ProductsContainer'
import Searchbar from '../components/searchbar/searchbar'
import { Navbar } from '../components/navbar/navbar'
import NotFound from '../home/[category]/[productId]/notFound'

async function Search({ searchParams }) {
  const response = await fetchSearch(searchParams.search)
  console.log(response)
  if (response.length === 0) return  <NotFound></NotFound>
  return (
    <div>
      <Navbar></Navbar>
      <ProductsContainer data={response} />
    </div>
  )
}

export default Search