import axios from "axios";
const API = process.env.REACT_APP_BASE_URL;

// axios call for user login
export const UserLogin = (email, password) => {
    return axios.post(`${API}/user/`, {
        email,
        password,
    }).then((response) => {
        const access = response.data.access;
        const refresh = response.data.refresh;
        const authdata = { 'access': access, 'refresh': refresh }
        return authdata;
    }).catch((error) => {
        error = { 'error': 'Authentication Failed' }
        return error
    }
    )
}

// get access token from refresh token
export const UserAccess = (refresh) => {
    return axios.post(`${API}/user/access`, { refresh })
        .then((resposne) => {
            const access = resposne.data.access
            const refresh = resposne.data.refresh
            const authdata = { 'access': access, 'refresh': refresh }
            return authdata
        }).catch((error => {
            error = { 'error': "Unauthorized Access" }
            return error
        }))
}