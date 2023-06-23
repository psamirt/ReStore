export const fetchOfers = async () => {
  const response = await fetch(
    "http://localhost:3001/categories/technology/Ofertas",
    { next: { revalidate: 60 } }
  );
  return await response.json();
};

export const fetchCategory = async (category) => {
  const response = await fetch(
    `http://localhost:3001/categories/technology/categoria/${category}`,
    { next: { revalidate: 60 } }
  );
  return await response.json();
};

export const fetchDetail = (productId) => {
  return fetch(
    `http://localhost:3001/categories/technology/Detail/${productId}`
  ).then((res) => res.json());
};

export const fetchAllProducts = async () => {
  try {
    const response = await fetch(`http://localhost:3001/categories/technology/allProducts`);
    if (!response.ok) {
      throw new Error('Error al obtener los productos');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
};

  export const fetchSearch = (search) => {
    return fetch(`http://localhost:3001/categories/technology/searchname?name=${search}`).then((res) =>
      res.json()
    );
  };

  export const fetchUsuario = (id) => {
    return fetch(`http://localhost:3001/users/${id}/email`).then(res => res.json())
  }
