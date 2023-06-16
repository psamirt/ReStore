const TechSchema = require("../Database/Models/Technology");

const postProduct = async (req, res) => {
  const {
    name,
    state,
    background_image,
    precio,
    Description,
    Marca,
    Ubicacion,
    subcategoria,
    Ofertas,
  } = req.body;

  try {
    const newProduct = new TechSchema({
      name,
      state,
      background_image,
      precio,
      Description,
      Marca,
      Ubicacion,
      subcategoria,
      Ofertas,
    });
    const savedProduct = await newProduct.save();

    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: "Post failed" });
    console.error(error);
  }
};

const getAllProducts = async (req,res) => {
  try {
    const allProducts = await TechSchema.find();

    res.status(200).json({result:allProducts});
  } catch (error) {
    res.status(400).json({ message: "Error al obtener los productos" });
    console.error(error);
  }
}

const getAllProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const productos = await TechSchema.find({
      [`subcategoria.${category}`]: { $exists: true },
    });

    res.status(200).json({ result: productos });
  } catch (error) {
    res
      .status(400)
      .json({ message: `Error al obtener los productos de ${category}` });
    console.error(error);
  }
};

module.exports = {
  postProduct,
  getAllProducts,
  getAllProductsByCategory
};
