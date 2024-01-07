
import axios from 'axios'
const API = process.env.REACT_APP_BASE_URL;


export const InviteAssignee = (access, selectedEmails, card_id) => {
    const requestData = {
        card_id: card_id,
        selectedEmails: selectedEmails
    };
    return axios.post(`${API}/card/assignee/invite/`,
        requestData,
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
    })

}