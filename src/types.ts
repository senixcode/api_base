export interface User {
    username: string,
    email: string,
    password: string
}

export interface Payload {
    _id: string,
    iat: number,
    exp: number,
}