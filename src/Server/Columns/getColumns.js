import axios from "axios";
const API = process.env.REACT_APP_BASE_URL;

// get all columns
export const GetColumns = (access, board_slug) => {
    return axios.get(`${API}/boards/columns/`,
        {
            params: {
                board_slug: board_slug
            },
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            }
        }).then((resposne) => {
            return resposne.data
        }).catch((error) => {
            return error
        })
}


