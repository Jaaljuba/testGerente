import React from "react";
import { CButton } from "@coreui/react";

import '../../../css/ingreso.css'
//Pop ingreso
export const Ingreso = (props) => { 
    
    return(
    <div className={props.open == true ? "error_open" : "error_close"}>
      <h4>Usuario o contraseña incorectos</h4>
      <div className="d-flex justify-content-center">
        <CButton color="success" className="mr-2 si" onClick={props.toogleError}>
          Ok
        </CButton>
        
      </div>
    </div>
    )

};
