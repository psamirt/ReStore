export const fetchCategories = async () => {
        const response = await fetch("http://localhost:3001/categories/technology/Ofertas",{cache:"no-store"})
        return await response.json()
}

export const fetchCategory = async (category) => {
    const response = await fetch(`http://localhost:3001/categories/technology/categoria/${category}`,{cache:"no-store"} )
    return await response.json()
}