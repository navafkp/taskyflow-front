import axios from 'axios';
const API = process.env.REACT_APP_BASE_URL;

export const CommentUpdate = (access, commentId, newComment) => {
    console.log('axios', access, commentId, newComment )
    return axios.patch(`${API}/card/update-comment/`, {
        newComment: newComment,
        commentId: commentId
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