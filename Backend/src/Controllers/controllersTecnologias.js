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

const getAllComputacion = async (req, res) => {
  try {
    const productosComputacion = await TechSchema.find({
      "subcategoria.Computacion": { $exists: true },
    });

    res.status(200).json({result:productosComputacion});
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al obtener los productos de Computacion" });
    console.error(error);
  }
};

const getAllTV = async (req, res) => {
  try {
    const productosTV = await TechSchema.find({
      "subcategoria.TV": { $exists: true },
    });

    res.status(200).json({result:productosTV});
  } catch (error) {
    res.status(400).json({ message: "Error al obtener los productos de TV" });
    console.error(error);
  }
};

const getAllElectronicaAudioVideo = async (req, res) => {
  try {
    const productosElectronicaAudioVideo = await TechSchema.find({
      "subcategoria.ElectronicaAudioVideo": { $exists: true },
    });

    res.status(200).json({result:productosElectronicaAudioVideo});
  } catch (error) {
    res.status(400).json({ message: "Error al obtener los productos de ElectronicaAudioVideo" });
    console.error(error);
  }
};

const getAllConsolasyVideojuegos = async (req, res) => {
  try {
    const productosConsolasyVideojuegos = await TechSchema.find({
      "subcategoria.ConsolasyVideojuegos": { $exists: true },
    });

    res.status(200).json({result:productosConsolasyVideojuegos});
  } catch (error) {
    res.status(400).json({ message: "Error al obtener los productos de ConsolasyVideojuegos" });
    console.error(error);
  }
};

const getAllCelulares = async (req, res) => {
  try {
    const productosCelulares = await TechSchema.find({
      "subcategoria.Celulares": { $exists: true },
    });

    res.status(200).json({result:productosCelulares});
  } catch (error) {
    res.status(400).json({ message: "Error al obtener los productos de Celulares" });
    console.error(error);
  }
};

const getAllCamarasyAccesorios = async (req, res) => {
  try {
    const productosCamarasyAccesorios = await TechSchema.find({
      "subcategoria.CamarasyAccesorios": { $exists: true },
    });

    res.status(200).json({result:productosCamarasyAccesorios});
  } catch (error) {
    res.status(400).json({ message: "Error al obtener los productos de CamarasyAccesorios" });
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
  getAllComputacion,
  getAllTV,
  getAllElectronicaAudioVideo,
  getAllConsolasyVideojuegos,
  getAllCelulares,
  getAllCamarasyAccesorios,
  getAllProducts,
  getAllProductsByCategory
};
