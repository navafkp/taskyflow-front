import axios from 'axios';
const API = process.env.REACT_APP_BASE_URL;

// remove assignees from card
export const RemoveAssignee = (access, id) => {
    return axios.delete(
        `${API}/card/assignee/${id}/`,
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
