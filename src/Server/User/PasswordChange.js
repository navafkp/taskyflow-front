import axios from 'axios'
const API = process.env.REACT_APP_BASE_URL;

// axios call for registering new user
export const PasswordChangeAxios = (email) => {
    console.log("password chage 1st")
    const newuserData = {
        'email': email
    };
    const headers = { 'Content-Type': 'application/json' };
    console.log(`${API}/user/reset-password/`)
    return axios.post(`${API}/user/reset-password/`,
        newuserData,
        headers
    ).then((response) => {
        console.log(response, 'password reset initail res')
        return response.data
    }).catch((error) => {
        if (error.response.data.error) {
            return error.response.data.error
        } else {
            return error
        }

    })

}




// axios call for registering new user
export const VerifyOTP = (otp, email) => {
    console.log("password chage 2nd", email)
    const newuserData = {
        'otp': otp,
        'email': email
    };
    const headers = { 'Content-Type': 'application/json' };
    console.log(`${API}/user/verify-otp/`)
    return axios.post(`${API}/user/verify-otp/`,
        newuserData,
        headers
    ).then((response) => {
        console.log(response, 'password reset second res')
        return response.data
    }).catch((error) => {
        if (error.response.data.error) {
            return error.response.data.error
        } else {
            return error
        }

    })

}



// axios call for registering new user
export const ChangePassword = (email, password, password2) => {
    console.log(email, 'sasasasasasauytrdsfxgchb')
    console.log("password chage final")
    const newuserData = {
        'email': email,
        'password': password,
        'password2': password2
    };
    const headers = { 'Content-Type': 'application/json' };
    console.log(`${API}/user/change-password/`)
    return axios.post(`${API}/user/change-password/`,
        newuserData,
        headers
    ).then((response) => {
        console.log(response, 'password reset tird stg')
        return response.data
    }).catch((error) => {
        if (error.response.data.error) {
            return error.response.data.error
        } else {
            return error
        }

    })

}