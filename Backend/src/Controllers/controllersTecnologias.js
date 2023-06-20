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


const getModelCategories = (req,res) =>{
  
let model =  [{name: "TV", subcategoria: []}, 
{name: "Computacion", subcategoria: ['notebook', 'PcEscritorio',"Monitores","AccesoriosPc","Sillas","Componentes","Impresoras","Proyectores","Conectividad","Tablets","AccesoriosTablet"]},
{name:"ElectronicaAudioVideo",subcategoria:["Amplificadores","AsistentesVirtuales","Auriculares","EquiposDj","AccesoriosDj","EstudiodeGrabacion","Grabadoras","HomeTheatre","Megafonos","Microfonos","Parlantes","Radios","Radios","Tocadiscos","AccesoriosParaAudio","ComponentesElectronicos","Drones"]},
{name:"ConsolasyVideojuegos",subcategoria:["Consolas","Videojuegos","Accesorios"]},
{name:"Celulares",subcategoria:["Smartphones","Fundas","Cargadores"]},
{name:"CamarasyAccesorios",subcategoria:["Camaras","CamarasFilmadoras","Lentes","EstudioseIluminacion","CargadoresyBaterias","Soportes","Telescopios","Binoculares","Microscopios"]},
]
try {
  res.status(200).json(model)
} catch (error) {
  console.error(error)
  res.status(500).json({message:error})
}

}

module.exports = {
  postProduct,
  getAllProducts,
  getAllProductsByCategory,
  getModelCategories
};
