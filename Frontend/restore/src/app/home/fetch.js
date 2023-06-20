export const fetchOfers = async () => {
        const response = await fetch("http://localhost:3001/categories/technology/Ofertas",{ next: { revalidate: 30 } })
        return await response.json()
}

export const fetchCategory = async (category) => {
    const response = await fetch(`http://localhost:3001/categories/technology/categoria/${category}`,{ next: { revalidate: 30 } } )
    return await response.json()
}



export const fetchDetail = (productId) => {
    return fetch(`http://localhost:3001/categories/technology/Detail/${productId}`).then((res) =>
      res.json()
    );
  };


  export const fetchSearch = (search) => {
    return fetch(`http://localhost:3001/categories/technology/searchname?name=${search}`).then((res) =>
      res.json()
    );
  };