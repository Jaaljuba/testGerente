import React from "react";
import { useEffect, useState } from "react";
/*Importar el css*/

export const Options = (props) => { //Tiene que llegar para que se abra y el id
    
    const {p, id} = props; //Tomamos las props que vienen

    const [opciones, setOpciones] = useState(false);

    
  
    if(p === "entr" ){//Si me lo toma
       
        setOpciones((prevState) => !prevState)
        setIdCampania(id)
    }

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
        <div className={opciones ? "opciones--open" : "opciones--open"}> 
            
            <h1>{`${p}`}</h1>
            <i class="bi bi-three-dots gearD" onClick={(e) => toggleOpciones("id parametro", e)}></i>
            <p><i class="bi bi-eye mr-2" />View</p>
            <p><i class="bi bi-pencil mr-2" onClick={(e) => toggleSideBar("Actualizar", e)} />Edit</p>
            <p><i class="bi bi-trash mr-2" onClick={(e) => toggleSideBar("-", e)} />Remove</p>
        </div>
    )
}
