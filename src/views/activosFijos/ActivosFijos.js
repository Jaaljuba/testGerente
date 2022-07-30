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

const ActivosFijos = () => {

    const [data, setData] = useState([]);
    const [idCampania, setIdCampania] = useState(""); //Se guarda el id de la campaña seleccionada
    const history = useHistory(); //Nos sirve para redireccionar

    const [isOpen, setOpen] = useState(true)

    const [isOpenForm, setOpenForm] = useState(false)
    //Valor de la action
    //A para agregar y U para actualizar
    const [action, setAction] = useState("")
    //Data que se va a enviar al sidebar para que se actualice
    const [dataUpdate, setDataUpdate] = useState(null)
    //Aca va a estar el modal para borrar
    const [modal, setModal] = useState(false);

    var tokenUsuario = null;
    var isLogged = false;

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

    // Nos muestra los campos que se van a mostrar en la tabla campaña
    const campos = [
        {
            key: "tipo_ActivoFijo",
            label: "Tipo activo fijo",
        },
        "fecha_Creacion",
        "fecha_Actualizacion"
    ];

    useEffect(() => {
        validarSesion();
    }, []);

    return (
        <div className="contenedor">

            <RightSideBar
                isOpen={true}
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
                                "Value": "A",
                                "Text": "Activo"
                            },
                            {
                                "Value": "P",
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
                fnSave={action == "A" ? "holis" : "a"}
            />

            <CRow xl={12} className="d-flex justify-content-center">
                <CCol xl={11} xxl={8} className="">

                    <CCard>
                        <CCardHeader>
                            <h3>Activos fijos</h3>
                        </CCardHeader>
                        <CCardBody >
                            <CButton
                                variant="outline"
                                color="success"
                                className="mb-3 open-menu"
                            // onClick={() => { setOpen((value) => !value); setAction("A"); setDataUpdate(null) }}
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

export default ActivosFijos;