export const fetchCategories = async (category) => {
    if (category === "Computacion") {
        const response = await fetch("http://localhost:3001/categories/technology/Computacion",{cache:"no-store"})
        return await response.json()
    }
}