import bcrypt from 'bcryptjs'
export const encryptPassword = async (pass: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(pass, salt)
}