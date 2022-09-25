import {File} from '../entities';
import {client} from '../database/db';
import {ObjectId} from 'mongodb';

const filesColl = client.collection('files');

async function storeFile(file: File) {
    return filesColl.insertOne(file)
}

async function deleteFile(fileId: string) {
    return filesColl.updateOne(
        {_id: new ObjectId(fileId)},
        {$set: {deletedAt: new Date()}}
    )
}

export {
    storeFile,
    deleteFile
}