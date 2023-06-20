const TechSchema = require("../Database/Models/Technology");
const { cloudinary } = require("../utils/cloudinary");

const postProduct = async (req, res) => {
  const {
    name,
    state,
    precio,
    subcategoria,
    Description,
    Marca,
    Ubicacion,
    Ofertas,
  } = req.body;

  if (!req.file) {
    return res.send("Porfavor seleccione una imagen para subir");
  }
  try {
    const cloudinaryImage = await cloudinary.uploader.upload(req.file.path, {
      folder: "Proyecto Final",
    });

    const newProduct = new TechSchema({
      name,
      state,
      background_image: cloudinaryImage.secure_url,
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
    console.error(error);
    res.status(400).json({ message: "Post failed" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await TechSchema.find();

    res.status(200).json({ result: allProducts });
  } catch (error) {
    res.status(400).json({ message: "Error al obtener los productos" });
    console.error(error);
  }
};

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
  getAllProductsByCategory,
};
