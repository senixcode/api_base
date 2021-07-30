import { Schema, model, Document } from 'mongoose'
import { User } from 'types'
import bcrypt from 'bcryptjs'
export interface UserSchema extends Document, User {
    encryptPassword(pass: string): Promise<string>,
    validatePassword(pass: string): Promise<boolean>
}
const userSchema = new Schema<UserSchema>({
    username: {
        type: String,
        required: true,
        min: 4,
        lowecase: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})
userSchema.methods.encryptPassword = async (pass: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(pass, salt)
}
userSchema.methods.validatePassword = async function (pass: string): Promise<boolean> {
    return await bcrypt.compare(pass, this.password)
}
export default model<UserSchema>('User', userSchema)
