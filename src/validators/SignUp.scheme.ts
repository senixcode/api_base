import Joi, { SchemaInternals } from '@hapi/joi'
import { User } from '../types'
import { UserObjectValidation } from './User.objects'
interface Signup extends SchemaInternals, User { }

const signupnSchema = Joi.object<Signup>(UserObjectValidation)
export default signupnSchema
