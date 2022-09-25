import {createHash} from 'node:crypto';

class User {
    name: string;
    email: string;
    gender: string;
    age: number;
    password: undefined | string;
    createdAt: Date;
    deletedAt: null | Date;

    constructor(
        name: string,
        email: string,
        gender: string,
        age: number,
        password: string,
    ) {
        this.name = name;
        this.email = email;
        this.gender = gender;
        this.age = age;
        this.password = User.hashPassword(password);
        this.createdAt = new Date();
        this.deletedAt = null;
    }

    static hashPassword(password: string | undefined) {
        if (password) {
            const hash = createHash('sha256')
            hash.update(password);
            return hash.digest('hex');
        }

        return undefined
    }
}

export default User;
