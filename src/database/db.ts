import {MongoClient} from 'mongodb';

const client = new MongoClient(process.env.MONGO_CONNECTION_STRING || '').db('core');

function setUpDb() {
    client.collection('users')
    client.collection('files')
}

export {
    client,
    setUpDb
}
