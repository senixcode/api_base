import { Request as Req, Response as Res } from 'express'
import { day, getToken } from '../help/jwt'
import User, { UserSchema } from '../models/User'

export const signup = async (req: Req, res: Res) => {
    try {
        const { username, email, password } = req.body
        const findUser = await User.findOne({ email })
        if (findUser)
            return res.status(400).json('this email is already registered')
        const userNew: UserSchema = new User({
            username,
            email,
            password,
        })
        const user = await userNew.save()
        res.header('auth-token', getToken(user._id)).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const signin = async (req: Req, res: Res) => {
    try {
        const { email, password } = req.body
        const findUser = await User.findOne({ email })
        if (!findUser) return res.status(400).json('email or password is wrong')
        const correctPassword: boolean = await findUser.comparePassword(password)
        if (!correctPassword) return res.status(400).json('invalid password')
        res
            .header('auth-token', getToken(findUser._id, { expiresIn: day }))
            .json(findUser)
    } catch (error) {
        res.status(500).json(error)
    }
}


