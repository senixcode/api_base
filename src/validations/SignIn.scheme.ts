import Joi, { SchemaInternals } from '@hapi/joi'
import { UserOmitUsername } from '../types'
import { UserOmitUsernameObjectValidation } from './User.objects'
interface SignIn extends SchemaInternals, UserOmitUsername { }

const siginSchema = Joi.object<SignIn>(UserOmitUsernameObjectValidation)
export default siginSchema
