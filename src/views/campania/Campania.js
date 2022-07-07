import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import { getUrlServer, getUserSesion } from "../../../src/GeneralsFunctions";
import { RightSideBar } from "../components/RightSideBar";
import { MenuOptionsTable } from "../components/MenuOptionsTable";
import { Eliminar } from "../components/Eliminar";

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CDropdown,
  CDropdDownToggle,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem
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

  const [idCampania, setIdCampania] = useState(""); //Se guarda el id de la campaña seleccionada
  const history = useHistory(); //Nos sirve para redireccionar

  var tokenUsuario = null;
  var isLogged = false;

  const fnCambiar = (id) => {
    setSidebar((prevState) => !prevState);
    setOpcion("Actualizar");
  };

  const toggleElimnar = () => {
    setEliminar((prevState) => !prevState);
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

  const refresh = () => {
    //Refrescar los datos
  }


//   const [campania, setCampania] = useState({
//     id: "",
//     campania: "",
//     descripcion: "",
//     fechaInicial: "",
//     fechaFinal: ""
//  })

  
  //En el righSidebar se le debe pasar el objeto y de alli se toman las propiedades.
  const fnAgregar = async (campania) =>{
    let url = await getUrlServer() + "/mercadeo/api/campania/";
    let tokenUsuario = await getUserSesion("token");

    console.log("Entro")
    console.log(campania)

    console.log(`Token -> ${tokenUsuario}`);

     const headers = {
       Authorization: `Bearer ${tokenUsuario}`,
       "Content-Type": "application/json",
     };
     const campaniaJson = {
       nombre_Campania: campania.Campania,
       descripcion: campania.Descripcion,
       fecha_Inicial: campania.FechaInicial,
       fecha_Final: campania.FechaFinal,
       estado: "A",
     };

     console.log("campania")
    console.log(campaniaJson)

     const response = await axios.post(url, campaniaJson, { headers });

     console.log(response);
  }

  //Se debe tener el id que la persona seleccione
  const fnUpdate = async (campania) =>{
    idCampania = idCampania.replace(/-/g, "");
    let url = await getUrlServer() + `/mercadeo/api/campania/${idCampania}/`;
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
    console.log("campania")
    console.log(campaniaJson)


    const response = await axios.put(url, campaniaJson, { headers });
    console.log(response);

    // cerrar();
  }
  
  const fnBorrar = async () =>{
    alert("Borrar")
  }

  

  let camposs = [
    
      "nombre",
      "desc",
      
    ]

  return (
    <div className="side">
      <Eliminar
        eliminar={eliminar}
        toggleElimnar={toggleElimnar}
        eliminarCampania={eliminarCampania}
        refresh={refresh}
      />
      <RightSideBar
        isOpen={true}
        fields={[
          {
            "Label": "Nombre Campaña:",
            "Name": "Campania",
            "Field": "campania",
            "Type": "text",
            "Placeholder": "Digite el nombre de la campaña",
            "DefaultValue": null
          },
          {
            "Label": "Descripción:",
            "Name": "Descripcion",
            "Field": "descripcion",
            "Type": "TextArea",
            "Placeholder": "Digite la descripcion de la campaña",
            "DefaultValue": null
          },
          {
            "Label": "Fecha Inicial:",
            "Name": "FechaInicial",
            "Field": "fecha_Inicial",
            "Type": "date",
            "Placeholder": null,
            "DefaultValue": null
          },
          {
            "Label": "Fecha Final:",
            "Name": "FechaFinal",
            "Field": "fecha_Final",
            "Type": "date",
            "Placeholder": null,
            "DefaultValue": null
          },
          {
            "Label": "Estado:",
            "Field": "estado",
            "Type": "select",
            "Placeholder": null,
            "DefaultValue": null
          }
        ]}
        data={[
            {
              "id_Campania": "asdfasdf",
              "campania": "algo",
              "descripcion": "esta"
            }
        ]}
        action={"A"}
        fnSave={fnAgregar}
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
                // ERROR
                // onClick={(e) => toggleSideBar("Agregar", e)}
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
                          <i className="bi bi-three-dots" onClick={setIdCampania(item.id_Campania)} />
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem onClick={() => fnCambiar(item.id_Campania)}> <i className="bi bi-pencil mr-2"/>Cambiar</CDropdownItem>
                            <CDropdownItem onClick={() => fnBorrar(item.id_Campania) }><i className="bi bi-trash mr-2"></i>Borrar</CDropdownItem>
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
    </div>
  );
};

export default Campania;
