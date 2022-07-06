import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import { getUrlServer, getUserSesion } from "../../../src/GeneralsFunctions";
import { SideBar } from "../components/RightSideBar";
import { MenuOptionsTable} from "../components/MenuOptionsTable";
import { Eliminar } from "../components/Eliminar";

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

  const [idCampania, setIdCampania] = useState("preuba"); //Se guarda el id de la campaña seleccionada

  //Objeto campania a editar
  // let campaniaInfo = {
  //   id: "",
  //   campania: "",
  //   descripcion: "",
  //   fechaInicial: "",
  //   fechaFinal: "",
  //   estado: "",
  // };

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

  const toggleOpciones = () => { 
    setOpciones((prevState) => !prevState);
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
    console.log("token del usuario: " + tokenUsuario)
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
        console.log("Data por la data: ")
        console.log(data);
      });
  };

  const eliminarCampania = async () => {
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

  const refresh = () =>{
    //Refrescar los datos
  }

  //Se guarda el id que seleccionamos al presionar los 3 puntos.
  //Con este comprobamos cual elemento option se debe abrir.
  const [idSelect, setIdSelect] = useState("");

  // Me va a guardar el valor si presiono o no presiono.
  // const [presiono, setPresion] = useState("")

  // Recibe los datos de la campania escogia en options y los guarda en campaniaInfo 
  // const recibeCampaniaEditar = (id, nombre, descripcion, fechaInicial, fechaFinal) =>{
  //   campaniaInfo.id = id;
  //   campaniaInfo.campania = nombre;
  //   campaniaInfo.descripcion = descripcion;
  //   campaniaInfo.fechaInicial = fechaInicial;
  //   campaniaInfo.fechaFinal = fechaFinal;
  // }

  // let id_Seleccionado = "";

  return (
    <div className="side">
      <Eliminar
        eliminar={eliminar}
        toggleElimnar={toggleElimnar}
        eliminarCampania={eliminarCampania}
        refresh={refresh}
      />
      <SideBar
        sideBar={sideBar}
        opcion={opcion}
        cerrar={toggle}
        id={idCampania}
      />
      <CRow xl={12} className="d-flex justify-content-center">
        <CCol xl={11} xxl={8} className="">
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
                id="formulario" //Editado
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
                                               
                        {/* <div className="descripcion_campania">
                          {item.descripcion}
                        </div>   */}
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
                  estado: (item) =>(
                    <td>
                      <div className="text-center">
                          {item.estado}
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
                      <MenuOptionsTable
                        //Funcionalidad para abrir o cerrar componente
                        //me toma el objeto que le demos click en los
                        //3 putnos
                        isOpen = {true}
                        Options={[
                          {
                            'Name': 'Ver',
                            'Icon': 'bi bi-eye',
                            'Action': 'editarRegistro',
                            'Options': item.id_Campania
                          },
                          {
                            'Name': 'Cambiar',
                            'Icon': 'bi bi-pencil',
                            'Action': 'editarRegistro',
                            'Options': item.id_Campania
                          },
                          {
                            'Name': 'Borrar',
                            'Icon': 'bi bi-trash',
                            'Action': 'editarRegistro',
                            'Options': item.id_Campania
                          }
                        ]}

                          abrirOptions={
                          item.id_Campania == idSelect && opciones == true
                            ? true
                            : false
                        }
                      />
                      <div className="mr-2 puntos">
                        <i
                          class="bi bi-three-dots"
                          onClick={() => {
                              //Se le pasa el id para saber cual se debe abrir
                              setIdSelect(item.id_Campania);

                              // toggleOpciones();
                              setOpciones((prevState) => !prevState);
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
