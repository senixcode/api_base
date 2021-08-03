import { agent as supertest, SuperAgentTest } from 'supertest'
import mongoose from 'mongoose'
import { User as UserType } from '../types'
import User from '../models/User'
import app from '../app'
import { RouteAuth, RouteUser } from '../emuns'


const api = supertest(app)
const users: UserType[] = [
    {
        "username": "test1",
        "email": "test1@gmail.com",
        "password": "password"
    },
    {
        "username": "test2",
        "email": "test2@gmail.com",
        "password": "password",
    }
]

beforeEach(async () => {
    await User.deleteMany({})
    const user1 = new User(users[0])
    await user1.save()

    const user2 = new User(users[1])
    await user2.save()
})
const BASE_URL_AUTH = '/api/auth'
const BASE_URL_USER = '/api/user'
describe('Auth', () => {
    const getAuthentication = async (email: string, password: string) => {
        return await api
            .post(`${BASE_URL_AUTH}${RouteAuth.signin}`)
            .send({ email, password })
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }

    it('Register User', async () => {
        const user: UserType = {
            "username": "test3",
            "email": "test3@gmail.com",
            "password": "password"
        }

        const register = await api
            .post(`${BASE_URL_AUTH}${RouteAuth.signup}`)
            .send(user)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(register.body.email).toEqual(user.email)
    })
    it('Register User / isEmailRegister', async () => {
        const user = users[0]
        const register = await api
            .post(`${BASE_URL_AUTH}${RouteAuth.signup}`)
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(register.body).toBe('this email is already registered')
    })

    it('Authentication User', async () => {
        const { email, password } = users[0]

        const authentication = await getAuthentication(email, password)
        expect(authentication.body.email).toEqual(email)
    })

    it('Authentication User / isUnathenticateEmail', async () => {
        const { password } = users[0]
        const register = await api
            .post(`${BASE_URL_AUTH}${RouteAuth.signin}`)
            .send({ email: 'unathenticatedEmail@gmail.com', password })
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(register.body).toBe('email or password is wrong')
    })
    it('Authentication User / isUnathenticatePassword', async () => {
        const { email } = users[0]
        const register = await api
            .post(`${BASE_URL_AUTH}${RouteAuth.signin}`)
            .send({ email, password: "unathenticatedPassword" })
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(register.body).toBe('invalid password')
    })

    it('Profile User', async () => {
        const { email, password } = users[0]

        const authentication = await getAuthentication(email, password)
        expect(authentication.body.email).toEqual(email)

        const getpProfile = await api
            .get(`${BASE_URL_USER}${RouteUser.profile}`)
            .set('auth-token', authentication.headers["auth-token"])
            .expect(200)

        expect(getpProfile.body.email).toEqual(email)
    })
})

afterAll(() => {
    mongoose.connection.close()
})