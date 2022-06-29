import React, { useEffect } from "react";
import "../../../../src/css/sideBar.css";
import { useState } from "react";
import { getUrlServer, getUserSesion } from "src/GeneralsFunctions";
import axios from "axios";

import {
  CButton,
  CForm,
  CLabel,
  CInput,
  CFormGroup,
} from "@coreui/react";

export const SideBar = ({ sideBar, opcion, cerrar, id, info }) => {
  let url;
  let tokenUsuario = null;

  const [campania, setCampania] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaInicial, setfechaInicial] = useState("");
  const [fechaFinal, setfechaFinal] = useState("");

  const crear = async () => {
    cerrar();
    url = (await getUrlServer()) + "/mercadeo/api/campania/";
    tokenUsuario = await getUserSesion("token");
    console.log(`Token -> ${tokenUsuario}`);
    const headers = {
      Authorization: `Bearer ${tokenUsuario}`,
      "Content-Type": "application/json",
    };
    const campaniaJson = {
      nombre_Campania: campania,
      descripcion: descripcion,
      fecha_Inicial: fechaInicial,
      fecha_Final: fechaFinal,
      estado: "A",
    };
    const response = await axios.post(url, campaniaJson, { headers });
    console.log(response);
  };

  const actualizar = async () => {
    id = id.replace(/-/g, "");
    cerrar();
    url = (await getUrlServer()) + `/mercadeo/api/campania/${id}/`;
    tokenUsuario = await getUserSesion("token");
    console.log(`Token -> ${tokenUsuario}`);
    const headers = {
      Authorization: `Bearer ${tokenUsuario}`,
      "Content-Type": "application/json",
    };
    const campaniaJson = {
      nombre_Campania: campania,
      descripcion: descripcion,
      fecha_Inicial: fechaInicial,
      fecha_Final: fechaFinal,
      estado: "A",
    };
    const response = await axios.put(url, campaniaJson, { headers });
    console.log(response);
  };

  //Metodo para identificar que operacion se va a ejecutar
  //Se esta ejecutando para agregar y actualizar correctamente
  const ejecutar = async () => {
    if (opcion == "Agregar") {
      crear();
    } else {
      actualizar();
    }
  };

  // Se pondran los valores a actualizar en los campos
  useEffect(() => {
    if (opcion == "Actualizar") {
      setCampania(info.segundo);
      setDescripcion(info.tercero);
      setfechaInicial(info.cuarto);
      setfechaFinal(info.quinto);
    }
  });

  return (
    <div className={sideBar ? "sideBar sideBar--open" : "sideBar"}>
      <h4>{opcion}</h4>
      <CForm action="" method="post">
        <CFormGroup>
          <CLabel htmlFor="campania">Campaña</CLabel>
           <CInput
            id="campania"
            type="text"
            placeholder="Nombre de la campaña"
            onChange={({ target }) => setCampania(target.value)}
            defaultValue={opcion == "Actualizar" ? campania : null}
          /> 
        </CFormGroup>
        <CFormGroup>
          <CLabel htmlFor="descripcion">Descripcion</CLabel>
          <textarea
            id="descripcion"
            class="form-control"
            aria-label="With textarea"
            placeholder="Digite la descripcion de la campaña"
            onChange={({ target }) => setDescripcion(target.value)}   
            defaultValue = {opcion == "Actualizar" ? descripcion : null}    
          ></textarea>
        </CFormGroup>
        <CFormGroup>
          <CLabel htmlFor="fechaInicial">Fecha inicial</CLabel>
          <CInput
            type="date"
            id="fechaInicial"
            placeholder={ opcion == "Actualizar" ? fechaInicial : "Seleccione una fecha"}
            onChange={({ target }) => setfechaInicial(target.value)}
            defaultValue = {opcion == "Actualizar" ? fechaInicial : null}              
          />
        </CFormGroup>
        <CFormGroup>
          <CLabel htmlFor="fechaFinal">Fecha final</CLabel>
          <br />
          <CInput
            type="date"
            id="fechaFinal"
            placeholder={ opcion == "Actualizar" ? fechaInicial : "Seleccione una fecha"}
            autoComplete="current-password"
            onChange={({ target }) => setfechaFinal(target.value)}
            defaultValue = {opcion == "Actualizar" ? fechaFinal : null}  
          />
        </CFormGroup>
        <CFormGroup>
          <CLabel htmlFor="estado">Estado</CLabel>
          <br />
          <select name="cars" id="estado">
            <option value="Activo">Activo</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </CFormGroup>
        <div className="d-flex justify-content-center">
          <CButton color="success" onClick={ejecutar} className="mr-2">
            {opcion}
          </CButton>
          <CButton color="danger" onClick={cerrar} className="ml-2">
            Cancelar
          </CButton>         
        </div>
      </CForm>      
    </div>
  );
};
