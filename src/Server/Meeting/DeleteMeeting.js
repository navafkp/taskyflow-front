import axios from 'axios';

const API = process.env.REACT_APP_BASE_URL;

export const DeleteMeeting = (access, id) => {
    return axios.delete(
        `${API}/meeting/delete/${id}/`,
        {
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            }
        }
    ).then((response) => {
        return response.data
    }).catch((error) => {
        return error
    });
};


