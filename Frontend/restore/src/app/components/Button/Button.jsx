import React from 'react'
import "./Button.css"

function Boton({text}) {
  return (
    <button className="button">{text}</button>
  )
}

export default Boton