import Joi from "@hapi/joi";
export const UserOmitUsernameObjectValidation = {
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required(),
}

export const UserObjectValidation = {
    username: Joi.string().lowercase().required(),
    ...UserOmitUsernameObjectValidation,
}