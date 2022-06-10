import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
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
import CIcon from '@coreui/icons-react'


import '../src/css/login.css'
import axios from 'axios'


const Login = () => {

  let url = "http://152.200.146.226:9002"

  const [username, setUsuario] = useState('')
  const [password, setClave] = useState('')


  const [visible, setVisible] = React.useState(8) //Visibilidad para las alertas


  const [error, guardarError] = useState(false);


  //Codigo simplificado
  const getToken = async usuario => { //A este metodo le pasamos el usuario por parametro y nos da el token
    try {
      const respuesta = await axios.post(url + "/api/getKey", usuario)

      return respuesta.data
    }
    catch (error) {
      console.log("No es posible obtener el token")
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {

      console.log("submit funciona")

      let user = {                         
        username,
        password
      }

      console.log(user)

      const { token } = await getToken(user)

      if (token) {
        console.log("Token: " + token)
        localStorage.setItem('sesion', token)

        return <Redirect to="/dashboard" />
      } else {
        console.log("Error en el usuario")
        guardarError(false)
      }
      

      
    }
    catch (e) {
      //Aca se debe crear una ventana de error!
      guardarError(true);
    }


  }


  const Error = () => {

    return(
    
      <CAlert color="danger" variant="solid" closeButton>Datos incorrectos!</CAlert>
    
    ) 
  }



 


  let componente;

  if(error){
    //Hay un error y debe mostrarlo
    componente = <Error/>   
    console.log("Claves incorrectas")
    
    }
  else{
    componente = null
    //Me manda a la pagina correspondiente
  }
  
    
  
       

  

  return (
    <div className="c-app  flex-row align-items-center bg-image" >

      
      <CContainer>
      <div className='w-25 mx-auto mt-5 fixed-top text-center'>   
        {componente}
      </div>

      

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
                        {/*<Link to="/campanias">}<CButton color="primary" className="px-4" type='submit'>INIICIAR SESION</CButton></Link>*/}
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
