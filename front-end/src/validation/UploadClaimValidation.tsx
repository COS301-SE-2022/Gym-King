import * as yup from "yup";

export const claimSchema = yup.object().shape({
    i1: yup.string().required(),
    i2: yup.string().required(),
    i3: yup.string().required(),
})