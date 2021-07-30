import { Request as Req, Response as Res } from 'express'
import User, { UserSchema } from '../models/User'
import jwt from 'jsonwebtoken'

const getToken = (id: any): string => {
    const TOKEN_SECRET = process.env.TOKEN_SECRET || 'tokenTest'
    const token: string = jwt.sign({ _id: id }, TOKEN_SECRET)
    return token
}

export const signup = async (req: Req, res: Res) => {
    const { username, email, password } = req.body
    const userNew: UserSchema = new User({
        username,
        email,
        password,
    })
    userNew.password = await userNew.encryptPassword(userNew.password)
    const user = await userNew.save()
    res.header('auth-token', getToken(user._id)).json(user)
}

export const signin = async (req: Req, res: Res) => {
    const findUser = await User.findOne({ email: req.body.email })
    if (!findUser) return res.status(400).json("email or password is wrong")
    const correctPassword: boolean = await findUser.validatePassword(req.body.password)
    if (!correctPassword) return res.status(400).json('invalid password')
    res.header('auth-token', getToken(findUser._id)).json(findUser)
}

export const profile = (req: Req, res: Res) => {
    res.send('profile')
}
