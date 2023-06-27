const TechSchema = require("../Database/models/Technology");

const rating = async (req, res) => {
  try {
    const { rate, id } = req.body;
    const product = await TechSchema.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Agregar el 'rate' al array 'rating' en el producto
    product.rating.rating.push(rate);

    // Calcular nuevo promedio
    const totalRatings = product.rating.rating.length;
    const sum = product.rating.rating.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    const newRating = sum / totalRatings;

    // Actualizar el campo 'ratingTotal' en el esquema de la tecnología
    product.rating.ratingTotal = newRating;

    // Guardar los cambios en la base de datos
    await product.save();

    res.status(200).json({ message: "Rating updated successfully", newRating });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error finding or updating product rating" });
    console.error(error);
  }
};

module.exports = rating;
