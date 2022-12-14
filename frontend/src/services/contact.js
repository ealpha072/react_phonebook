import axios from 'axios'
const baseUrl = "http://localhost:3001/contacts"

const getALl = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newContact) => {
    const request = axios.post(baseUrl, newContact)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default {getALl, create, update}
