import { Schema, model, Document } from 'mongoose'
import { User } from 'types'
import bcrypt from 'bcryptjs'
import { encryptPassword } from '../help/encrypt'
export interface UserSchema extends Document, User {
    comparePassword(pass: string): Promise<boolean>
}
const userSchema = new Schema<UserSchema>({
    username: {
        type: String,
        required: true,
        min: 4,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
})
userSchema.pre<UserSchema>('save', async function (next) {
    const user = this
    if (!user.isModified('password')) return next()
    const hash = await encryptPassword(user.password)
    user.password = hash
    next()
})

userSchema.methods.comparePassword = async function (pass: string): Promise<boolean> {
    return await bcrypt.compare(pass, this.password)
}
export default model<UserSchema>('User', userSchema)
