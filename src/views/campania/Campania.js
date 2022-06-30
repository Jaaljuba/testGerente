import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import { getUrlServer, getUserSesion } from "../../../src/GeneralsFunctions";
import { SideBar } from "../../../src/views/base/navs/SideBar.js";
import { Options } from "../../../src/views/base/options/Option.js";
import { Eliminar } from "../../../src/views/base/alertas/Eliminar.js";

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";

import "../../css/campania.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Campania = () => {
  //Metodo constructor de las campañas. Con esto le pasamos los datos a editar.

  const [data, setData] = useState([]);
  const [opcion, setOpcion] = useState([]);
  const [eliminar, setEliminar] = useState(false); //Nos guarda si el usario desea eliminar o no
  const [sideBar, setSidebar] = useState(false); //Si se muestra el sidebar o no
  const [opciones, setOpciones] = useState(false); //Si se muestra opciones o no
  const [idCampania, setIdCampania] = useState("0"); //Se guarda el id de la campaña seleccionada
  //Objeto campania a editar

  const [info, setInfo] = useState(null);
  let campaniaInfo = {
    id: "",
    campania: "",
    descripcion: "",
    fechaInicial: "",
    fechaFinal: "",
    estado: "",
  };

  const history = useHistory(); //Nos sirve para redireccionar

  var tokenUsuario = null;
  var isLogged = false;

  const toggleElimnar = () => {
    setEliminar((prevState) => !prevState);
  };

  const toggleSideBar = (opcion) => {
    setSidebar((prevState) => !prevState);
    setOpcion(opcion);
  };

  const toggle = () => {
    setSidebar((prevState) => !prevState);
  };

  //ERROR - Metodo repetido, buscar como quitarlo!
  const handleToggle = (opcion, data) => {
    setSidebar((prevState) => !prevState);
    setOpcion(opcion);
  };

  // Nos muestra los campos que se van a mostrar en la tabla
  const campos = [
    {
      key: "nombre_Campania",
      label: "Campaña",
    },
    "fecha_Inicial",
    "estado",
    {
      key: "fecha_Actualizacion",
      label: "Actualizacion",
    },
    "opciones",
  ];

  const validarSesion = async () => {
    isLogged = await getUserSesion("isLogged");
    tokenUsuario = await getUserSesion("token");
    console.log(`isLogged ESM-> ${isLogged}`);
    console.log(`Token -> ${tokenUsuario}`);
    if (isLogged) {
      getData();
    } else {
      // Debe volver al login
      console.log("No esta logged y debe volver al login...");
      history.push("/login");
    }
  };

  const getData = async () => {
    const url = await getUrlServer();
    const headers = {
      Authorization: `Bearer ${tokenUsuario}`,
      "Content-Type": "application/json",
    };
    axios
      .get(`${url}/mercadeo/api/dataGridCampanias/`, { headers })
      .then((res) => {
        console.log("Nos muestra la  data");
        console.log(res);
        console.log(res.data.results);
        setData(res.data.results);
        console.log(data);
      });
  };

  // Cuando le damos click a opciones le pasamos la info
  const toggleOpciones = () => {  
    setIdCampania(campaniaInfo.id);
    setOpciones((prevState) => !prevState);  
    setInfo(campaniaInfo) 

  };

  const eliminarCampania = async () => {
    alert("Se elimino, aun no funciona esto");
    let idC = idCampania.replace(/-/g, "");
    let url = (await getUrlServer()) + "/mercadeo/api/campania/" + idC + "/"; //Se le agrega el id del usaurio
    tokenUsuario = await getUserSesion("token");
    console.log(`Token -> ${tokenUsuario}`);

    const headers = {
      Authorization: `Bearer ${tokenUsuario}`,
      "Content-Type": "application/json",
    };

    const response = await axios.delete(url, { headers });
    console.log("Borrar: " + url);
    console.log(response);
  };

  // Antes de mostar datos se validara la sesion
  useEffect(() => {
    validarSesion();
  }, []);

  return (
    <div className="side">
      <Eliminar
        eliminar={eliminar}
        toggleElimnar={toggleElimnar}
        eliminarCampania={eliminarCampania}
      />
      <SideBar
        sideBar={sideBar}
        opcion={opcion}
        cerrar={toggle}
        id={idCampania}
        info={info}
        no = {campaniaInfo.id}
      />
      <CRow xl={12} className="d-flex justify-content-center">
        <CCol xl={7} className="">
          <CCard>
            <CCardHeader>
              <h3>Campañas</h3>
            </CCardHeader>
            <CCardBody>
              <CButton
                variant="outline"
                color="success"
                className="mb-3 open-menu"
                onClick={(e) => toggleSideBar("Agregar", e)}
              >
                <i class="bi bi-plus-circle mr-2"></i>
                Agregar
              </CButton>

              <CDataTable
                hover
                striped
                items={data}
                fields={campos}
                pagination
                scopedSlots={{
                  nombre_Campania: (item) => (
                    <td className="">
                      <div className="mt-1">
                        <div className="text-left h4 font-weight-bold">
                          {item.nombre_Campania}
                        </div>
                      </div>
                    </td>
                  ),
                  fecha_Inicial: (item) => (
                    <td>
                      <div className="text-center d-flex mt-1">
                        <div className=" mr-2">
                          <i className="bi bi-calendar-event text-success"></i>
                        </div>
                        <div className="text-center">
                          {moment(item.fecha_Inicial).format("DD/MM/YYYY")}
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="text-center mr-2 ">
                          <i className="bi bi-calendar-event text-danger"></i>
                        </div>
                        <div className="text-center">
                          {moment(item.fecha_Final).format("DD/MM/YYYY")}
                        </div>
                      </div>
                    </td>
                  ),
                  fecha_Actualizacion: (item) => (
                    <td className="">
                      <div className="d-flex mt-1">
                        <div className="text-center mr-2">
                          <i className="bi bi-calendar-event w-25"></i>
                        </div>
                        <div className="text-center">
                          {moment(item.fecha_Actualizacion).format(
                            "DD/MM/YYYY"
                          )}
                        </div>
                      </div>
                      <div className="text-center d-flex">
                        <i className="bi bi-smartwatch mr-2 "></i>
                        <div className="text-left text-center">
                          {moment(item.fecha_Actualizacion).format("HH:mm:ss")}
                        </div>
                      </div>
                    </td>
                  ),
                  opciones: (item) => (
                    <td className="">
                      <Options
                        //Funcionalidad para abrir o cerrar componente
                        //me toma el objeto que le demos click en los
                        //3 putnos
                        abrirOptions={
                          item.id_Campania == idCampania && opciones == true
                            ? true
                            : false
                        }
                        id={item.idCampania}
                        handleToggle={handleToggle}
                        eliminarCampania={eliminarCampania}
                        toggleEliminar={toggleElimnar}
                      />
                      <div className="mr-2 puntos">
                        <i
                          class="bi bi-three-dots"
                          onClick={() =>
                            { 
                              // se pasa la info mediante un objeto
                              campaniaInfo.id = item.id_Campania;
                              campaniaInfo.campania = item.nombre_Campania;
                              campaniaInfo.descripcion =item.descripcion;
                              campaniaInfo.fechaInicial =item.fecha_Inicial;
                              campaniaInfo.fechaFinal = item.fecha_Final;

                              toggleOpciones();  
                            }
                          }
                          
                        ></i>
                      </div>
                      
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default Campania;
