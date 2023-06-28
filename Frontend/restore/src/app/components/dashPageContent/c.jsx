import React from 'react'
import Client from '../dashComponents/clientes'
import Home from '../dashComponents/home'
import Inventarioo from '../dashComponents/inventario'
import Pedidoss from '../dashComponents/pedidos'
import Categoriass from '../dashComponents/categorias'
import Carrousell from '../dashComponents/carrousel'

function DashPage({render}) {
  return (
    <div className='PageContent'>
{render === "home" ? <Home />:null}
{render === "clientes" ? <Client />:null}
{render === "inventario" ? <Inventarioo />:null}
{render === "pedidos" ? <Pedidoss />:null}
{render === "carrousel" ? <Carrousell />:null}
{render === "categorias" ? <Categoriass />:null}
    </div>
  )
}

export default DashPage