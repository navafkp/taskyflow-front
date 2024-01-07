import * as Yup from "yup";

export const userSchema = Yup.object({
    name: Yup.string().required(),
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    workspace: Yup.string().required(),
    role: Yup.string().nullable(),
    designation: Yup.string().nullable(),
    password: Yup.string().min(4).required(),
    password2: Yup.string().oneOf([Yup.ref('password')], 'Passwords mismatch'),
})