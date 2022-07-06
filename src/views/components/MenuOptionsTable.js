import React from "react";

export const MenuOptionsTable = (props) => { 
        
    const {isOpen} = props; 

    console.log(isOpen);

    // const opciones = {
    //     'isOpen': true,
    //     'Options': [
    //         {
    //             'Name': 'Ver',
    //             'Icon': 'bi bi-eye',
    //             'Action': 'editarRegistro',
    //             'Options': 'id'
    //         },
    //         {
    //             'Name': 'Cambiar',
    //             'Icon': 'bi bi-pencil',
    //             'Action': 'editarRegistro',
    //             'Options': 'id'
    //         },
    //         {
    //             'Name': 'Borrar',
    //             'Icon': 'bi bi-trash',
    //             'Action': 'editarRegistro',
    //             'Options': 'id'
    //         }
    //     ]
    // }

    //Aca tenemos que realizar la llamada del id
    return (
        <div className={isOpen ? "options" : "options hide"}>
            {/* <p>
                <i className={`${Option.Icon} mr-2`} />
                Option.Name
                if Option.Action
                <a href="#" onClick={() => Option.Action }></a>
            </p> */}
            <p className="opt" onClick={() => props.handleToggle("Actualizar")}>
                <i className="bi bi-pencil mr-2" />
                Editar
            </p>
            <p className="opt" onClick={() => props.toggleEliminar()}>
                <i className="bi bi-trash mr-2 "/>
                Eliminar
            </p>
        </div>
    )
}
