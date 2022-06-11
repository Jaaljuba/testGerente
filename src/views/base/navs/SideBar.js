import React, { useEffect } from 'react'
import '../../../../src/css/sideBar.css'
import { useState } from 'react'
import {
    CButton,
    CForm,
    CLabel,
    CFormText,
    CInput,
    CFormGroup
} from '@coreui/react'

export const SideBar = ({ sideBar, opcion, cerrar}) => {

    


    return (

        <div className={sideBar ? "sideBar sideBar--open" : "sideBar"}>
            
            <h5 onClick={cerrar}><i class="bi bi-x-circle-fill"></i></h5>
            <h4>{opcion}</h4>

            <CForm action="" method="post">
                <CFormGroup>
                    <CLabel htmlFor="nf-email">Campaña</CLabel>
                    <CInput
                        type="email"
                        id="nf-email"
                        name="nf-email"
                        placeholder="Digite el nombre de la campaña"
                        autoComplete="campania"
                    />
                    <CFormText className="help-block">Digite el nombre de la campaña</CFormText>
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="nf-password">Fecha inicial</CLabel>
                    <CInput
                        type="date"
                        id="nf-password"
                        name="nf-password"
                        placeholder="Enter Password.."
                        autoComplete="current-password"
                    />
                    <CFormText className="help-block">Seleccione la fecha inicial</CFormText>
                </CFormGroup>

                <CFormGroup>
                    <CLabel htmlFor="nf-password">Estado</CLabel>
                    <br />
                    <select name="cars" >
                        <option value="Activo">Activo</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                    <CFormText className="help-block">Seleccione el estado</CFormText>
                </CFormGroup>

                <CFormGroup>
                    <CLabel htmlFor="nf-password">Actualizacion</CLabel>
                    <br />
                    <CInput
                        type="date"
                        id="nf-password"
                        name="nf-password"
                        placeholder="Enter Password.."
                        autoComplete="current-password"
                    />
                    <CFormText className="help-block">Seleccione la fecha de actualzacion</CFormText>
                </CFormGroup>
                <div class="d-flex justify-content-center">
                    <CButton color="success" onClick={cerrar}>{opcion}</CButton>
                </div>  
            </CForm>
        </div>
    )
}
