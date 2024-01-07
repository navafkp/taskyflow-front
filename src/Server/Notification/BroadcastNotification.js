import axios from 'axios'
const API = process.env.REACT_APP_BASE_URL;

// get all notification
export const GettingBroadcastNotification = (access, work) => {
    return axios.get(`${API}/user/notification/`,
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
        return response.data
    }).catch((error) => {
        return error
    })

}