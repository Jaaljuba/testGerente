import React, { useEffect } from "react";

import { useState } from "react";
import { getUrlServer, getUserSesion } from "src/GeneralsFunctions";
import axios from "axios";

import "../../../../src/css/sideBar.css";

import {
  CButton,
  CForm,
  CLabel,
  CInput,
  CFormGroup,
} from "@coreui/react";


export const SideBar = ({ sideBar, opcion, cerrar, id }) => {
  let url;
  let tokenUsuario = null;

  const[campania, setCampania] = useState({
    id: "",
    campania: "",
    descripcion: "",
    fechaInicial: "",
    fechaFinal: ""
  })
  
  //Metodo para recibir los valores de los inputs
  const valueToCampania = ({ name, value}) => {
    setCampania( {...campania, [name]: value } );
  }; 

  const crear = async () => {
    cerrar();
    url = await getUrlServer() + "/mercadeo/api/campania/";
    tokenUsuario = await getUserSesion("token");

    console.log(`Token -> ${tokenUsuario}`);

    const headers = {
      Authorization: `Bearer ${tokenUsuario}`,
      "Content-Type": "application/json",
    };
    const campaniaJson = {
      nombre_Campania: campania.campania,
      descripcion: campania.descripcion,
      fecha_Inicial: campania.fechaInicial,
      fecha_Final: campania.fechaFinal,
      estado: "A",
    };
    const response = await axios.post(url, campaniaJson, { headers });
    console.log(response);
  };

  const actualizar = async () => {
    id = id.replace(/-/g, "");
    url = await getUrlServer() + `/mercadeo/api/campania/${id}/`;
    tokenUsuario = await getUserSesion("token");
    console.log(`Token -> ${tokenUsuario}`);
    console.log("La urle es " + url)
    const headers = {
      Authorization: `Bearer ${tokenUsuario}`,
      "Content-Type": "application/json",
    };
    const campaniaJson = {
      nombre_Campania: campania.campania,
      descripcion: campania.descripcion,
      fecha_Inicial: campania.fechaInicial,
      fecha_Final: campania.fechaFinal,
      estado: "A",
    };
    const response = await axios.put(url, campaniaJson, { headers });
    console.log(response);
    
    cerrar();
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

  //Me deja los valores por defecto
  const refrescarFormularios = () =>{
    document.getElementById("formulario").reset();    
  }


  //Funcionando
  const getCampaniaSelect = async (id) =>{
    tokenUsuario = await getUserSesion("token");
    const url = await getUrlServer();
    const headers = {
      Authorization: `Bearer ${tokenUsuario}`,
      "Content-Type": "application/json",
    };
    axios
      .get(`${url}/mercadeo/api/campania/${id}/`, { headers })
      .then((res) => {
        console.log("Nos muestra la data de la campaña seleccionada");
        console.log(res); 
        //Cambiamos los valores de la campania
        console.log("Procedemos a cambiar el valor")
        setCampania({
          id: res.data.id_Campania,
          campania: res.data.nombre_Campania,
          descripcion: res.data.descripcion,
          fechaInicial: res.data.fecha_Inicial,
          fechaFinal: res.data.fecha_Final
        })
        console.log(res.data.id_Campania)//De esta forma se llama el valor
      });
  }

  //Cuando se modifique la variable id se ejecute este metodo
  useEffect(() =>{
    getCampaniaSelect(id)
  }, [id])

  return (
    <div className={sideBar ? "sideBar sideBar--open" : "sideBar"}>
      <h4>{opcion}</h4>
      <CForm action="" method="post" id="formulario">
        <CFormGroup>
          <CLabel htmlFor="campania" >Campaña</CLabel>
           <CInput
            id="campania"
            type="text"
            placeholder="Nombre de la campaña"
            name="campania"
            onChange={e  => valueToCampania(e.target)} 
            defaultValue={opcion == "Actualizar" ? campania.campania : null}
          /> 
        </CFormGroup>
        <CFormGroup>
          <CLabel htmlFor="descripcion" id="titulo">Descripcion</CLabel>
          <textarea
            id="descripcion"
            type="text" //Text area?
            class="form-control"
            name="descripcion"
            onChange={e  => valueToCampania(e.target)}  
            placeholder="Digite la descripcion de la campaña"
            // onChange={({ target }) => setDescripcion(target.value)}   
            defaultValue = {opcion == "Actualizar" ? campania.descripcionn : null}    
          ></textarea>
        </CFormGroup>
        <CFormGroup>
          <CLabel htmlFor="fechaInicial">Fecha inicial</CLabel>
          <CInput
            type="date"
            id="fechaInicial"
            name="fechaInicial"
            onChange={e  => valueToCampania(e.target)} 
            defaultValue = {opcion == "Actualizar" ? campania.fechaInicial : null}              
          />
        </CFormGroup>
        <CFormGroup>
          <CLabel htmlFor="fechaFinal">Fecha final</CLabel>
          <br />
          <CInput
            type="date"
            id="fechaFinal"
            name="fechaFinal"
            onChange={e  => valueToCampania(e.target)} 
            defaultValue = {opcion == "Actualizar" ? campania.fechaFinal : null}     
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
          <CButton color="danger" onClick={() =>
            {cerrar(); 
            refrescarFormularios()
            }} 
            className="ml-2">
            Cancelar
          </CButton>         
        </div>
      </CForm>      
    </div>
  );
};
