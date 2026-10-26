// src/API/login-api.js
import { authRequest } from "./fetchRequestToOurDB"

const login = async (user, password) => {
    return authRequest('/token?grant_type=password', 'POST', { user, password })
}

export default login