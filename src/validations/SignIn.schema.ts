import Joi, { SchemaInternals } from '@hapi/joi'
interface SignIn extends SchemaInternals {
    email: string, password: string
}
const siginSchema = Joi.object<SignIn>({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required(),
})
export default siginSchema
