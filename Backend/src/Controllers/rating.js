const TechSchema = require("../Database/models/Technology");
const userModel = require("../Database/models/userModel")

const rating = async (req, res) => {
  try {
    const { rate, comment, id } = req.body;
    const product = await TechSchema.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no existe" });
    }

    // Agregar el 'rate' como número entero al array 'rating' en el producto
    product.rating.rating.push(parseInt(rate, 10));

    // Agregar el comentario al array 'comments' en el producto
    product.rating.comments.push(comment);

    // Calcular nuevo promedio
    const totalRatings = product.rating.rating.length;
    let newRating = 0;
    if (totalRatings !== 0) {
      const sum = product.rating.rating.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      newRating = Math.round(sum / totalRatings); // Redondear al número entero más cercano
    }

    // Actualizar el campo 'ratingTotal' en el esquema de la tecnología
    product.rating.ratingTotal = newRating;

    // Marcar el producto como calificado en la lista de productos comprados del usuario
    const user = await userModel.findById(req.userId);
    if (user) {
      const comprado = user.productosComprados.find((product) => product.productId === id);
      if (comprado) {
        comprado.calificado = true;
      }
      await user.save();
    }

    // Guardar los cambios en la base de datos
    await product.save();

    res.status(200).json({ message: "Calificacion enviada exitosamente", newRating });
  } catch (error) {
    res.status(400).json({ message: "Error al calificar" });
    console.error(error);
  }
};

module.exports = rating;
