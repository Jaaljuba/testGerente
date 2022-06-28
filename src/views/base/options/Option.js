import React from "react";
import { useEffect, useState } from "react";


export const Options = (props) => { 
     
    const {p} = props; 

    return (
        <div className={p ? "opciones--open" : "opciones"}>                             
            <p className="opt"><i className="bi bi-eye mr-2 opt" />Ver</p>
            <p className="opt" onClick={() => props.handleToggle("Actualizar")}><i className="bi bi-pencil mr-2 opt"  />Editar</p>
            <p className="opt" onClick={() => props.eliminarCampania()}><i className="bi bi-trash mr-2 "/>Eliminar</p>
        </div>
    )
}
