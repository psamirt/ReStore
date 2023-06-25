'use client';
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, DatePicker, Upload } from "antd";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Navbar } from "../components/navbar/navbar";
import defaultImage from "./defaultImage.jpg";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";


function usuario({ searchParams }) {
  const { data: session, status } = useSession();
  console.log(session)
  const [readOnly, setReadOnly] = useState(true);
  const [file, setFile] = useState("");
  const [input, setInput] = useState({
    nombre: "",
    apellido: "",
    email: "",
    fechaNacimiento: "",
    genero: "",
  });
  const [newInput, setNewInput] = useState({
    nombre: "",
    apellido: "",
    email: "",
    fechaNacimiento: "",
    genero: "",
  });

  const handleSubmit = () => {
    const formData = new FormData();

    for (const key in newInput) {
      if (newInput[key] === "" || newInput[key] === "undefined") continue;
      else formData.append(key, newInput[key]); 
    }
    formData.append("image", file);


    console.log("ejecutando");
    console.log(Object.fromEntries(formData.entries()));
    axios
      .put(`http://localhost:3001/users/${session.user.id}`, formData)
      .then(() => {
        alert("Cambios guardados exitosamente");
      })
      .then(() => {
        handleToggleReadOnly()
      })
      .catch((error) => {
        console.error("Error al cambiar los datos:", error);
      });
  };

  useEffect(() => {
    const fetchUsuario = async (email) => {
      const response = await fetch(
        `https://re-store.onrender.com/users/${email}/email`
      );
      const user = await response.json();
      setInput({
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        genero: user.genero,
        fechaNacimiento: user.fechaNacimiento,
      });
    };
    fetchUsuario(searchParams.User); //hardcodeado por ahora
    if (!session && !document.cookie.includes("UserLocal")) {
      router.push("/login");
      return;
    }
  }, []);
  console.log(input);
  console.log(readOnly);
  console.log(newInput);
  const handleToggleReadOnly = () => {
    setReadOnly(!readOnly);
  };

  const handleSelectChange = (value, clave) => {
    setNewInput((prevInput) => ({
      ...prevInput,
      [clave]: value,
    }));
  };


  const handleCancelButton = () => {
    setNewInput(Input);
    handleToggleReadOnly();
    setNewInput(input);
  };
  return (
    <>
    <Navbar></Navbar>
    <div className="container mx-auto p-4">
      <Button
        onClick={readOnly ? handleToggleReadOnly : handleCancelButton}
        className="mb-4"
      >
        {readOnly ? "Editar perfil" : "Cancelar"}
      </Button>
      <Form
        onFinish={handleSubmit}
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item label="Imagen" valuePropName="file">
          <Upload
            disable={readOnly}
            listType="picture-card"
            showUploadList={false}
            customRequest={({ file }) => {
              setFile(file);
            }}
          >
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                style={{ width: "100%" }}
              />
            ) : (
              <img
                src={session && session.user.image}
                alt="Preview"
                style={{ width: "100%" }}
              />
            )}
          </Upload>
        </Form.Item>
        {Object.entries(input).map(([clave, valor]) => (
          <Form.Item key={clave} label={clave}>
            {clave === "genero" ? (
              <Select
                onChange={(value) => handleSelectChange(value, clave)}
                value={newInput.genero ? newInput.genero : input.genero}
                disabled={readOnly}
                className="w-full"
              >
                <Select.Option value="masculino">Masculino</Select.Option>
                <Select.Option value="femenino">Femenino</Select.Option>
                <Select.Option value="otro">Otro</Select.Option>
              </Select>
            ) : clave === "fechaNacimiento" ? (
              <DatePicker
                onChange={(value) => handleSelectChange(value, clave)} 
                value={newInput.fechaNacimiento}
                disabled={readOnly}
                className="w-full"
              />
            ) : (
              <Input
                disabled={clave === "email" ? true : false}
                readOnly={readOnly}
                placeholder={valor}
                className="w-full"
                onChange={(event) =>
                  handleSelectChange(event.target.value, clave)
                }
              />
            )}
          </Form.Item>
        ))}
      </Form>
      {!readOnly && (
        <Button onClick={handleSubmit} htmlType="submit">
          Guardar Cambios
        </Button>
      )}
    </div>
      <Navbar></Navbar>
      <h1>Editar perfil</h1>
      <button>Agregar métodos de Pago</button>
      <br></br>
      <Link href={"/user/ubicacion"}>
      <button >Ubicaciones</button>
      </Link>
      <br></br>
      <button >Informacion básica</button>
      <div className="flex items-center">
        <Image
          src={session ? session.user.image : defaultImage}
          alt="imagen"
          height={100}
          width={100}
        />
        <p> </p>
        <div className="ml-4">
          <p className="text-lg font-bold">Nombre: {usuario.nombre}</p>
          <p className="text-lg font-bold">Apellido: {usuario.apellido}</p>
          <p className="text-lg font-bold">Email: {usuario.email}</p>
          <p className="text-lg font-bold">
            Día de nacimiento: {usuario.fechaNacimiento}
          </p>
          
        </div>
      </div>
      {/* <div className="mt-4">
    <h3 className="text-xl font-bold">Ubicación</h3>
    <p className="text-lg">Ciudad: {usuario.ubicacion[0].ciudad ? usuario.ubicacion[0].ciudad : "Falta completar"}</p>
    <p className="text-lg">Dirección: {usuario.ubicacion[0].direccion ? usuario.ubicacion[0].direccion :  "Falta completar"}</p>
    <p className="text-lg">Código Postal: {usuario.ubicacion[0].codigoPostal ? usuario.ubicacion[0].codigoPostal : "Falta completar"}</p>
  </div > */}
    </>
  );
}

export default usuario;


