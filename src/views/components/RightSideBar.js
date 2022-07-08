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
import Login from "src/Login";


//dataUpdate = "La data que le mandemos al valor que se va a actualizar"
//Todos los componentes le deben pasar la opcion para cambiar el abierto o el cerrado
export const RightSideBar = ({ isOpen, setOpen, fields, action, dataUpdate, fnSave }) => {
  console.log('Entro a RightSideBar...');

  const [data, setData] = useState('');
  const valueToData = ({ name, value }) => {
    setData({ ...data, [name]: value });
  };

  console.log({data});

  const setValue = (n, v) => {
    setData({...data, [n]: v})
  }

  useEffect(() => {
    setData('hola')
    setValue('saludo', 'hola')
    valueToData({'name':'hola', 'value':1000})

    if (dataUpdate != null) {
   
      console.log(`informacion que me llega`)
      console.log(dataUpdate)

      for (let i in dataUpdate) {
        console.log(`la clave es ${i} : ${dataUpdate[i]}`);
        setValue(i, dataUpdate[i])
      }

      setData(dataUpdate)

      console.log(data['nombre_Campania']);

      console.log({data});
    }
  }, [dataUpdate]); //Cuando se cambien dataUpdate se ejecuta esto

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
                defaultValue={dataUpdate == null ? null : data[element.Field]}
              />
            }

            {element.Type == 'textarea' &&
              <CTextarea
                type="textarea" //Text area?
                name={element.Field}
                className="form-control"
                placeholder={element.Placeholder}
                onChange={e => valueToData(e.target)}
                defaultValue={dataUpdate == null ? null : data[element.Field]}
              />
            }

            {/* Se tiene que seleccionar por defecto */}
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