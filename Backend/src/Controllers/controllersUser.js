const User = require("../Database/models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10; // Número de rondas de hashing

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

  // Generar el hash de la contraseña
  const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

  const newUser = new User({
    nombre,
    apellido,
    email,
    contraseña: hashedPassword, // Guardar el hash en lugar de la contraseña en texto plano
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
  try {
    const { newPassword, email } = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Generar el hash de la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Actualizar la contraseña del usuario
    user.contraseña = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    return res.status(500).json({ error: "Error al cambiar la contraseña" });
  }
};

const getUsersHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      return res.status(200).json(user);
    } else {
      // Obtener todos los usuarios
      const users = await User.find();

      return res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

const getEMAIL = async (req, res) => {
  try {
    const { email } = req.params;

    if (email) {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(200).json({ error: "Usuario no encontrado" });
      }

      return res.status(200).json(user);
    } 
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

module.exports = {
  getUsersHandler,
  createUserController,
  updatePasswordController,
  getEMAIL
};
