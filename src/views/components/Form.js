import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import {
    CButton,
    CForm,
    CLabel,
    CInput,
    CFormGroup,
    CTextarea,
    CSwitch
  } from "@coreui/react";
  import { CIcon } from "@coreui/icons-react"
    import { element } from "prop-types";


import "../../css/form.css";
import Campania from "../campania/Campania";


export const Form = ({fields, dataUpdate, titulo, isOpenForm, setOpenForm}) =>{
    

    const [data, setData] = useState('');
    const valueToData = ({ name, value }) => {
      setData({ ...data, [name]: value });
    };

    useEffect(() => {

      }, []);

    //Si trae la informacion correctamente
    return(

        <div className={isOpenForm ? "form form--open" : "form"}>
            <h1>{titulo}</h1>

            <CForm action="" method="post" id="formGeneric" className={"flex-container"}>
               
                {fields.map((element) =>(
                    <CFormGroup key={element.Fiel} className={'group col-md-' + element.tamanio}  >
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
            </CForm>
            <div className="d-flex justify-content-center mt-3">
          {/* Se ejecuta es la accion que le mandamos en las props */}
          <CButton color="success" onClick={() =>{alert("Aceptado"); setOpenForm((value) => !value)}} className="mr-2" variant="outline">
            <CIcon name="cil-check-circle" className="mr-2" />
            Aceptar
          </CButton>
          <CButton color="danger" onClick={() => {setOpenForm((value) => !value)}} className="ml-2" variant="outline">
            <CIcon name="cil-x-circle" className="mr-2" />
            Cancelar
          </CButton>
        </div>

        </div>
    );
}