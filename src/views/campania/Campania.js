import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { getUrlServer, getUserSesion } from "../../../src/GeneralsFunctions";
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

import "../../css/campania.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Campania = () => {
  //Metodo constructor de las campañas. Con esto le pasamos los datos a editar.
  const [data, setData] = useState([]);
  const [idCampania, setIdCampania] = useState(""); //Se guarda el id de la campaña seleccionada
  const history = useHistory(); //Nos sirve para redireccionar
  const [isOpen, setOpen] = useState(false)

  const [isOpenForm, setOpenForm] = useState(false)
  //Valor de la action
  //A para agregar y U para actualizar
  const [action, setAction] = useState("")
  //Data que se va a enviar al sidebar para que se actualice
  const [dataUpdate, setDataUpdate] = useState(null)
  //Aca va a estar el modal para borrar
  const [modal, setModal] = useState(false);

  var isLogged = false;
  var tokenUsuario = null;

  const toggle = ()=>{
    setModal(!modal);
  }

  // Nos muestra los campos que se van a mostrar en la tabla campaña
  const campos = [
    {
      key: "nombre_Campania",
      label: "Campaña",
    },
    "fecha_Inicial",
    "fecha_Final",
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

  //En el righSidebar se le debe pasar el objeto y de alli se toman las propiedades.
  const fnAgregar = async (campania) => {
    let url = await getUrlServer() + "/mercadeo/api/campania/";
    tokenUsuario = await getUserSesion("token");

    console.log("Entro")

    console.log(campania)

    console.log(`Token -> ${tokenUsuario}`);

    const headers = {
      Authorization: `Bearer ${tokenUsuario}`,
      "Content-Type": "application/json",
    };
    const campaniaJson = {
      nombre_Campania: campania.nombre_Campania,
      descripcion: campania.descripcion,
      fecha_Inicial: campania.fecha_Inicial,
      fecha_Final: campania.fecha_Final,
      estado: campania.estado,
    };

    const response = await axios.post(url, campaniaJson, { headers });

    console.log(response)

    setOpen((value) => !value)
    getData()
  }


  //Se debe tener el id que la persona seleccione
  const fnUpdate = async (campania) => {
    let id = idCampania;
    id = id.replace(/-/g, "");

    console.log("La id seleccionada es: " + id);
    
    let url = await getUrlServer() + `/mercadeo/api/campania/${id}/`;
    tokenUsuario = await getUserSesion("token");
    
    console.log(`Token -> ${tokenUsuario}`);
    console.log("La url es " + url)
    
    console.log(campania)

    const headers = {
      Authorization: `Bearer ${tokenUsuario}`,
      "Content-Type": "application/json",
    };
    const campaniaJson = {
      nombre_Campania: campania.nombre_Campania,
      descripcion: campania.descripcion,
      fecha_Inicial: campania.fecha_Inicial,
      fecha_Final: campania.fecha_Final,
      estado: campania.estado,
    };
    const response = await axios.put(url, campaniaJson, { headers });
    console.log(response);
    setOpen((value) => !value)

   getData() 

    // setDataUpdate(null)
  }

  const fnBorrar = async () => {
    let id = idCampania;

    console.log("El id es: " + id)

    id = id.replace(/-/g, "");
    let url = (await getUrlServer()) + "/mercadeo/api/campania/" + id + "/"; //Se le agrega el id del usaurio

    console.log("La id seleccionada es: " + id);
    console.log("La url es: " + url)

    tokenUsuario = await getUserSesion("token");
    console.log(`Token para eliminar -> ${tokenUsuario}`);
    const headers = {
      Authorization: `Bearer ${tokenUsuario}`,
      "Content-Type": "application/json",
    };

    const response = await axios.delete(url, { headers });

    console.log("Borrar: " + url);
    console.log(response);

    getData() 
  }

  // Antes de mostar datos se validara la sesion
  useEffect(() => {
    validarSesion();
  }, []);
  
  return (
    <div className="side">
      <CModal
        show={modal}
        onClose={toggle}
      >
        <CModalHeader closeButton>Informacion</CModalHeader>
        <CModalBody>
          ¿Esta seguro de que desea eliminar la campaña?
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => {fnBorrar(); toggle()}}>Aceptar</CButton>{' '}
          
          <CButton
            color="secondary"
            onClick={toggle}
          >Cancelar</CButton>
        </CModalFooter>
      </CModal>


     <Form
      titulo = "Prueba" 
      fields={[
        {
          "Label": "Nombre Campaña:",
          "Field": "nombre_Campania",
          "Type": "text",
          "Placeholder": "Digite el nombre de la campaña",
          "DefaultValue": null
        },
        {
          "Label": "Descripción:",
          "Field": "descripcion",
          "Type": "TextArea",
          "Placeholder": "Digite la descripcion de la campaña",
          "DefaultValue": null
        },
        {
          "Label": "Fecha Inicial:",
          "Field": "fecha_Inicial",
          "Type": "date",
          "Placeholder": null,
          "DefaultValue": null
        },
        {
          "Label": "Fecha Final:",
          "Field": "fecha_Final",
          "Type": "date",
          "Placeholder": null,
          "DefaultValue": null
        },
        {
          "Label": "Estado:",
          "Field": "estado",
          "Type": "select",
          "Options": [
            {
              "Value":"A",
              "Text": "Activo"             
            }, 
            {
              "Value":"P",
              "Text": "Pendiente"  
            },
            {
              "Value": "I",
              "Text": "Inactivo"
            }
          ],
          "Placeholder": null,
          "DefaultValue": null,
        },
        {
          "Label": "Prueba de Swicth:",
          "Field": "campanias",
          "Type": "switch",
          "Placeholder": null,
          "DefaultValue": null
        },
        {
          "Label": "Campo2:",
          "Field": "Campo2",
          "Type": "text",
          "Placeholder": "Digite el nombre de la campaña",
          "DefaultValue": null
        },
        {
          "Label": "Campo3",
          "Field": "Campo3",
          "Type": "text",
          "Placeholder": "Digite el nombre de la campaña",
          "DefaultValue": null
        },
        {
          "Label": "Campo4",
          "Field": "Campo4",
          "Type": "text",
          "Placeholder": "Digite el nombre de la campaña",
          "DefaultValue": null
        },
        {
          "Label": "Campo5",
          "Field": "Campo5",
          "Type": "text",
          "Placeholder": "Digite el nombre de la campaña",
          "DefaultValue": null
        },
        {
          "Label": "Campo6",
          "Field": "Campo6",
          "Type": "text",
          "Placeholder": "Digite el nombre de la campaña",
          "DefaultValue": null
        },
        {
          "Label": "Campo7",
          "Field": "Campo7",
          "Type": "text",
          "Placeholder": "Digite el nombre de la campaña",
          "DefaultValue": null
        },
        {
          "Label": "Campo8",
          "Field": "Campo8",
          "Type": "text",
          "Placeholder": "Digite el nombre de la campaña",
          "DefaultValue": null
        },
      ]}
      isOpenForm={isOpenForm}
      setOpenForm={setOpenForm}
      />

      <RightSideBar
        isOpen={isOpen}
        setOpen={setOpen}
        fields={[
          {
            "Label": "Nombre Campaña:",
            "Field": "nombre_Campania",
            "Type": "text",
            "Placeholder": "Digite el nombre de la campaña",
            "DefaultValue": null
          },
          {
            "Label": "Descripción:",
            "Field": "descripcion",
            "Type": "TextArea",
            "Placeholder": "Digite la descripcion de la campaña",
            "DefaultValue": null
          },
          {
            "Label": "Fecha Inicial:",
            "Field": "fecha_Inicial",
            "Type": "date",
            "Placeholder": null,
            "DefaultValue": null
          },
          {
            "Label": "Fecha Final:",
            "Field": "fecha_Final",
            "Type": "date",
            "Placeholder": null,
            "DefaultValue": null
          },
          {
            "Label": "Estado:",
            "Field": "estado",
            "Type": "select",
            "Options": [
              {
                "Value":"A",
                "Text": "Activo"             
              }, 
              {
                "Value":"P",
                "Text": "Pendiente"  
              },
              {
                "Value": "I",
                "Text": "Inactivo"
              }
            ],
            "Placeholder": null,
            "DefaultValue": null,
          },
          {
            "Label": "Prueba de Swicth:",
            "Field": "campanias",
            "Type": "switch",
            "Placeholder": null,
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
              <h3>Campañas</h3>
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
                  estado: (item) => (
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
                      <div className="mr-2 puntos">
                        <CDropdown className="mt-2">
                          <CDropdownToggle caret={false}>
                            <i className="bi bi-three-dots"/>
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem
                              onClick={() => {
                                setOpen((value) => !value); setAction("U");
                                setIdCampania(item.id_Campania);
                                //Aca guardamos toda la data a actualizar
                                setDataUpdate(
                                  {
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
                              onClick={() => {toggle(); setIdCampania(item.id_Campania)}}><i className="bi bi-trash mr-2"></i>Borrar</CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                      </div>
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* boton de prueba borrar */}
      <button onClick={() =>{setOpenForm((value) => !value)}}>Prueba</button>
    </div>
  );
};

export default Campania;
