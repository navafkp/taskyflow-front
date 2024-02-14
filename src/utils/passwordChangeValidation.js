import * as Yup from 'yup'

export const changePasswordSchema = Yup.object().shape({
    email: Yup.string().email().ensure().required('Please enter your email'),
})