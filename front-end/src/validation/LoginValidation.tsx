import * as yup from "yup";

export const claimSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
})