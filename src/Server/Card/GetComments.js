
import axios from "axios";
const API = process.env.REACT_APP_BASE_URL;

// get all columns
export const GetComments = (access, card_id) => {
    return axios.get(`${API}/card/comment/`,
        {
            params: {
                cardId: card_id
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


