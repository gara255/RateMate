// src/API/login-api.js
import { authRequest } from "./fetchRequestToOurDB"

const login = async (email, password) => {
    return authRequest('/token?grant_type=password', 'POST', { email, password })
}

export default login