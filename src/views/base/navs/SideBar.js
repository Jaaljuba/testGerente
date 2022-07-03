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


export const SideBar = ({ sideBar, opcion, cerrar, id, info,no,getCampaniaSelect }) => {

  //En info ya me llega la informacion como objeto
  let url;
  let tokenUsuario = null;

//   const [idc, setIdc] = useState("");
//   const [campania, setCampania] = useState("");
//   const [descripcion, setDescripcion] = useState("");
//   const [fechaInicial, setfechaInicial] = useState("");
//   const [fechaFinal, setfechaFinal] = useState("");
//   const[opcionFuncion, setOpcionFuncion] = useState("")

  const[data, setData] = useState([]);

  const[companiaa, setCampaniaa] = useState({
    idd: "",
    campaniaa: "",
    descripcionn: "",
    fechaIniciall: "",
    fechaFinall: ""
  })
  
  const valueToCompania = ({ name, value}) => {
    setCampaniaa( {...companiaa, [name]: value } );
  }; 

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
      nombre_Campania: companiaa.campaniaa,
      descripcion: companiaa.descripcionn,
      fecha_Inicial: companiaa.fechaIniciall,
      fecha_Final: companiaa.fechaFinall,
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
      nombre_Campania: companiaa.campaniaa,
      descripcion: companiaa.descripcionn,
      fecha_Inicial: companiaa.fechaIniciall,
      fecha_Final: companiaa.fechaFinall,
      estado: "A",
    };
    const response = await axios.put(url, campaniaJson, { headers });
    console.log(response);
  };

  //Metodo para pedir una campania
  const dameCampania = async (idC) =>{
    tokenUsuario = await getUserSesion("token");
    const url = await getUrlServer();
    const headers = {
      Authorization: `Bearer ${tokenUsuario}`,
      "Content-Type": "application/json",
    };
    axios
      .get(`${url}/mercadeo/api/dataGridCampanias/${idC}/`, { headers })
      .then((res) => {
        console.log("Nos muestra la  data");
        console.log(res);       
      });
  }

  //Metodo para identificar que operacion se va a ejecutar
  //Se esta ejecutando para agregar y actualizar correctamente
  const ejecutar = async () => {
    if (opcion == "Agregar") {
      crear();
    } else {
      actualizar();
      console.log(companiaa);
    }
  };

  //Me deja los valores por defecto
  const refrescarFormularios = () =>{
    document.getElementById("formulario").reset();    
  }

  //Funcionando
  const [idd, setIdd] = useState("")
  //Funcionando
  const getCampaniaaSelect = async (i) =>{

    tokenUsuario = await getUserSesion("token");
    const url = await getUrlServer();
    const headers = {
      Authorization: `Bearer ${tokenUsuario}`,
      "Content-Type": "application/json",
    };
    axios
      .get(`${url}/mercadeo/api/campania/${i}/`, { headers })
      .then((res) => {
        console.log("Nos muestra la data de la campaña seleccionada");
        console.log(res); 
        //Cambiamos los valores de la campania
        console.log("Procedemos a cambiar el valor")
        setCampaniaa({
          idd: res.data.id_Campania,
          campaniaa: res.data.nombre_Campania,
          descripcionn: res.data.descripcion,
          fechaIniciall: res.data.fecha_Inicial,
          fechaFinall: res.data.fecha_Final
        })
        console.log(res.data.id_Campania)//De esta forma se llama el valor
      });
     
  }

  //Cuando se modifique la variable id se ejecute este metodo
  useEffect(() =>{
    data.forEach(p =>{
       if(id == p.id_Campania){
          console.log(`id que llega ${id}, id campania ${p.id_Campania}`)
          setCampaniaa({
            idd: p.id_Campania,
            campaniaa: p.nombre_Campania,
            descripcionn: p.descripcion,
            fechaIniciall: p.fecha_Inicial,
            fechaFinall: p.fecha_Final
          })
       }
    })
  }, [id])

  //Segunda opcion de la data.
  //Simplemente llamo todos los datos y los guardo, despues, se pasa el id, y con ese
  //id saco el dato que necesito, eso es todo.
  //Pedimos toda la data
  const getData = async () => {
    tokenUsuario = await getUserSesion("token");
    const url = await getUrlServer();
    const headers = {
      Authorization: `Bearer ${tokenUsuario}`,
      "Content-Type": "application/json",
    };
    axios
      .get(`${url}/mercadeo/api/dataGridCampanias/`, { headers })
      .then((res) => {
        console.log("aca entro a al sidebar");
        console.log(res);
        console.log(res.data.results);
        setData(res.data.results);
        console.log(data);
      });
  };

  //Solo se ejecutara una vez, quiere que me traiga toda la data
  useEffect(() =>{
    getData()
  }, [])

  return (
    <div className={sideBar ? "sideBar sideBar--open" : "sideBar"}>
      <h4>{opcion}</h4>
      <CForm action="" method="post" id="formulario">
        <CFormGroup>
          <CLabel htmlFor="campania">Campaña</CLabel>
           <CInput
            id="campania"
            type="text"
            placeholder="Nombre de la campaña"
            name="campaniaa"
            onChange={e  => valueToCompania(e.target)} 
            defaultValue={opcion == "Actualizar" ? companiaa.campaniaa : null}
          /> 
        </CFormGroup>
        <CFormGroup>
          <CLabel htmlFor="descripcion">Descripcion</CLabel>
          <CInput
            id="descripcion"
            type="text"
            class="form-controll"
            name="descripcionn"
            onChange={e  => valueToCompania(e.target)}  
            placeholder="Digite la descripcion de la campaña"
            // onChange={({ target }) => setDescripcion(target.value)}   
            defaultValue = {opcion == "Actualizar" ? companiaa.descripcionn : null}    
          ></CInput>
        </CFormGroup>
        <CFormGroup>
          <CLabel htmlFor="fechaInicial">Fecha inicial</CLabel>
          <CInput
            type="date"
            id="fechaInicial"
            name="fechaIniciall"
            onChange={e  => valueToCompania(e.target)} 
            defaultValue = {opcion == "Actualizar" ? companiaa.fechaIniciall : null}              
          />
        </CFormGroup>
        <CFormGroup>
          <CLabel htmlFor="fechaFinal">Fecha final</CLabel>
          <br />
          <CInput
            type="date"
            id="fechaFinal"
            name="fechaFinall"
            onChange={e  => valueToCompania(e.target)} 
            defaultValue = {opcion == "Actualizar" ? companiaa.fechaFinall : null}     
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
