import axios from 'axios';
import {apiUrl} from '../constantes/DefaultValue'

const token = localStorage.getItem('Token');
const auth = {'Authorization': `${token}`}; 


function findStuff(url){
    return axios.get(`${apiUrl}/${url}`, {headers: auth}).then(
        (responses)=> responses.data
    )
}

function postStuff(url, body){
    
    return axios.post(`${apiUrl}/${url}`, body, {headers: auth}).then(
        (responses)=> responses.data
    )
}

function updateStuff(url, body){
    return axios.put(`${apiUrl}/${url}`, body, {headers: auth}).then(
        (responses)=> responses.data
    )
}

function deleteStuff(url){
    return axios.delete(`${apiUrl}/${url}`, {headers: auth}).then(
        (responses)=> responses.data
    )
}

export default {
    findStuff,
    postStuff,
    updateStuff,
    deleteStuff
};