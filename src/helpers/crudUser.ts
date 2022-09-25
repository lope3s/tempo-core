import {User} from '../entities';
import {client} from '../database/db';
import {ObjectId} from 'mongodb';

const userColl = client.collection('users');

async function createUser(userObj: User) {
    return userColl.insertOne(userObj)
}

async function getUser(filterObj: {[key: string]: any}) {
    return userColl.findOne({
        ...filterObj,
        deletedAt: null
    })
}

async function updateUser(userId: string, updatingObj: {[key: string]: any}) {
    const user = await getUser({_id: new ObjectId(userId)})
    if (user) {
        const validFields: {[key: string]: any} = {}

        if (updatingObj.password) {
            updatingObj.password = User.hashPassword(updatingObj.password)
        }
        Object.entries(updatingObj)
        .filter(([key, value]) => user[key] !== undefined)
        .forEach(([key, value]) => validFields[key] = value)
        const updatedUserObj = {...user, ...validFields}
        return userColl.updateOne(
            {_id: new ObjectId(userId)},
            {$set: updatedUserObj}
        )
    }
}

async function deleteUser(userId: string) {
    return userColl.updateOne(
        {_id: new ObjectId(userId)},
        {$set: {
            deletedAt: new Date()
        }}
    )
}

export {
    createUser,
    getUser,
    deleteUser,
    updateUser
}
