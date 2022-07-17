import React, { useEffect } from "react";
import { useState } from "react";

import { CIcon } from "@coreui/icons-react"
import {
  CButton,
  CForm,
  CLabel,
  CInput,
  CFormGroup,
  CTextarea,
  CSwitch
} from "@coreui/react";

import "../../css/sideBar.css";

export const RightSideBar = ({ isOpen, setOpen, fields, action, dataUpdate, fnSave }) => {

  console.log('Entro a RightSideBar...');

  const [data, setData] = useState('');
  const valueToData = ({ name, value }) => {
    setData({ ...data, [name]: value });
  };

  console.log({data});

  console.log(`righsidebar ${fields}`);

  useEffect(() => {

    if (dataUpdate != null) {

      console.log(`informacion que me llega`)
      console.log(dataUpdate)

      setData(dataUpdate)

      console.log("Marciano")
      console.log(data['nombre_Campania']);

      
    }
  }, [dataUpdate]); //Cuando se cambien dataUpdate se ejecuta esto

  return (
    <div className={isOpen ? "sideBar sideBar--open" : "sideBar"}>
      <h4>{action == "A" ? "Agregar" : "Actualizar"}</h4>
      <CForm action="" method="post" id="formGeneric">

        {fields.map((element) => (

          <CFormGroup key={element.Fiel}>
            <CLabel htmlFor={element.Field}>{element.Label}</CLabel>

            {element.Type != 'textarea' && element.Type != 'select' && element.Type != 'switch' &&
              <CInput
                type={element.Type}
                name={element.Field}
                id={element.Field}
                placeholder={element.Placeholder}
                onChange={e => valueToData(e.target)}
                value={dataUpdate == null ? null : data[element.Field]}
              />
            }
            {element.Type == 'textarea' &&
              <CTextarea
                type="textarea" //Text area?
                name={element.Field}
                className="form-control"
                placeholder={element.Placeholder}
                onChange={e => valueToData(e.target)}
                value={dataUpdate == null ? null : data[element.Field]}
              />
            }
            {element.Type == 'select' &&
              <select
                name={element.Field}
                onChange={e => valueToData(e.target)} >
                <option disabled selected={true} value>Selecciona</option>
                {element.Options.map(i =>
                  <option key={i.Value} value={i.Value} selected={data[element.Field] == i.Value ? true : false}>{i.Text}</option>
                )}
              </select>
            }
            {element.Type == 'switch' &&
              <div>
              <CSwitch
                name={element.Field}
                color={'primary'}
                variant='opposite'
                shape='pill'
                onChange={e => valueToData(e.target)}
              />
              </div>
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
