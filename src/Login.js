import React, { useState } from 'react'
import { Redirect, Route, useHistory} from 'react-router-dom'
import {routes} from './routes'
import { withRouter, Link} from 'react-router-dom';
import CIcon from '@coreui/icons-react'
import '../src/css/login.css'
import axios from 'axios'
import { render } from 'react-dom'
import { useLocation } from 'react-router-dom';

import { getToken,  setUserSesion } from 'src/GeneralsFunctions.js'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  
  CAlert,
  CProgress
  
} from '@coreui/react'
import { Ingreso } from './views/base/alertas/Ingreso';

const Login = () => {

  /*Datos
    User: 227282
    pass: R@f1t4
  */  

  //Si no pude ingresar poner alerta de contraseña incorrecta!

  const [username, setUsuario] = useState('')
  const [password, setClave] = useState('')
  const [error, guardarError] = useState(false); //Nos indica que hubo un error

  const toogleError = () =>{
    guardarError((prevState) => !prevState);
  }

  let history = useHistory()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      let user = {                         
        username,
        password
      }

      const { token } = await getToken(user)

      console.log(`Token en Login ${token}`);

      if (token) {
        setUserSesion("isLogged", true)
        setUserSesion("token", token)

        guardarError(false)

        history.push("/dashboard")
      } else {
        guardarError(false)
      }
    }
    catch (e) {
      //Aca se debe crear una ventana de error!
      setUserSesion("isLogged", false)
      setUserSesion("token", null)
      guardarError(true);
    }
  }


  return (
    <div className="c-app  flex-row align-items-center bg-image" >
      <CContainer>
        <Ingreso open={error} toogleError={toogleError}/>
        <CRow className="justify-content-center">
          <CCol md="4">
            <CCardGroup>
              <CCard className="p-2">
                <div className='mx-auto mt-n5 circle'>

                </div>
                <CCardBody>
                  <form onSubmit={handleSubmit}>
                    <p className="text-muted text-center">Sistema Operativo de Gestión Administrativa - xnetGerente</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text"
                        placeholder="Usuario"
                        onChange={({ target }) => setUsuario(target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password"
                        placeholder="Contraseña"
                        onChange={({ target }) => setClave(target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" type='submit'>INICIAR SESION</CButton> 
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Recuperar contraseña</CButton>
                      </CCol>
                    </CRow>
                  </form>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>

  )
}

export default Login
