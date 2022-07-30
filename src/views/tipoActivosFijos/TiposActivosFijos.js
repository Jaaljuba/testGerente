import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { getUrlServer, getUserSesion } from "../../GeneralsFunctions";
import { RightSideBar } from "../components/RightSideBar";
import { Form } from "../components/Form";

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter
} from "@coreui/react";

import "../../css/activosFijos.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const TiposActivosFijos = () => {

  const [data, setData] = useState([]);
  const [idTipoActivoFijo, setTipoActivoFijo] = useState(""); //Se guarda el id de la campaña seleccionada
  const history = useHistory(); //Nos sirve para redireccionar

  const [isOpen, setOpen] = useState(false)

  const [isOpenForm, setOpenForm] = useState(false)
  //Valor de la action
  //A para agregar y U para actualizar
  const [action, setAction] = useState("")
  //Data que se va a enviar al sidebar para que se actualice

  //La data que le vamos a enviar al sidebar
  const [dataUpdate, setDataUpdate] = useState(null)
  //Aca va a estar el modal para borrar
  const [modal, setModal] = useState(false);

  var tokenUsuario = null;
  var isLogged = false;

  var tokenUsuario = null;

  var isLogged = false;


  const toggle = () => {
    setModal(!modal);
  }

  // Se valida sesion y se guarda el token
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
    console.log("Tipos activos fijos acaaa!");
    axios
      .get(`${url}/activosfijos/api/dataGridTiposActivosFijos/`, { headers })
      .then((res) => {
        console.log("Tipos activos fijos acaaa!");
        console.log(res);
        console.log(res.data.results);
        setData(res.data.results);
        console.log("Data por la data: ")
        console.log(data);
      });
  };

  // Nos muestra los campos que se van a mostrar en la tabla campaña
  const campos = [
    {
      key: "tipo_ActivoFijo",
      label: "Tipo activo fijo",
    },
    "fecha_Creacion",
    "fecha_Actualizacion",
    "opciones"
  ];


  //Funciones de mi programa

  const fnAgregar = async (tipoActivo) => {
    let url = await getUrlServer() + "/activosfijos/api/tipoActivoFijo/";
    tokenUsuario = await getUserSesion("token");
    console.log("Entro")
    console.log(tipoActivo)
    console.log(`Token -> ${tokenUsuario}`);
    const headers = {
      Authorization: `Bearer ${tokenUsuario}`,
      "Content-Type": "application/json",
    };
    const tipoActivoJson = {
      //Modificar por el tipo de activo json
      // nombre_Campania: campania.nombre_Campania,
      // descripcion: campania.descripcion,
      // fecha_Inicial: campania.fecha_Inicial,
      // fecha_Final: campania.fecha_Final,
      // estado: campania.estado,
      tipo_ActivoFijo: tipoActivo.tipo_ActivoFijo
    };



    const response = await axios.post(url, tipoActivoJson, { headers });

    console.log("Acaaaaa!")
    console.log(response)

    setOpen((value) => !value)
    getData()
  }

  //Se debe tener el id que la persona seleccione
  const fnUpdate = async (tipoActivo) => {
    let id = idTipoActivoFijo;
    id = id.replace(/-/g, "");

    console.log("La id seleccionada es: " + id);

    console.log(tipoActivo)
    let url = await getUrlServer() + `/activosfijos/api/tipoActivoFijo/${id}/`;
    tokenUsuario = await getUserSesion("token");

    console.log(`Token -> ${tokenUsuario}`);
    console.log("La url es " + url)

    console.log(tipoActivo)

    const headers = {
      Authorization: `Bearer ${tokenUsuario}`,
      "Content-Type": "application/json",
    };
    const campaniaJson = {
      tipo_ActivoFijo: tipoActivo.tipo_ActivoFijo
    };
    const response = await axios.put(url, campaniaJson, { headers });
    console.log(response);
    setOpen((value) => !value)

    getData()

    // setDataUpdate(null)
  }

  const fnBorrar = async () => {

    console.log("Entro al borrar!!!");

    let id = idTipoActivoFijo;
    console.log("El id es: " + id)
    id = id.replace(/-/g, "");
    let url = (await getUrlServer()) + "/activosfijos/api/tipoActivoFijo/" + id + "/"; //Se le agrega el id del usaurio

    console.log("La id seleccionada BORRAR es: " + id);
    console.log("La url es: " + url)
    
    tokenUsuario = await getUserSesion("token");
    console.log(`Token para eliminar -> ${tokenUsuario}`);
    const headers = {
      Authorization: `Bearer ${tokenUsuario}`,
      "Content-Type": "application/json",
    };
    console.log("BORRAR")
    const response = await axios.delete(url, { headers });

    console.log("BORRAR!  : " + url);
    console.log(response);

    getData()
  }


  useEffect(() => {
    validarSesion();
  }, []);

  return (
    <div className="contenedor">

      <CModal
        show={modal}
        onClose={toggle}
      >
        <CModalHeader closeButton>Informacion</CModalHeader>
        <CModalBody>
          ¿Esta seguro de que desea eliminar la campaña?
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => { fnBorrar(); toggle() }}>Aceptar</CButton>{' '}
          <CButton
            color="secondary"
            onClick={toggle}
          >Cancelar</CButton>
        </CModalFooter>
      </CModal>

      <RightSideBar
        isOpen={isOpen}
        setOpen={setOpen}
        fields={[
          {
            "Label": "Tipo de actividad:",
            "Field": "tipo_ActivoFijo",
            "Type": "text",
            "Placeholder": "Digite el tipo de activdad",
            "DefaultValue": null
          }
        ]}
        action={action}
        dataUpdate={dataUpdate}
        fnSave={action == "A" ? fnAgregar : fnUpdate}
      />
      <CRow xl={12} className="d-flex justify-content-center">
        <CCol xl={11} xxl={8} className="">
          <CCard>
            <CCardHeader>
              <h3>Tipos activos fijos</h3>
            </CCardHeader>
            <CCardBody >
              <CButton
                variant="outline"
                color="success"
                className="mb-3 open-menu"
                onClick={() => { setOpen((value) => !value); setAction("A"); setDataUpdate(null) }}
              //Se debe cambiar el titulo para la partde del sideBar
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
                          {item.tipo_ActivoFijo}
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
                          {moment(item.fecha_Creacion).format("DD/MM/YYYY")}
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="text-center mr-2 ">
                          <i className="bi bi-calendar-event text-danger"></i>
                        </div>
                        <div className="text-center">
                          {moment(item.fecha_Actualizacion).format("DD/MM/YYYY")}
                        </div>
                      </div>
                    </td>
                  ),
                  opciones: (item) => (
                    <td className="">
                      <div className="mr-2 puntos">
                        <CDropdown className="mt-2">
                          <CDropdownToggle caret={false}>
                            <i className="bi bi-three-dots" />
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem
                              onClick={() => {
                                setOpen((value) => !value); setAction("U");
                                alert()
                                setTipoActivoFijo(item.id_TipoActivoFijo);
                                //Aca guardamos toda la data a actualizar
                                setDataUpdate(
                                  {
                                    //Cambiar la data!!!
                                    "nombre_Campania": item.nombre_Campania,
                                    "descripcion": item.descripcion,
                                    "fecha_Inicial": item.fecha_Inicial,
                                    "fecha_Final": item.fecha_Final,
                                    "estado": item.estado
                                  }
                                )
                              }}>
                              <i className="bi bi-pencil mr-2" />Cambiar
                            </CDropdownItem>
                            <CDropdownItem
                              onClick={() => { toggle(); setTipoActivoFijo(item.id_TipoActivoFijo) }}><i className="bi bi-trash mr-2"></i>Borrar</CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                      </div>
                    </td>
                  )
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default TiposActivosFijos;