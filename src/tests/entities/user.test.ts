import User from '../../entities/user';
import {createHash} from 'node:crypto';

describe('Testing User class', () => {
    const testUser = new User(
        'name',
        'email',
        'gender',
        0,
        ''
    )

    it('Should return the right props with the right data', () => {
        const expectedProperties = [
            "name",
            "email",
            "gender",
            "age",
            "password",
            "createdAt",
            "deletedAt",
        ]

        const receivedProperties = Object.keys(testUser);

        expect(expectedProperties).toStrictEqual(receivedProperties)
    })

    it('Should hash password properly', () => {
        const password = 'batataDoce'
        const hash = createHash('sha256')
        hash.update(password);
        const hashedPassword = hash.digest('hex');

        expect(hashedPassword).toBe(User.hashPassword(password))
    })

    it('Should return undefined if no password is provided', () => {
        expect(undefined).toBe(User.hashPassword(''))
    })
})