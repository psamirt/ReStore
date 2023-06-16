"use client";
import style from "./form.modules.css";
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Alert, Select, Upload } from "antd";

import FormItem from "antd/es/form/FormItem";
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";

// const local = "/categoria/:category";


export default function Forms({

}) {
    const { TextArea } = Input;
//   const [data, setData] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const dispatch = useDispatch();
//   const categorias = useSelector((state) => state.categorias.AllCategories);
//   const [form] = Form.useForm();
//   const subcategorias = useSelector((state) => state.subcategorias);

//   const filtro = data.filter((e) => e.deletedAt === null);

//   async function fetchData() {
//     try {
//       const response = await axios.get();
//       const resCategorias = await axios.get();

//       dispatch(getAllProductsByCategory(response.data));
//    
//     } catch (error) {
//       alert(error.message);
//     }
//   }

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     setCategorias();
//     
//   }, [categorias]);

  const valoresSubmit = async (values) => {
//     
//         
//         setSuccess({ ...success, alert: true });
//         form.resetFields();
//       })
//       .catch(() => {
//         
//         setError({ ...error, alert: true });
//       });
   };
//   const handleClick = () => {
//     if (clickAct === true) {
//       setClickAct(false);
//     } else {
//       setClickAct(true);
//     }
//   };
  return (
    <div className={style.container + " top-1/3 "}>
      <div className="flex justify-between">

<div>

      <h1 className={style.title}>Ingresa la información del producto</h1>
</div>
      <div>

<Button type="dashed">X</Button>
</div>
      </div>
      <Form
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={(values) => valoresSubmit(values)}
      >
        <FormItem
          name="Categoría"
          label="Categoría"
          rules={[
            { required: true, message: "Escoge la categoría" },
          ]}
        >
          <Select
            name="Categorías"
            placeholder="Selecciona la categoría"
            showSearch
            optionFilterProp="children"
            mode="multiple"
          >
            {/* {filtro.map((e, index) => {
              return (
                <Option key={index} value={e.id}>
                  {e.name}
                </Option>
              );
            })} */}
          </Select>
        </FormItem>

        <FormItem
          name="Subcategoría"
          label="Subcategoría"
          rules={[
            { required: true, message: "Escoge la subcategoría" },
          ]}
        >
          <Select
            name="Subcategoría"
            placeholder="Selecciona la subcategoría"
            showSearch
            optionFilterProp="children"
            mode="multiple"
          >
            {/* {filtro.map((e, index) => {
              return (
                <Option key={index} value={e.id}>
                  {e.name}
                </Option>
              );
            })} */}
          </Select>
        </FormItem>

        <FormItem name="nombre" label="Producto">
          <Input placeholder="Escribe el nombre del producto" />
        </FormItem>
        <FormItem marca="marca" label="Marca">
          <Input placeholder="Escribe la marca del producto"/>
        </FormItem>
        <FormItem
          name="precio"
          label="Precio"
          rules={[
            {
              required: true,
              message: "Por favor ingrese el precio",
            },
          ]}
        >
          <Input type="number" name="marca" placeholder="Escribe el precio" />
        </FormItem>
        
        <FormItem
          name="Ubicación"
          label="Ubicación"
          rules={[{ required: true, message: "Escoge una Ciudad" }]}
        >
          <Select
            name="cityId"
            placeholder="Selecciona la ciudad"
            showSearch
            optionFilterProp="children"
          >
            {/* {cities.map((e, index) => {
              return (
                <Option key={index} value={e.id}>
                  {e.name}
                </Option>
              );
            })} */}
          </Select>
        
        </FormItem>
        <Form.Item
          name="direccion"
          label="Direccion"
          rules={[
            { required: true, message: "Por favor ingrese su dirección" },
          ]}
        >
          <Input type="string" name="direccion" placeholder="Escribe la dirección" />
          <Input type="number" name="codigo" placeholder="Escribe el código postal" />
          {/* {errors.user && (<span>{errors.user}</span>)} */}
        </Form.Item>

        <Form.Item label="Estado">
          <Radio.Group>
            <Radio value="usado"> Usado </Radio>
            <Radio value="nuevo"> Nuevo </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Descripción">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Imagen" valuePropName="fileList">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        
        <Button htmlType="submit" className={style.Button}>
          Enviar
        </Button>
      </Form>
    </div>
  );
}