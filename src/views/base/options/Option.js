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

    const toggleSideBar = (opcion) => { //Le pasamos el parametro para que se actualicee

        setSidebar((prevState) => !prevState)
        setOpcion(opcion)
    }

    return (
        // Se cambio la opcion para que siempre se viera
        <div className={p ? "opciones--open" : "opciones"}> 
            
            
            
            <p><i class="bi bi-eye mr-2" />Ver</p>
            <p><i class="bi bi-pencil mr-2" onClick={(e) => toggleSideBar("Actualizar", e)} />Editar</p>
            <p><i class="bi bi-trash mr-2" onClick={(e) => toggleSideBar("-", e)} />Eliminar</p>
        </div>
    )
}
