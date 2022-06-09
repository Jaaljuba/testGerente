import React from "react";
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from "react";

import '../../../../src/css/campanias.css'
import 'bootstrap-icons/font/bootstrap-icons.css';


const Campania = () => {


    let url = "http://152.200.146.226:9002"
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlc2Fycm9sbG9Ac2ljeWEuY29tIiwidXNlcl9pZCI6Nywib3JpZ19pYXQiOjE2NTQ3MjQ4OTQsInVzZXJuYW1lIjoiMjI3MjgyIiwiZXhwIjoxNjU0NzY4MDk0fQ.9rjLDRfFEeJnt2o9zQhkhHY0Ue1VdsYUw91vY5UM1sA"

    const [data, setData] = useState([]);
    const [key, setToken] = useState()

    const getToken = () => {
        console.log("Entro a getToken...");

        let usuario = {
            username: '227282',
            password: 'R@f1t4'
        }

        let endPoint = url + "/api/getKey"

        console.log(endPoint)

        axios.post(endPoint, usuario)
            .then(respuesta => {
                console.log(respuesta.data)

                let token = respuesta.data.token
                setToken(respuesta.data.token)
                //setToken("hola")
                //console.log("KEY ->" + apiKEY)
                console.log("KEY ->" + token)
            })
    }

    // Se carga la informacion
    const getData = () => {
        const headers = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        };

        axios.get(url + "/mercadeo/api/dataGridCampanias/", { headers })
            .then(res => {
                console.log("Nos muestra la  data")
                console.log(res)
                console.log(res.data.results)
                setData(res.data.results)
                console.log(data)
            })

        //Array.isArray(data) ? (data).map(e => console.log("es un arreglo")) : null

    }


    useEffect(() => {
        // getToken()
        getData()
    }, []);


    return (
        <div className=" w-50 mx-auto">
            <div className="">
                <header className="f">
                    <h2 className="text-left mt-5 mb-5 text-primary">Campañas</h2>
                </header>
                <div className="">

                    {/* Table */}

                    <table className="w-100">
                        {/* Table header */}
                        
                        <div>
                        <thead className="border-bottom">
                            <tr>
                                <th className="">
                                    <div className="text-left ">Campaña</div>
                                </th>
                                <th className="">
                                    <div className="text-left ">Fechas</div>
                                </th>
                                <th className="w-25">
                                    <div className="text-center ">Estado</div>
                                </th>
                                <th className="">
                                    <div className="text-left">Actualizacion</div>
                                </th>
                                <th className="">
                                    <div className="text-center ">&nbsp;</div>
                                </th>
                            </tr>

                        </thead>
                        </div>

                        {/* Table body */}
                        <tbody className="">
                            {/* Row */}

                            {
                                data.map(item => (

                                    <tr key={item.id_Campania}>
                                        <td className="">
                                            <div className="mt-5">
                                                <div className="text-left h4 font-weight-bold">{item.nombre_Campania}</div>
                                            </div>
                                        </td>
                                        <td className="">

                                            <div className='text-center d-flex mt-5'>
                                                <div className=" mr-2">
                                                    <i class="bi bi-calendar-event w-25 text-primary"></i>
                                                </div>
                                                <div className="text-center">
                                                    {moment(item.fecha_Inicial).format('DD/MM/YYYY')}
                                                </div>
                                            </div>
                                            <div className='d-flex'>
                                                <div className="text-center mr-2 ">
                                                    <i class="bi bi-calendar-event w-25 text-danger"></i>
                                                </div>
                                                <div className="text-center">{moment(item.fecha_Final).format('DD/MM/YYYY')}</div>
                                            </div>
                                        </td>
                                        <td className="">
                                        </td>
                                        <td className="">
                                            <div className='d-flex mt-5'>
                                                <div className="text-center mr-2">
                                                    <i class="bi bi-calendar-event w-25"></i>
                                                </div>
                                                <div className="text-center">{moment(item.fecha_Actualizacion).format('DD/MM/YYYY')}</div>

                                            </div>
                                            <div className='text-center d-flex'>
                                                <i class="bi bi-smartwatch mr-2 text-primary"></i>
                                                <div className="text-left text-center">{moment(item.fecha_Actualizacion).format('HH:mm:ss')}</div>
                                            </div>
                                        </td>
                                    </tr>

                                ))
                            }

                        </tbody>
                    </table>

                </div>
            </div>
        </div>



    );
}

export default Campania;