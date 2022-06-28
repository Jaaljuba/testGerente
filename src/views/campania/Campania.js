import React from "react";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import { getUrlServer, getUserSesion } from "../../../src/GeneralsFunctions";
import { SideBar } from "../../../src/views/base/navs/SideBar.js";
import { Options } from "../../../src/views/base/options/Option.js";

import {
  CButton,
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
} from "@coreui/react";

// import '../src/css/campanias.css'
import "bootstrap-icons/font/bootstrap-icons.css";

import "../../css/campania.css";

const Campania = () => {
  const getBadge = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "secondary";
      case "Pending":
        return "warning";
      case "Banned":
        return "danger";
      default:
        return "primary";
    }
  };

  var tokenUsuario = null;
  var isLogged = false;
  const campos = [
    {
      key: "nombre_Campania",
      label: "Campaña",
    },
    "fecha_Inicial",
    "Estado",
    {
      key: "fecha_Actualizacion",
      label: "Actualizacion",
    },
  ];

  const [data, setData] = useState([]);

  const [opcion, setOpcion] = useState([]);

  const validarSesion = async () => {
    isLogged = await getUserSesion("isLogged");
    tokenUsuario = await getUserSesion("token");

    console.log(`isLogged ESM-> ${isLogged}`);
    console.log(`Token -> ${tokenUsuario}`);

    //Si hay un token ponerlo!
    if (isLogged) {
      getData();
    } else {
      // Debe volver al login
      console.log("No esta logged y debe volver al login...");

      history.push("/login");
    }
  };

  // Se carga la informacion
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

  useEffect(() => {
    validarSesion();
  }, []);

  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`);
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  //Funcion para abrir y cerrar el navbar
  //const[sideBar, setSidebar] = useState(false);

  const [sideBar, setSidebar] = useState(false);

  const toggleSideBar = (opcion) => {
    //Le pasamos el parametro para que se actualicee

    setSidebar((prevState) => !prevState);
    setOpcion(opcion);
  };

  const toggle = () => {
    setSidebar((prevState) => !prevState);
  };
  // Metodos que se pasaron al option
  const [opciones, setOpciones] = useState(false);

  const [idCampania, setIdCampania] = useState("000");

  let idv = "0";
  const toggleOpciones = (id, dos, tres, cuatro, cinco) => {
    setOpciones((prevState) => !prevState);

    idv = id;
    setIdCampania(id);

    //Se va a poner la informacion de todos los elementos

    setInfo({
      primero: id,
      segundo: dos,
      tercero: tres,
      cuarto: cuatro,
      quinto: cinco,
    });
  };

  let url = "";
  const eliminarCampania = async () => {
    url = (await getUrlServer()) + "/mercadeo/api/campania/" + idCampania; //Se le agrega el id del usaurio

    tokenUsuario = await getUserSesion("token");

    console.log(`Token -> ${tokenUsuario}`);

    const headers = {
      Authorization: `Bearer ${tokenUsuario}`,
      "Content-Type": "application/json",
    };

    const response = await axios.delete(url, { headers });
  };

  //Va a abrir o cerrar el menu
  //const [menu, setMenu] = useState(false);

  const handleToggle = (opcion, data) => {
    //Le pasamos el parametro para que se actualicee

    setSidebar((prevState) => !prevState);
    setOpcion(opcion);

    //Al contenido actualizar le debemos poner las opciones
    //Creame un array nuevo, su contenido es todo lo que tiene users mas lo nuevo
  };

  // Tiene la informacion para mostrar en actualizar, cada posicion representa un recuadro.
  const [info, setInfo] = useState(null);

  return (
    <div>
      {/*Aca se debe cambiar la opcion y recibe un id para el actualizar y eliminar*/}
      <SideBar
        sideBar={sideBar}
        opcion={opcion}
        cerrar={toggle}
        id={idCampania}
        info={info}
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
                {/* <i className="bi bi-calendar-event w-25 text-primary mr-2"></i> */}
                <i class="bi bi-plus-circle mr-2"></i>
                Agregar
              </CButton>

              <CDataTable
                hover
                striped
                items={data}
                fields={campos}
                itemsPerPage={5}
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
                      {/* <div className={opciones ? "opciones--open" : "opciones"}> */}

                      <Options
                        p={
                          item.id_Campania == idCampania && opciones == true
                            ? true
                            : false
                        }
                        id={item.idCampania}
                        handleToggle={handleToggle}
                      />

                      {/* Cambia el estado de opciones */}
                      {/* <i class="bi bi-three-dots" onClick={(e) => toggleOpciones(item.id_Campania, e)}></i>  */}
                      <i
                        class="bi bi-three-dots"
                        onClick={() =>
                          toggleOpciones(
                            item.id_Campania,
                            item.nombre_Campania,
                            item.descripcion,
                            item.fecha_Inicial,
                            item.fecha_Final
                          )
                        }
                      ></i>

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
