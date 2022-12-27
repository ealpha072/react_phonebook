import axios from 'axios'
const baseUrl = "http://localhost:5000/contacts"

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getALl = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async newContact => {
    const config = {
        headers: {Authorization: token}
    }
    const response = await axios.post(baseUrl, newContact, config)
    return response.data
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
} 

export default {getALl, create, update, remove, setToken}
