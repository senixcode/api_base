import { Request as Req, Response as Res } from 'express'
export const signup = (req: Req, res: Res) => {
    res.send('signup')
}
export const signin = (req: Req, res: Res) => {
    res.send('signin')
}
export const profile = (req: Req, res: Res) => {
    res.send('profile')
}