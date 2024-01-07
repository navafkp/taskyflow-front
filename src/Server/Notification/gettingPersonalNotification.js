import axios from 'axios'
const API = process.env.REACT_APP_BASE_URL;

// get all notification
export const GettingPersonalNotification = (access, company, email) => {
    return axios.get(`${API}/user/notification/`,
        {
            params: {
                workspace: company,
                email:email,
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