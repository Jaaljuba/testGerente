import React from "react";
import { useEffect, useState } from "react";

// El css lo toma del css de campania

export const Options = (props) => { //Tiene que llegar para que se abra y el id
    
   
    const {p, id} = props; //Tomamos las props que vienen

    const [opciones, setOpciones] = useState(false);
    const [idCampania, setIdCampania] = useState(0)
    
    const [sideBar, setSidebar] = useState(false);

    const [opcion, setOpcion] = useState([]);
    
    const toggleOpciones = (id) => {    

        setOpciones((prevState) => !prevState)
        setIdCampania(id)
    }

    return (
        // Se cambio la opcion para que siempre se viera
        <div className={p ? "opciones--open" : "opciones"}>                             
            <p className="opt"><i className="bi bi-eye mr-2 opt" />Ver</p>
            <p className="opt" onClick={() => props.handleToggle("Actualizar")}><i className="bi bi-pencil mr-2 opt"  />Editar</p>
            <p className="opt"><i className="bi bi-trash mr-2 "/>Eliminar</p>
        </div>
    )
}
