const TechModel = require("../Database/models/Technology");
const UserModel = require("../Database/models/userModel");

const rating = async (req, res) => {
  try {
    const { rate, comment } = req.body;
    const { productId } = req.params; // Obtener el ID del producto de los parámetros de consulta

    // Buscar el producto por su ID
    const product = await TechModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Producto no existe" });
    }

    // Agregar la calificación (rate) como número entero al array 'stars' en el objeto 'rating' del producto
    product.rating.stars.push(parseInt(rate, 10));

    // Agregar el comentario al array 'comments' en el objeto 'rating' del producto
    product.rating.comments.push(comment);

    // Calcular el nuevo promedio de calificaciones
    const totalRatings = product.rating.stars.length;
    let newRating = 0;
    if (totalRatings !== 0) {
      const sum = product.rating.stars.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      newRating = Math.round(sum / totalRatings);
    }

    // Actualizar el campo 'totalStars' en el objeto 'rating' del producto con el nuevo promedio
    product.rating.totalStars = newRating;

    // Marcar el producto como calificado en la lista de productos comprados del usuario
    const user = await UserModel.findById(req.userId);
    if (user) {
      const purchasedProduct = user.orders.find(
        (order) => order.productId === id
      );
      if (purchasedProduct) {
        purchasedProduct.calificado = true;
      }
      await user.save();
    }

    // Guardar los cambios en la base de datos
    await product.save();

    res
      .status(200)
      .json({ message: "Calificación enviada exitosamente", newRating });
  } catch (error) {
    res.status(400).json({ message: "Error al calificar" });
    console.error(error);
  }
};

module.exports = rating;
