import React, { useEffect } from "react";
import { useState } from "react";

import "../../css/sideBar.css";

import {
  CButton,
  CForm,
  CLabel,
  CInput,
  CFormGroup,
  CTextarea,
  CNavItem,
  CSwitch
} from "@coreui/react";

import {
  CIcon
} from "@coreui/icons-react"


//dataUpdate = "La data que le mandemos al valor que se va a actualizar"
//Todos los componentes le deben pasar la opcion para cambiar el abierto o el cerrado
export const RightSideBar = ({ isOpen, setOpen, fields, action, dataUpdate, fnSave }) => {
  const [data, setData] = useState('')
  const valueToData = ({ name, value }) => {
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    if (dataUpdate != null) {
      setData({
        "Campania": dataUpdate[0],
        "Descripcion": dataUpdate[1],
        "FechaInicial": dataUpdate[2],
        "FechaFinal": dataUpdate[3],
        "Estado": dataUpdate[4]
      })

    }
  }, dataUpdate);

  return (
    <div className={isOpen ? "sideBar sideBar--open" : "sideBar"}>
      <h4>{action == "A" ? "Agregar" : "Actualizar"}</h4>
      <CForm action="" method="post" id="formGeneric">
        {fields.map((element, i) => (
          <CFormGroup key={element.Label}>
            <CLabel htmlFor={element.Field}>{element.Label}</CLabel>
            {element.Type != 'textarea' && element.Type != 'select' && element.Type != 'switch' &&
              <CInput
                type={element.Type}
                name={element.Field}
                id={element.Field}
                placeholder={element.Placeholder}
                onChange={e => valueToData(e.target)}
                defaultValue={dataUpdate == null ? null : dataUpdate[i]}
              />
            }

            {element.Type == 'textarea' &&
              <CTextarea
                type="textarea" //Text area?
                name={element.Field}
                className="form-control"
                placeholder={element.Placeholder}
                onChange={e => valueToData(e.target)}
                defaultValue={dataUpdate == null ? null : dataUpdate[i]}
              />
            }

            {element.Type == 'select' &&
              <select
                name={element.Field}
                onChange={e => valueToData(e.target)} >
                <option disabled selected value>Selecciona</option>
                {element.Options.map(i =>
                  <option value={i.Value}>{i.Text}</option>
                )}
              </select>
            }

            {element.Type == 'switch' &&
              <CSwitch
                name={element.Field}
                color={'primary'}
                variant='opposite'
                shape='pill'
                onChange={e => valueToData(e.target)}
              />
            }
          </CFormGroup>
        ))}
        <div className="d-flex justify-content-center">
          {/* Se ejecuta es la accion que le mandamos en las props */}
          <CButton color="success" onClick={() => { fnSave(data); console.log(data) }} className="mr-2" variant="outline">
            <CIcon name="cil-check-circle" className="mr-2" />
            Aceptar
          </CButton>
          <CButton color="danger" onClick={() => setOpen(false)} className="ml-2" variant="outline">
            <CIcon name="cil-x-circle" className="mr-2" />
            Cancelar
          </CButton>
        </div>
      </CForm>
    </div>
  );
};
