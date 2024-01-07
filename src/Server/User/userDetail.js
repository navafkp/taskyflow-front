import axios from "axios";
const API = process.env.REACT_APP_BASE_URL;

//get the user details
export const GetuserDetail = (access) => {
    return axios.get(`${API}/user/profile/`, {
        headers: {
            Authorization: access
        }
    }).then((response) => {
        return response.data
    }).catch((error) => {
        error = { "error": "no access" }
        return error
    })
}

//update user details
export const ChangeDetails = (data, access) => {
    const json_data = { 'data': data, 'access': access }
    return axios.patch(`${API}/user/update/`,
        json_data
    ).then((response) => {
        return response.data
    }).catch((error) => {
        return error
    })

}