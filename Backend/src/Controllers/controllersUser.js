const User = require("../Database/models/userModel");

const createUser = async ({
  nombre,
  apellido,
  email,
  contraseña,
  genero,
  fechaNacimiento,
  ubicacion,
  metodosPago,
}) => {
  const searchEmail = await User.findOne({ email });
  if (searchEmail) {
    throw Error("Ya existe un usuario con este email");
  }

  const newUser = new User({
    nombre,
    apellido,
    email,
    contraseña,
    genero,
    fechaNacimiento,
    ubicacion,
    metodosPago,
  });

  const savedUser = await newUser.save();

  return savedUser;
};

const createUserController = async (req, res) => {
  const {
    nombre,
    apellido,
    email,
    contraseña,
    genero,
    fechaNacimiento,
    ubicacion,
    metodosPago,
  } = req.body;

  try {
    const savedUser = await createUser({
      nombre,
      apellido,
      email,
      contraseña,
      genero,
      fechaNacimiento,
      ubicacion,
      metodosPago,
    });

    res.status(200).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePasswordController = async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Actualizar la contraseña del usuario
    user.contraseña = newPassword;
    await user.save();

    res.status(200).json({ message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al cambiar la contraseña" });
  }
};

const getUserHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

module.exports = {
  getUserHandler,
  createUserController,
  updatePasswordController,
};
