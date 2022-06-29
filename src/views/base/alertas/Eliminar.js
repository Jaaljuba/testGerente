import React from "react";
import {
    CButton,
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CPagination,
  } from "@coreui/react";

import "../../../css/eliminar.css"

export const Eliminar = () => {
  return (
    <div className="eliminar">
      <h5 className="titulo_eliminar">¿Esta seguro que desea eliminar esta campaña?</h5>
      <div className="d-flex justify-content-center">
        <CButton color="success" className="mr-2 si">
          Si
        </CButton>
        <CButton color="danger"  className="ml-2 no">
          No
        </CButton>
      </div>
    </div>
  );
};
