export interface User {
    username: string,
    email: string,
    password: string
}
export type UserOmitUsername = Omit<User, 'username'>
//export type Test = Pick<User, 'email' | 'password'>
export interface Payload {
    _id: string,
    iat: number,
    exp: number,
}