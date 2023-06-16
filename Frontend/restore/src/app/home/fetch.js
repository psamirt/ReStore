export const fetchCategories = async () => {
        const response = await fetch("http://localhost:3001/categories/technology/Ofertas",{ next: { revalidate: 60 } })
        return await response.json()
}

export const fetchCategory = async (category) => {
    const response = await fetch(`http://localhost:3001/categories/technology/categoria/${category}`,{ next: { revalidate: 60 } } )
    return await response.json()
}



export const fetchDetail = (productId) => {
    return fetch(`http://localhost:3001/categories/technology/Detail/${productId}`).then((res) =>
      res.json()
    );
  };