
import * as yup from "yup";
export const createUerSchema = yup.object().shape({
    email: yup.string().required(),
    name: yup.string().required(),
    surname:yup.string().required(),
    number: yup.string().required(),
    username: yup.string().required(),
    password:yup.string().required(),
})