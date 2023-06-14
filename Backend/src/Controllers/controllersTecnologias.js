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
    subcategoria
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
      subcategoria
    });
    const savedProduct = await newProduct.save();

    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: "Post failed" });
    console.error(error);
  }
};

// const getAllProducts = (req, res) => {};




module.exports = {
    postProduct,
}