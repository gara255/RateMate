import { authRequest } from "./fetchRequestToOurDB"

const register = async (username, email, password) => {
    return authRequest('/signup', 'POST', { username, email, password })
}

export default register