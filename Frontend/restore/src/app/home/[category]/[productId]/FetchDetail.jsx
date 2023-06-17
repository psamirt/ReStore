import React from "react";
import "./detail.css";
import { fetchDetail } from "../../fetch"


export async function DetailId({ param }) {
  const post = await fetchDetail(param);
  if (post.message) return <NotFound />;
  return (
    <div className="detail-container" key={post.result[0]._id}>
      {console.log(post.result[0])}
      <div className="container-imagen-estados">
        <div className="container-image">
        <img
          className="detail-img"
          src={post.result[0].background_image}
          alt="imagen referencial"
        />
        </div>
        <div className="container-name-price">
          <h2 className="detail-name">
            {post.result[0].name} {post.result[0].Marca}
          </h2>
          <h2 className="detail-precio">$ {post.result[0].precio}</h2>
          <h3 className="detail-secciones">Ubicacion : {post.result[0].Ubicacion}</h3>
          <h3 className="detail-secciones">Estado: {post.result[0].state}</h3>
          <h3 className="detail-secciones">
            Método de envio :
            <select className="detail-select" name="metodo" id="envio">
              <option value="1">opcion 1</option>
              <option value="2">opcion 2</option>
            </select>
          </h3>
          {/* <h3 className="detail-secciones">
            Cantidad :{" "}
            <select className="detail-select" name="cantidad" id="cantidad">
              <option value="1">1 unidad</option>
              <option value="2">2 unidades</option>
              <option value="3">3 unidades</option>
              <option value="4">4 unidades</option>
              <option value="5">5 unidades</option>
              <option value="6">6 unidades</option>
            </select>
          </h3> */}
          <button className="detail-button-carrito">Añadir al carrito</button>
          <h3 className="detail-secciones">
            Calificación del vendedor : <img src="" alt="" />5
          </h3>
        </div>
      </div>
      <div className="detail-descripcion">
        <div className="container-descripcion">
          <h3 className="detail-secciones">Descripción: </h3>
          <div className="container-parrafo">
            <p className="detail-descripcion-p">
              {/* {post.result[0].Description} */}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              repellendus fugiat provident necessitatibus a nulla hic veritatis,
              unde, eveniet quod eos adipisci ab iure totam, excepturi obcaecati
              consequatur pariatur? Odit! Harum mollitia natus fugit doloremque,
              vero sed assumenda, laudantium aliquam alias quaerat rem eos sunt
              aliquid doloribus deserunt dolore fugiat unde ex exercitationem!
              Aliquid veritatis reiciendis aperiam, qui eligendi dolore. Dolorem
              voluptatem officiis, fuga quae, temporibus mollitia iusto odio a
              cum facere at laudantium odit, perspiciatis tenetur ullam. Atque
              aspernatur itaque natus sed ab voluptates! Inventore dolores
              fugiat mollitia iusto? Harum, nesciunt doloremque perspiciatis
              tenetur aspernatur quas aliquid ullam deserunt dolor odit, fugit
              quibusdam. Atque perspiciatis eos exercitationem sit. Nisi
              eligendi illo earum aspernatur magni vero. Minima rerum dicta non.
            </p>
          </div>
        </div>
        <div>
          <h3 className="detail-secciones">También te puede interesar</h3>
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
