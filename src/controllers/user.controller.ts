import { Request as Req, Response as Res } from 'express'
import User from '../models/User'

export const profile = async (req: Req, res: Res) => {
    try {
        const { userId } = req
        const user = await User.findById(userId)
        if (!user) return res.status(404).json('No User found')
        res.json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}