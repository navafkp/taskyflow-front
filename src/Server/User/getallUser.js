import axios from 'axios'
const API = process.env.REACT_APP_BASE_URL;

export const GetalluserDetail = (access, work) => {
    return axios.get(`${API}/user/users-list/`,
        {
            params: {
                workspace: work
            },
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json',
            }
        }
    ).then((response) => {
        return response.data;
    }).catch((error) => {
        throw error;
    })
}