import { Request as Req, Response as Res } from 'express'
import { day, getToken } from '../help/jwt'
import User, { UserSchema } from '../models/User'

export const signup = async (req: Req, res: Res) => {
    const { username, email, password } = req.body
    const userNew: UserSchema = new User({
        username,
        email,
        password,
    })
    const user = await userNew.save()
    res.header('auth-token', getToken(user._id)).json(user)
}

export const signin = async (req: Req, res: Res) => {
    const findUser = await User.findOne({ email: req.body.email })
    if (!findUser) return res.status(400).json("email or password is wrong")
    const correctPassword: boolean = await findUser.comparePassword(req.body.password)
    if (!correctPassword) return res.status(400).json('invalid password')
    res.header('auth-token', getToken(findUser._id, { expiresIn: day })).json(findUser)
}

export const profile = async (req: Req, res: Res) => {
    const { userId } = req
    const user = await User.findById(userId)
    if (!user) return res.status(404).json('No User found')
    res.json(user)
}
