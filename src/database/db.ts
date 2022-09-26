import {MongoClient} from 'mongodb';

const client = new MongoClient(process.env.MONGO_CONNECTION_STRING || '').db('core');

function setUpDb() {
    client.createCollection('users')
    client.createCollection('files')
}

export {
    client,
    setUpDb
}
