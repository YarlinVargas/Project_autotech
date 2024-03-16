import React from 'react'
import logo from '../img/logo.png'

export const Menu = () => {
  return (
    <>
        <div id="header">
            <a href="../inicio/inicio.html" className="brand-logo right"><img className="responsive-img" src={logo} /></a>
            <ul className="nav">
                <li><a href="">Usuarios</a></li>
                <li><a href="">Clientes</a></li>
                <li><a href="">Trabajadores</a></li>
                <li><a href="">Notificaciones</a></li>
                <li><a href="">Requerimientos</a></li>
                <li><a href="">Ordenes de Trabajo</a></li>
                <li><a href="">Conocenos mas</a>
                    <ul>
                        <li><a href="">Quienes somos</a></li>
                        <li><a href="">Servicios</a></li>
                        <li><a href="">Nuestras sedes</a></li>
                        <li><a href="">Como funciona</a></li>
                    </ul>
                </li>
                <li><a href="">Cerrar sesion</a></li>
            </ul>
        </div>
    </>
  )
}