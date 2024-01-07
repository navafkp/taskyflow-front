import axios from 'axios';
const API = process.env.REACT_APP_BASE_URL;

export const CardEditUpdate = (access, card_id, updatedData) => {
    return axios.patch(`${API}/card/card-update/`, {
        updatedData: updatedData,
        cardId: card_id
    },
        {
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.data
        }).catch((error) => {
            return error
        })
}