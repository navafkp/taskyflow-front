import axios from 'axios'
const API = process.env.REACT_APP_BASE_URL;

export const GetBoads = (access, company) => {
    return axios.get(`${API}/boards/`,
        {
            params: {
                workspace: company
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

// create board
export const BoardCreateAxios = (access, workspace, id, name, description, visibility) => {
    const requestData = {
        workspace: workspace,
        user_id: id,
        name: name,
        description: description,
        visibility: visibility
    };
    return axios.post(`${API}/boards/`,
        requestData,
        {
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