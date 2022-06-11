import React from "react";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';
import {
    CButton,
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CPagination
} from '@coreui/react'

// import '../src/css/campanias.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

import { getUserSesion, getUrlServer } from "src/GeneralsFunctions";



const Campania = () => {



const getBadge = status => {
    switch (status) {
      case 'Active': return 'success'
      case 'Inactive': return 'secondary'
      case 'Pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }




    var tokenUsuario = null
    var isLogged = false
    const campos = [
        {
            "key":"nombre_Campania", 
            "label": "Compañia"
        }, 
        "fecha_Inicial", 
        "Estado", 
        {
            "key": "fecha_Actualizacion",
            "label": "Actualizacion"
        }
    ]

    const [data, setData] = useState([]);

    const validarSesion = async () => {
        isLogged = await getUserSesion("isLogged")
        tokenUsuario = await getUserSesion("token")

        console.log(`isLogged ESM-> ${isLogged}`);
        console.log(`Token -> ${tokenUsuario}`);

        //Si hay un token ponerlo!
        if (isLogged) {
            getData()
        } else {
            // Debe volver al login
            console.log("No esta logged y debe volver al login...");

            history.push("/login")
        }
    }

    // Se carga la informacion
    const getData = async () => {
        const url = await getUrlServer()
        const headers = {
            "Authorization": `Bearer ${tokenUsuario}`,
            "Content-Type": "application/json"
        };

        axios.get(`${url}/mercadeo/api/dataGridCampanias/`, { headers })
            .then(res => {
                console.log("Nos muestra la  data")
                console.log(res)
                console.log(res.data.results)
                setData(res.data.results)
                console.log(data)
            })
    }

    useEffect(() => {
        validarSesion()
    }, []);

    const history = useHistory()
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
    const [page, setPage] = useState(currentPage)

    const pageChange = newPage => {
        currentPage !== newPage && history.push(`/users?page=${newPage}`)
    }

    useEffect(() => {
        currentPage !== page && setPage(currentPage)
    }, [currentPage, page])




    return (
        <CRow xl={12} className="d-flex justify-content-center">
            <CCol xl={7} className=" ">
                <CCard>
                    <CCardHeader>
                        <h3>Campañas</h3>
                    </CCardHeader>
                    <CCardBody>
                        <CButton variant="outline" color="success" className="mb-3">
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
                                'nombre_Campania':
                                    (item) => (
                                        // <CBadge color={getBadge("Pending")}>
                                        <td className="">
                                             
                                            <div className="mt-1">
                                                <div className="text-left h4 font-weight-bold">{item.nombre_Campania}</div>
                                            </div>
                                            
                                        </td>
                                        // </CBadge>
                                    ),
                                'fecha_Inicial':
                                    (item) => (
                                        <td>
                                            <div className='text-center d-flex mt-1'>
                                                <div className=" mr-2">
                                                    <i className="bi bi-calendar-event text-primary"></i>
                                                </div>
                                                <div className="text-center">
                                                    {moment(item.fecha_Inicial).format('DD/MM/YYYY')}
                                                </div>
                                            </div>
                                            <div className='d-flex'>
                                                <div className="text-center mr-2 ">
                                                    <i className="bi bi-calendar-event text-danger"></i>
                                                </div>
                                                <div className="text-center">{moment(item.fecha_Final).format('DD/MM/YYYY')}</div>
                                            </div>
                                        </td>
                                    ),

                                'fecha_Actualizacion':

                                    (item) => (
                                        <td className="">
                                            <div className='d-flex mt-1'>
                                                <div className="text-center mr-2">
                                                    <i className="bi bi-calendar-event w-25"></i>
                                                </div>
                                                <div className="text-center">{moment(item.fecha_Actualizacion).format('DD/MM/YYYY')}</div>

                                            </div>
                                            <div className='text-center d-flex'>
                                                <i className="bi bi-smartwatch mr-2 text-primary"></i>
                                                <div className="text-left text-center">{moment(item.fecha_Actualizacion).format('HH:mm:ss')}</div>
                                            </div>
                                        </td>

                                    )


                                // 'status':
                                //     (item) => (
                                //         <td>
                                //             <CBadge color={getBadge(item.status)}>
                                //                 {item.status}
                                //             </CBadge>
                                //         </td>
                                //     )
                            }}
                        />
                        


                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>


    );
}

export default Campania;