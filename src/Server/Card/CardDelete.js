import axios from 'axios';

const API = process.env.REACT_APP_BASE_URL;

export const CardDelete = (access, id) => {
    return axios.delete(
        `${API}/card/delete/${id}/`,
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


