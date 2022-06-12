import React from 'react'
import axios from 'axios'

//Get token - funcion que lea un json y nos devuelva el url del servidor

export const urlServer = "http://152.200.146.226:9002" //Export

export const getUrlServer = async () => {
    return urlServer
}

export const getToken = async (usuario) => { //A este metodo le pasamos el usuario por parametro y nos da el token
    try {
        const respuesta = await axios.post(urlServer + "/api/getKey", usuario)

        return respuesta.data
    }
    catch (error) {
        console.log("No es posible obtener el token")
    }
}

export const getUserData = async (token) => {
    try {
        
    } catch (error) {
        
    }
}

export const setUserSesion = async (nameItem, valueItem) =>{
    localStorage.setItem(nameItem, valueItem)
}

export const getUserSesion = async (nameItem) => {
    
    return localStorage.getItem(nameItem)
}


