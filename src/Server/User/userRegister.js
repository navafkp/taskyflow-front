import axios from 'axios'
const API = process.env.REACT_APP_BASE_URL;

// axios call for registering new user
export const UserRegister = (
    name, username, email, workspace, password,
    password2, role = 'manager', designation
) => {
    const newuserData = {
        name, username, email, workspace,
        password, password2, role, designation
    };
    const headers = { 'Content-Type': 'application/json' };
    return axios.post(`${API}/user/register/`,
        newuserData,
        headers
    ).then((response) => {
        return response.data
    }).catch((error) => {
        if (error.response.data.error) {
            return error.response.data.error
        } else {
            return error
        }

    })

}