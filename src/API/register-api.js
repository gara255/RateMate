// src/API/register-api.js
import { authRequest } from "./fetchRequestToOurDB"

const register = async (username, email, password) => {
    return authRequest('/signup', 'POST', { email, password, data: { username } })
}

export default register