import React from "react";
import "./detail.css";
import axios from "axios";
import { fetchDetail } from "../../fetch";

export async function DetailId({ param }) {
  const post = await fetchDetail(param);
  if (post.message) return <NotFound/>
  return (
      <div className="detail-container" key={post.result[0]._id}>
        {console.log(post.result[0])}
      <div className="container-imagen-estados">
        <img
          className="detail-img"
          src={post.result[0].background_image}
          alt="imagen referencial"
        />
        <div className="container-name-price">
          <h2 className="detail-name">
            {post.result[0].name} {post.result[0].Marca} 
          </h2>
          <h2 className="detail-precio">{post.result[0].precio}</h2>
          <h4 className="detail-secciones">{post.result[0].Ubicacion}</h4>
          <h4 className="detail-secciones">Estado: {post.result[0].state}</h4>
          <h4 className="detail-secciones">
            Método de envio :
            <select className="detail-select" name="metodo" id="envio">
              <option value="1">opcion 1</option>
              <option value="2">opcion 2</option>
            </select>
          </h4>
          <h4 className="detail-secciones">
            Cantidad :{" "}
            <select className="detail-select" name="cantidad" id="cantidad">
              <option value="1">1 unidad</option>
              <option value="2">2 unidades</option>
              <option value="3">3 unidades</option>
              <option value="4">4 unidades</option>
              <option value="5">5 unidades</option>
              <option value="6">6 unidades</option>
            </select>
          </h4>
          <button className="detail-button-carrito">Añadir al carrito</button>
          <h4 className="detail-secciones">
            Calificación del vendedor : <img src="" alt="" />5
          </h4>
        </div>
      </div>
      <div className="detail-descripcion">
        <div>
          <h4 className="detail-secciones">Descripción: </h4>
          <div className="container-parrafo">
            <p className="detail-descripcion-p">
              {post.result[0].Description}
            </p>
          </div>
        </div>
        <div>
          <h4 className="detail-secciones">También te puede interesar</h4>
          <img
            className="detail-imagen-momentanea"
            src="https://i.stack.imgur.com/t0k67.png"
            alt="imagen referencial"
          />
        </div>
      </div>
    </div>
  );
}
