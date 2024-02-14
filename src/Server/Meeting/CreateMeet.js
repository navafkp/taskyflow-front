import axios from 'axios';
const API = process.env.REACT_APP_BASE_URL;

export const createMeetAxios = (access, id, workspace, roomID, description, starting_time, duration, password) => {
    const requestData = {
        "organizer_id":id,
        'workspace':workspace,
        'roomID':roomID, 
        'description': description, 
        'starting_time': starting_time, 
        'duration':duration,
        'password': password
    };
    return axios.post(`${API}/meeting/create-meeting/`,
        requestData,
        {
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            }
        }
    ).then((respose) => {
        console.log(respose)
        return respose.data
    }).catch((error) => {
        return error
    })

}