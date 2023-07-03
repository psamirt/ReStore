"use client";
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
  Input
} from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'


function Clientes() {
  const router = useRouter();
  useEffect(() => {
    if (!document.cookie.includes("Admin")) {
      router.push("/home");
    }
  }, []);

  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [searchText, setSearchText] = useState('');
  const getClientes = async () => {
    const { data } = await axios.get("https://re-store.onrender.com/users");
    return data;
  };

  const actualizarClientes = async () => {
    setLoading(true);
    try {
      const clientesData = await getClientes();
      setClientes(clientesData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error al actualizar los clientes:", error);
    }
  };

  useEffect(() => {
    // Llamar a la función de actualización después de banear a un usuario
    actualizarClientes();
  }, [flag]); // Escuchar cambios en el estado 'clientes'

  const handleBan = async (clienteId) => {
    // Verificar si el ID del cliente es igual al ID del admin que se quiere evitar banear
    if (clienteId === "649a1713b5f91733f2cbf8ed") {
      Swal.fire({
        icon: 'error',
        text: 'No podes banear al admin.',
      });
      return;
    }

    try {
      // Realizar la solicitud PUT a la ruta /users/ban con el ID del cliente
      const response = await axios.put("https://re-store.onrender.com/users/ban/user", {
        userId: clienteId,
      });
      setFlag(!flag);
      // Lógica después de banear al usuario
      console.log("Usuario baneado:", response.data);
    } catch (error) {
      // Manejo de errores
      console.error("Error al banear al usuario:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getClientes().then((res) => {
      setClientes(res);
      setLoading(false);
    });
  }, []);

  function TableClients() {
    
    const filteredClients = searchText
    ? clientes.filter(cliente =>
        cliente.email.toLowerCase().includes(searchText.toLowerCase())
      )
    : clientes;
    
    const columns = [
      {
        title: "Foto",
        dataIndex: "imagenDePerfil",
        render: (link) => {
          return <Avatar src={link} />;
        },
      },
      {
        title: "Email",
        dataIndex: "email",
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
        title: "Género",
        dataIndex: "genero",
        render: (genero) => {
          let color, backgroundColor;
          if (genero) {
            switch (genero.toLowerCase()) {
              case "masculino":
                color = "grey";
                backgroundColor = "blue";
                break;
              case "femenino":
                color = "grey";
                backgroundColor = "pink";
                break;
              default:
                color = "white";
                backgroundColor = "black";
                break;
            }
          }
          return (
            <Tag color={backgroundColor} style={{ color }}>
              {genero}
            </Tag>
          );
        },
      },
      {
        title: "ID",
        dataIndex: "_id",
      },
      {
        title: "Acciones",
        render: (text, cliente) => (
          <Space>
            <Button onClick={() => handleBan(cliente._id)}>Banear</Button>
          </Space>
        ),
      },
      {
        title: "Ban",
        dataIndex: "ban",
        render: (ban) => (
          <span style={{ color: ban ? "red" : "green", fontWeight: "bold" }}>
            {ban ? "true" : "false"}
          </span>
        ),
      },
    ];
    return <Table loading={loading} columns={columns} dataSource={filteredClients} />;
  }
  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Clientes</Typography.Title>
      <Input.Search
      placeholder="Buscar por email"
      value={searchText}
      onChange={e => setSearchText(e.target.value)}
    />
      <TableClients />
    </Space>
  );
}

export default Clientes;
