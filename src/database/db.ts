import {MongoClient} from 'mongodb';

const client = new MongoClient(process.env.MONGO_CONNECTION_STRING || '').db('core');

async function setUpDb() {
    const collections = await client.collections()
    if (!collections.length) {
        client.createCollection('users')
        client.createCollection('files')
    }
}

export {
    client,
    setUpDb
}
