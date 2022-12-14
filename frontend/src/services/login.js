import axios from "axios";
const baseUrl = "http://localhost:5000/login"

const login = async details => {
    const response = await axios.post(baseUrl, details)
    return response.data
}

export default {login}