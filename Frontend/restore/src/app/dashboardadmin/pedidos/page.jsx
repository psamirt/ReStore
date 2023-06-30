"use client"
import React from "react";
import "../dash.css";
import {
  Space,
  Typography,
  Card,
  Statistic,
  Table,
  Avatar,
  Tag,
  Button,
} from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";



function Pedidos() {
  
  const router = useRouter();
  useEffect(() => {
    if (!document.cookie.includes("Admin")) {
      router.push("/home");
    }
  }, []);
  
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);

  const getPedidos = async () => {
    const { data } = await axios.get("https://re-store.onrender.com/users/envios/all");
    return data.users;
  };

  useEffect(() => {
    setLoading(true);
    getPedidos().then((res) => {
      // Crear una nueva lista de pedidos con las órdenes desglosadas
      const newPedidos = [];
      res.forEach((user) => {
        user.orders.forEach((orden) => {
          // Crear un nuevo objeto de pedido con las propiedades relevantes
          const newPedido = {
            email: user.email,
            nombre: user.nombre,
            apellido: user.apellido,
            ubicacion: user.ubicacion,
            pagado: orden.paymentInfo.amountPaid,
            articulos: orden.orderItems,
            estado: orden.orderStatus,
          };
          newPedidos.push(newPedido);
        });
      });
      setPedidos(newPedidos);
      setLoading(false);
    });
  }, []);

  console.log(pedidos);

  function TablePedidos () {
    const columns = [
      // {
      //   title: "Foto",
      //   dataIndex: "imagenDePerfil",
      //   render: (link) => {
      //     return <Avatar src={link} />;
      //   },
      // },
      {
        title: "Email",
        dataIndex: "email",
        render: (_, record) => (
          <span style={{ color: 'green' }}>{record.email}</span>
        ),
      },
      {
        title: "Nombre",
        dataIndex: "nombre",
      },
      {
        title: "Apellido",
        dataIndex: "apellido",
      },
      {
        title: "Ciudad",
        dataIndex: "ciudad",
        render: (_, record) => {
          const direccion = record?.ubicacion?.[0]?.direccion;
          const codigoPostal = record?.ubicacion?.[0]?.codigoPostal;
          const ciudad = record?.ubicacion?.[0]?.ciudad;
          return `${ciudad}, ${direccion}, ${codigoPostal}`;
        },
      },
      {
        title: "Pagado",
        dataIndex: "pagado",
        render: (_, record) => (
          <span style={{ color: 'gold' }}>{`$${record.pagado} USD`}</span>
        ),
      },
      {
        title: "Artículos",
        dataIndex: "articulos",
        render: (articulos) => (
          <div>
            {articulos.map((articulo) => (
              <div key={articulo.id} style={{ backgroundColor: 'lightblue', padding: '5px', marginBottom: '5px' }}>
                <span>ID: {articulo.id}</span>
                <span> Cantidad: {articulo.quantity}</span>
      
                {/* Agrega aquí más detalles de los artículos que deseas mostrar */}
              </div>
            ))}
          </div>
        ),
      },
      {
        title: "Estado",
        dataIndex: "estado",
        render: (_, record) => (
          <Tag style={{ fontWeight: 'bold', color: 'white', backgroundColor: 'black' }}>
            {record.estado}
          </Tag>
        ),
      },
    ];

    
    return <Table loading={loading} columns={columns} dataSource={pedidos} />;
  };




  return (
    <Space size={20} direction="vertical">
    <Typography.Title level={4}>Pedidos</Typography.Title>
    <TablePedidos />
  </Space>
  );
}

export default Pedidos;
