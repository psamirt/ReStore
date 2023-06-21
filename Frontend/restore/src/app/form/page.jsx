'use client';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Input,
  Radio,
  Space,
  Select,
  Upload,
  PlusOutlined,
} from 'antd';
import axios from 'axios';

export default function MyForm() {
  const [categoria, setCategoria] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        'http://localhost:3001/categories/technology/subcategorias'
      );
      setCategoria(response.data);
    };
    fetch();
  }, []);

  const { TextArea } = Input;
  const { Option } = Select;
  const categorias = [
    { label: 'Computación', value: 'Computacion' },
    { label: 'Electrónica Audio y Video', value: 'ElectronicaAudioVideo' },
    { label: 'Consolas y Videojuegos', value: 'ConsolasyVideojuegos' },
    { label: 'Celulares', value: 'Celulares' },
    { label: 'Cámaras y Accesorios', value: 'CamarasyAccesorios' },
  ];

  const subcategorias = categoria
    ? categoria.reduce((result, category) => {
        result[category.name] = category.subcategoria;
        return result;
      }, {})
    : [];

  const marcas = categoria
    ? categoria.reduce((result, category) => {
        result[category.name] = category.marca;
        return result;
      }, {})
    : [];

  console.log(marcas);

  const [input, setInput] = useState({
    name: '',
    state: '',
    background_image: '',
    precio: 0,
    Description: '',
    Marca: '',
    Ubicacion: '',
    Ofertas: 0,
    subcategoria: {},
  });

  const [subcategoriaOptions, setSubcategoriaOptions] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [subcategoriaKey, setSubcategoriaKey] = useState(0);
  const [selectedSubcategoria, setSelectedSubcategoria] = useState(undefined);
  const [selectedMarca, setSelectedMarca] = useState([]);

  const handleCategoriaChange = (value) => {
    setSelectedCategoria(value);
    setSelectedSubcategoria(undefined);
    setSubcategoriaKey(subcategoriaKey + 1);
    setSubcategoriaOptions(subcategorias[value]);
    setSelectedMarca(marcas[value]);
    setInput((prevState) => ({
      ...prevState,
      subcategoria: {
        [value]: {},
      },
    }));
  };

  const handleMarca = (value) => {
    setInput({ ...input, Marca: value });
  };

  const handleSubcategoriaChange = (value) => {
    setSelectedSubcategoria(value);
    setInput((prevState) => ({
      ...prevState,
      subcategoria: {
        ...prevState.subcategoria,
        [selectedCategoria]: {
          ...prevState.subcategoria.selectedCategoria,
          [value]: true,
        },
      },
    }));
  };

  // ...

  const handleSubmit = (values) => {
    const data = {
      ...input,
      producto: values.producto,
      marca: values.marca,
      precio: values.precio,
      ubicacion: values.ubicacion,
      estado: values.estado,
      descripcion: values.descripcion,
    };

    axios
      .post('http://localhost:3001/categories/technology/posteo', data)
      .then((response) => {
        console.log('Producto publicado:', response.data);
        alert('Producto creado exitosamente');
      })
      .catch((error) => {
        console.error('Error al publicar el producto:', error);
      });
  };

  return (
    <div className=''>
      <Navbar />
      <div className=' flex justify-between'>
        <div>
          <h1 className=''>Ingresa la información del producto</h1>
        </div>
        <div>
          <Button type='dashed'>X</Button>
        </div>
      </div>
      <Form
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 14 }}
        layout='horizontal'
        onFinish={handleSubmit}
      >
        <Form.Item
          name='Categoría'
          label='Categoría'
          rules={[{ required: true, message: 'Escoge la categoría' }]}
        >
          <Select
            placeholder='Selecciona la categoría'
            onChange={handleCategoriaChange}
            showSearch
            optionFilterProp='children'
            mode='single'
          >
            {categorias.map((categoria) => (
              <Option key={categoria.value} value={categoria.value}>
                {categoria.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name='Subcategoría'
          label='Subcategoría'
          rules={[{ required: true, message: 'Escoge la subcategoría' }]}
        >
          <Select
            key={subcategoriaKey}
            placeholder='Selecciona la subcategoría'
            showSearch
            optionFilterProp='children'
            mode='single'
            defaultValue={undefined}
            onChange={handleSubcategoriaChange}
          >
            {subcategoriaOptions.map((subcategoria) => (
              <Option key={subcategoria} value={subcategoria}>
                {subcategoria}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name='producto'
          label='Nombre'
          rules={[
            { required: true, message: 'Ingresa el nombre del producto' },
          ]}
        >
          <Input
            placeholder='Escribe el nombre del producto'
            value={input.name}
            onChange={(e) => setInput({ ...input, name: e.target.value })}
          />
        </Form.Item>

        <Form.Item
          name='Marca'
          label='Marca'
          rules={[{ required: true, message: 'Escoge la marca' }]}
        >
          <Select
            key={subcategoriaKey}
            placeholder='Selecciona la marca'
            showSearch
            optionFilterProp='children'
            mode='single'
            defaultValue={undefined}
            onChange={handleMarca}
          >
            {selectedMarca.map((marca) => (
              <Option key={marca} value={marca}>
                {marca}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name='precio'
          label='Precio'
          rules={[
            {
              required: true,
              message: 'Ingresa el precio',
            },
          ]}
        >
          <Input
            type='number'
            name='precio'
            placeholder='Escribe el precio'
            value={input.precio}
            onChange={(e) => setInput({ ...input, precio: e.target.value })}
          />
        </Form.Item>

        <Form.Item
          name='ubicacion'
          label='Ubicación'
          rules={[{ required: true, message: 'Ingresa la ciudad' }]}
        >
          <Input
            placeholder='Escribe la ciudad'
            value={input.Ubicacion}
            onChange={(e) => setInput({ ...input, Ubicacion: e.target.value })}
          />
        </Form.Item>

        <Form.Item label='Estado'>
          <Radio.Group
            name='estado'
            value={input.state}
            onChange={(e) => setInput({ ...input, state: e.target.value })}
          >
            <Radio value='Usado'> Usado </Radio>
            <Radio value='Nuevo'> Nuevo </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label='Descripción'>
          <TextArea
            rows={4}
            value={input.Description}
            onChange={(e) =>
              setInput({ ...input, Description: e.target.value })
            }
          />
        </Form.Item>
        {/* 
        <Form.Item label="Imagen" valuePropName="fileList">
            <Upload action="http://localhost:3001/categories/technology/posteo" listType="picture-card" customRequest={({ file }) => {
      // Aquí puedes implementar la lógica de subida de archivos a tu servidor local
      // utilizando Axios u otra librería de tu elección
      const formData = new FormData();
      formData.append('image', file);

      return axios.post('http://localhost:3001/categories/technology/posteo', formData)
        .then(response => {
          // Manejar la respuesta del servidor si es necesario
          console.log('Imagen cargada con éxito:', response);
        })
        .catch(error => {
          // Manejar el error si ocurre
          console.error('Error al cargar la imagen:', error);
        });
    }}>
              <div>
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
              </div>
            </div>
          </Upload>
        </Form.Item> */}

        <Form.Item label='Imagen'>
          <Input
            type='url'
            placeholder='Ingresa la URL de la imagen'
            value={input.background_image}
            onChange={(e) =>
              setInput({ ...input, background_image: e.target.value })
            }
          />
        </Form.Item>

        <Button htmlType='submit' className=''>
          Publicar
        </Button>
      </Form>
    </div>
  );
}
