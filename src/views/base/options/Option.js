import React from "react";

export const Options = (props) => { 
        
    const {abrirOptions} = props; 

    return (
        <div className={abrirOptions ? "opciones--open" : "opciones"}>                             
            <p className="opt"><i className="bi bi-eye mr-2 opt" />Ver</p>
            <p className="opt" onClick={() => props.handleToggle("Actualizar")}><i className="bi bi-pencil mr-2 opt"  />Editar</p>
            <p className="opt" onClick={() => props.toggleEliminar()}><i className="bi bi-trash mr-2 "/>Eliminar</p>
        </div>
    )
}
