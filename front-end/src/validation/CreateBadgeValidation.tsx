import * as yup from "yup";

export const createBadgeSchema = yup.object().shape({
    badgeName: yup.string().required(),
    badgeDescription:yup.string().required(),
    badgeChallenge: yup.string().required(),
})
