import jwt from 'jsonwebtoken'

export const day: number = 60 * 60 * 24
export const TOKEN_SECRET: string = process.env.TOKEN_SECRET || 'tokenTest'

export const getToken = (id: any, options?: jwt.SignOptions | undefined): string => {
    const token: string = jwt.sign({ _id: id }, TOKEN_SECRET, options)
    return token
}

export const getPayload = (token: string): string | jwt.JwtPayload => jwt.verify(token, TOKEN_SECRET)