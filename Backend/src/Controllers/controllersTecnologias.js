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
    tipoSubCat,
    titulo
  } = req.body;
  //Se recibe uno de estos
  const {
    tipoComputacion,
    tipoElectronicaAudioVideo,
    tipoConsolasVideojuegos,
    tipoCelulares,
    tipoCamarasyAccesorios,
  } = req.body;
let subcategoria = {
    TV: "",
    Computacion: {
      notebook: "",
      PcEscritorio: "",
      Monitores: "",
      AccesoriosPc: "",
      Sillas: "",
      Componentes: "",
      Impresoras: "",
      Proyectores: "",
      Conectividad: "",
      Tablets: "",
      AccesoriosTablet: "",
    },
    ElectronicaAudioVideo: {
      Amplificadores: "",
      AsistentesVirtuales: "",
      Auriculares: "",
      EquiposDj: "",
      AccesoriosDj: "",
      EstudiodeGrabacion: "",
      Grabadores: "",
      HomeTheatre: "",
      Megafonos: "",
      Microfonos: "",
      Parlantes: "",
      Radios: "",
      Sintonizador: "",
      Tocadiscos: "",
      AccesoriosParaAudio: "",
      ComponentesElectronicos: "",
      Drones: "",
    },
    ConsolasyVideojuegos: {
      Consolas: "",
  
      Videojuegos: "",
  
      Accesorios: "",
    },
    Celulares: {
      Smarthpones: "",
      Fundas: "",
      Cargadores: "",
    },
  
    CamarasyAccesorios: {
      Camaras: "",
  
      CamarasFilmadores: "",
  
      Lentes: "",
  
      EstudioseIluminacion: "",
  
      CargadoresyBaterias: "",
  
      Soportes: "",
  
      Telescopios: "",
  
      Binoculares: "",
  
      Microscopios: "",
    },
  };
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

    console.log(newProduct)
    if (tipoSubCat === "TV") {
        newProduct.subcategoria.TV = titulo;
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------------//
    //-------------------------------------------------------------------------------------------------------------------------------------------------//
    else if (tipoSubCat === "Computacion") {
      if (tipoComputacion === "notebook") {
        newProduct.subcategoria.Computacion.notebook = titulo;
      }
      if (tipoComputacion === "PcEscritorio") {
        newProduct.subcategoria.Computacion.PcEscritorio = titulo;
      }
      if (tipoComputacion === "Monitores") {
        newProduct.subcategoria.Computacion.Monitores = titulo;
      }
      if (tipoComputacion === "AccesoriosPc") {
        newProduct.subcategoria.Computacion.AccesoriosPc = titulo;
      }
      if (tipoComputacion === "Sillas") {
        newProduct.subcategoria.Computacion.Sillas = titulo;
      }
      if (tipoComputacion === "Componentes") {
        newProduct.subcategoria.Computacion.Componentes = titulo;
      }
      if (tipoComputacion === "Impresoras") {
        newProduct.subcategoria.Computacion.Impresoras = titulo;
      }
      if (tipoComputacion === "Proyectores") {
        newProduct.subcategoria.Computacion.Proyectores = titulo;
      }
      if (tipoComputacion === "Conectividad") {
        newProduct.subcategoria.Computacion.Conectividad = titulo;
      }
      if (tipoComputacion === "Tablets") {
        newProduct.subcategoria.Computacion.Tablets = titulo;
      }
      if (tipoComputacion === "AccesoriosTablet") {
        newProduct.subcategoria.Computacion.AccesoriosTablet = titulo;
      }
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------------//
    //-------------------------------------------------------------------------------------------------------------------------------------------------//
    else if (tipoSubCat === "ElectronicaAudioVideo") {
      if (tipoElectronicaAudioVideo === "Amplificadores") {
        newProduct.subcategoria.ElectronicaAudioVideo.Amplificadores = titulo;
      }
      if (tipoElectronicaAudioVideo === "AsistentesVirtuales") {
        newProduct.subcategoria.ElectronicaAudioVideo.AsistentesVirtuales = titulo;
      }
      if (tipoElectronicaAudioVideo === "Auriculares") {
        newProduct.subcategoria.ElectronicaAudioVideo.Auriculares = titulo;
      }
      if (tipoElectronicaAudioVideo === "EquiposDj") {
        newProduct.subcategoria.ElectronicaAudioVideo.EquiposDj = titulo;
      }
      if (tipoElectronicaAudioVideo === "AccesoriosDj") {
        newProduct.subcategoria.ElectronicaAudioVideo.AccesoriosDj = titulo;
      }
      if (tipoElectronicaAudioVideo === "EstudiodeGrabacion") {
        newProduct.subcategoria.ElectronicaAudioVideo.EstudiodeGrabacion = titulo;
      }
      if (tipoElectronicaAudioVideo === "Grabadores") {
        newProduct.subcategoria.ElectronicaAudioVideo.Grabadores = titulo;
      }
      if (tipoElectronicaAudioVideo === "HomeTheatre") {
        newProduct.subcategoria.ElectronicaAudioVideo.HomeTheatre = titulo;
      }
      if (tipoElectronicaAudioVideo === "Megafonos") {
        newProduct.subcategoria.ElectronicaAudioVideo.Megafonos = titulo;
      }
      if (tipoElectronicaAudioVideo === "Microfonos") {
        newProduct.subcategoria.ElectronicaAudioVideo.Microfonos = titulo;
      }
      if (tipoElectronicaAudioVideo === "Parlantes") {
        newProduct.subcategoria.ElectronicaAudioVideo.Parlantes = titulo;
      }
      if (tipoElectronicaAudioVideo === "Radios") {
        newProduct.subcategoria.ElectronicaAudioVideo.Radios = titulo;
      }
      if (tipoElectronicaAudioVideo === "Sintonizador") {
        newProduct.subcategoria.ElectronicaAudioVideo.Sintonizador = titulo;
      }
      if (tipoElectronicaAudioVideo === "Tocadiscos") {
        newProduct.subcategoria.ElectronicaAudioVideo.Tocadiscos = titulo;
      }
      if (tipoElectronicaAudioVideo === "AccesoriosParaAudio") {
        newProduct.subcategoria.ElectronicaAudioVideo.AccesoriosParaAudio = titulo;
      }
      if (tipoElectronicaAudioVideo === "ComponentesElectronicos") {
        newProduct.subcategoria.ElectronicaAudioVideo.ComponentesElectronicos =
          titulo;
      }
      if (tipoElectronicaAudioVideo === "Drones") {
        newProduct.subcategoria.ElectronicaAudioVideo.Drones = titulo;
      }
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------------//
    //-------------------------------------------------------------------------------------------------------------------------------------------------//
    else if (tipoSubCat === "ConsolasyVideojuegos") {
      if (tipoConsolasVideojuegos === "Consolas") {
        newProduct.subcategoria.ConsolasyVideojuegos.Consolas = titulo;
      }
      if (tipoConsolasVideojuegos === "Videojuegos") {
        newProduct.subcategoria.ConsolasyVideojuegos.Videojuegos = titulo;
      }
      if (tipoConsolasVideojuegos === "Accesorios") {
        newProduct.subcategoria.ConsolasyVideojuegos.Accesorios = titulo;
      }
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------------//
    //-------------------------------------------------------------------------------------------------------------------------------------------------//
    else if (tipoSubCat === "Celulares") {
      if (tipoCelulares === "Smarthpones") {
        newProduct.subcategoria.Celulares.Smarthpones = titulo;
      }
      if (tipoCelulares === "Fundas") {
        newProduct.subcategoria.Celulares.Fundas = titulo;
      }
      if (tipoCelulares === "Cargadores") {
        newProduct.subcategoria.Celulares.Cargadores = titulo;
      }
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------------//
    //-------------------------------------------------------------------------------------------------------------------------------------------------//
    else if (tipoSubCat === "CamarasyAccesorios") {
      if (tipoCamarasyAccesorios === "Microscopios") {
        newProduct.subcategoria.CamarasyAccesorios.Microscopios = titulo;
      }
      if (tipoCamarasyAccesorios === "Camaras") {
        newProduct.subcategoria.CamarasyAccesorios.Camaras = titulo;
      }
      if (tipoCamarasyAccesorios === "CamarasFilmadores") {
        newProduct.subcategoria.CamarasyAccesorios.CamarasFilmadores = titulo;
      }
      if (tipoCamarasyAccesorios === "Lentes") {
        newProduct.subcategoria.CamarasyAccesorios.Lentes = titulo;
      }
      if (tipoCamarasyAccesorios === "EstudioseIluminacion") {
        newProduct.subcategoria.CamarasyAccesorios.EstudioseIluminacion = titulo;
      }
      if (tipoCamarasyAccesorios === "CargadoresyBaterias") {
        newProduct.subcategoria.CamarasyAccesorios.CargadoresyBaterias = titulo;
      }
      if (tipoCamarasyAccesorios === "Soportes") {
        newProduct.subcategoria.CamarasyAccesorios.Soportes = titulo;
      }
      if (tipoCamarasyAccesorios === "Telescopios") {
        newProduct.subcategoria.CamarasyAccesorios.Telescopios = titulo;
      }
      if (tipoCamarasyAccesorios === "Binoculares") {
        newProduct.subcategoria.CamarasyAccesorios.Binoculares = titulo;
      }
    }

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