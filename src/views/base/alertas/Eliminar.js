import React from "react";
import { CButton } from "@coreui/react";

import "../../../css/eliminar.css";

export const Eliminar = (props) => {

  
  return (
    <div className={props.eliminar == true ? "eliminar" : "eliminar-close"}>
      <h5 className="titulo_eliminar">
        ¿Esta seguro que desea eliminar esta campaña?
      </h5>
      <div className="d-flex justify-content-center">
        <CButton
          color="success"
          className="mr-2 si"
          onClick={() => {props.eliminarCampania(); props.toggleElimnar()}}
        >
          Si
        </CButton>
        <CButton
          color="danger"
          className="ml-2 no"
          onClick={() => props.toggleElimnar()}
        >
          No
        </CButton>
      </div>
    </div>
  );
};
