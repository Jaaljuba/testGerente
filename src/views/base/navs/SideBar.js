import React, { useEffect } from "react";
import "../../../../src/css/sideBar.css";
import { useState } from "react";
import { getUrlServer, getUserSesion } from "src/GeneralsFunctions";
import axios from "axios";

import {
  CButton,
  CForm,
  CLabel,
  CFormText,
  CInput,
  CFormGroup,
} from "@coreui/react";

export const SideBar = ({ sideBar, opcion, cerrar, id, info }) => {
  let url;
  let tokenUsuario = null;

  const [campania, setCampania] = useState();
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

  const eliminar = async () => {
    id = id.replace(/-/g, "");
    cerrar();
    url = (await getUrlServer()) + `/mercadeo/api/campania/${id}/`;
    tokenUsuario = await getUserSesion("token");
    const headers = {
      Authorization: `Bearer ${tokenUsuario}`,
      "Content-Type": "application/json",
    };

    const response = await axios.delete(url, { headers });
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

  // Se pondran los valores
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
          <CLabel htmlFor="nf-email">Campaña</CLabel>
          <CInput
            type="email"
            id="nf-email"
            name="nf-email"
            placeholder={ opcion == "Actualizar" ? campania : "Digite el nombre de la campaña"}
            autoComplete="campania"
            onChange={({ target }) => setCampania(target.value)}
            
          />
        </CFormGroup>

        <CFormGroup>
          <CLabel htmlFor="nf-email">Descripcion</CLabel>
          <textarea
            class="form-control"
            aria-label="With textarea"
            placeholder={ opcion == "Actualizar" ? descripcion : "Digite la descripcion de la campaña"}
            onChange={({ target }) => setDescripcion(target.value)}
         
          ></textarea>
        </CFormGroup>

        <CFormGroup>
          <CLabel htmlFor="nf-password">Fecha inicial</CLabel>
          <CInput
            type="date"
            id="nf-password"
            name="nf-password"
            placeholder={ opcion == "Actualizar" ? fechaInicial : "Seleccione una fecha"}
            autoComplete="current-password"
            onChange={({ target }) => setfechaInicial(target.value)}
              
          />
        </CFormGroup>

        <CFormGroup>
          <CLabel htmlFor="nf-password">Fecha final</CLabel>
          <br />
          <CInput
            type="date"
            id="nf-password"
            name="nf-password"
            placeholder={ opcion == "Actualizar" ? fechaInicial : "Seleccione una fecha"}
            autoComplete="current-password"
            onChange={({ target }) => setfechaFinal(target.value)}
            
          />
        </CFormGroup>

        <CFormGroup>
          <CLabel htmlFor="nf-password">Estado</CLabel>
          <br />
          <select name="cars">
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
