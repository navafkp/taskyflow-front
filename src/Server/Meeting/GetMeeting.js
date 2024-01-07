import axios from 'axios'
const API = process.env.REACT_APP_BASE_URL;

export const getMeetings = (access, workspace) => {
    return axios.get(`${API}/meeting/`,
        {
            params: {
                workspace: workspace
            },
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            }
        }
    ).then((respose) => {
        return respose.data
    }).catch((error) => {
        return error
    })
}
