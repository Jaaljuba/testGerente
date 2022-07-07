import React, { useEffect } from "react";

import { useState } from "react";
import { getUrlServer, getUserSesion } from "src/GeneralsFunctions";
import axios from "axios";

import "../../css/sideBar.css";

import {
  CButton,
  CForm,
  CLabel,
  CInput,
  CFormGroup,
  CTextarea
} from "@coreui/react";

import {
  CIcon
} from "@coreui/icons-react"

//El id no llega como parametro, borrar!
export const RightSideBar = ({ isOpen, fields, dataa, fnSave, action }) => {
  //Encontrar la manera de guardar aca los datos genericos
  const [data, setData] = useState("")
  const valueToData = ({ name, value }) => {
    setData({ ...data, [name]: value });
  };

  // const actualizar = async () => {
  //   id = id.replace(/-/g, "");
  //   url = await getUrlServer() + `/mercadeo/api/campania/${id}/`;
  //   tokenUsuario = await getUserSesion("token");
  //   console.log(`Token -> ${tokenUsuario}`);
  //   console.log("La urle es " + url)
  //   const headers = {
  //     Authorization: `Bearer ${tokenUsuario}`,
  //     "Content-Type": "application/json",
  //   };
  //   const campaniaJson = {
  //     nombre_Campania: campania.campania,
  //     descripcion: campania.descripcion,
  //     fecha_Inicial: campania.fechaInicial,
  //     fecha_Final: campania.fechaFinal,
  //     estado: "A",
  //   };
  //   const response = await axios.put(url, campaniaJson, { headers });
  //   console.log(response);

  //   // cerrar();
  // };


  //Metodo para identificar que operacion se va a ejecutar
  //Se esta ejecutando para agregar y actualizar correctamente
  // const ejecutar = async () => {
  //   if (action === "Agregar") {
  //     crear();
  //   } else {
  //     actualizar();
  //   }
  // };

  //Funcionando
  // const getCampaniaSelect = async (id) => {
  //   tokenUsuario = await getUserSesion("token");
  //   const url = await getUrlServer();
  //   const headers = {
  //     Authorization: `Bearer ${tokenUsuario}`,
  //     "Content-Type": "application/json",
  //   };
  //   axios
  //     .get(`${url}/mercadeo/api/campania/${id}/`, { headers })
  //     .then((res) => {
  //       console.log("Nos muestra la data de la campaña seleccionada");
  //       console.log(res);
  //       //Cambiamos los valores de la campania
  //       console.log("Procedemos a cambiar el valor")
  //       setCampania({
  //         id: res.data.id_Campania,
  //         campania: res.data.nombre_Campania,
  //         descripcion: res.data.descripcion,
  //         fechaInicial: res.data.fecha_Inicial,
  //         fechaFinal: res.data.fecha_Final
  //       })
  //       console.log(res.data.id_Campania)//De esta forma se llama el valor
  //     });
  // }

  //Cuando se modifique la variable id se ejecute este metodo
  //y el id se va a modificar cuando se le de click en editar!
  // useEffect(() => {
  //   getCampaniaSelect(id)
  // }, [id])

  return (
    <div className={isOpen ? "sideBar sideBar--open" : "sideBar"}>
      <h4>{action}</h4>
      <CForm action="" method="post" id="formGeneric">
        {fields.map( (element) => (
          <CFormGroup>
            <CLabel htmlFor={element.Field}>{element.Label}</CLabel>

             {element.Type=='TextArea' &&
            <CTextarea
              type="text" //Text area?
              class="form-control"
              name={element.Name}
              onChange={e => valueToData(e.target)}
              placeholder={element.Placeholder}
              // onChange={({ target }) => setDescripcion(target.value)}
              // defaultValue={data == null ? null : element.Field}
            ></CTextarea>
            } 

            <CInput
              type={element.Type}
              name={element.Name}
              placeholder={element.Placeholder}
              onChange={e => valueToData(e.target)}
              // defaultValue={action == "A" ? element.Field : null}
            />
          </CFormGroup>
        ))}
        {/* 
        <CFormGroup>
          <CLabel htmlFor="descripcion" id="titulo">Descripcion</CLabel>
        </CFormGroup>
        <CFormGroup>
          <CLabel htmlFor="estado">Estado</CLabel>
          <select name="cars" id="estado">
            <option value="Activo">Activo</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </CFormGroup> */}
        <div className="d-flex justify-content-center">
          {/* Se ejecuta es la accion que le mandamos en las props */}
          <CButton color="success" onClick={() => fnSave(data)} className="mr-2" variant="outline">
            <CIcon name="cil-check-circle" className="mr-2"/>
            Aceptar
          </CButton>
          <CButton color="danger" onClick={() => {}} className="ml-2" variant="outline">
            <CIcon name="cil-x-circle" className="mr-2"/>
            Cancelar
          </CButton>
        </div>
      </CForm>
    </div>
  );
};
