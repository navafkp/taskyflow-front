import axios from "axios";

const API = process.env.REACT_APP_BASE_URL;

export const AddNewColumn = (access, boardId, columnTitle, newPosition) => {
    const requestData = {
        position: newPosition,
        boardId:boardId,
        title: columnTitle,
    };
    return axios.post(`${API}/boards/columns/`,
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