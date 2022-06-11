import React from 'react'
import '../../../../src/css/sideBar.css'

import {
    CButton,
    CForm,
    CLabel,
    CFormText,
    CInput,
    CFormGroup
} from '@coreui/react'

export const SideBar = ({ sideBar }) => {


    console.log(sideBar)
    return (

        <div className={sideBar ? "sideBar sideBar--open" : "sideBar"}>

            <h4>Variable</h4>

            <CForm action="" method="post">
            <CFormGroup>
              <CLabel htmlFor="nf-email">Email</CLabel>
              <CInput
                type="email"
                id="nf-email"
                name="nf-email"
                placeholder="Enter Email.."
                autoComplete="email"
              />
              <CFormText className="help-block">Please enter your email</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-password">Password</CLabel>
              <CInput
                type="password"
                id="nf-password"
                name="nf-password"
                placeholder="Enter Password.."
                autoComplete="current-password"
              />
              <CFormText className="help-block">Please enter your password</CFormText>
            </CFormGroup>
          </CForm>
        </div>
    )
}
