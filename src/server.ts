import express from 'express';
import cors from 'cors';
import {config} from 'dotenv';

config()

import {setUpDb} from './database/db';
import routes from './routes';
import morgan from 'morgan';

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan('combined'));

app.use(routes);

app.listen(process.env.APP_PORT, async () => {
    await setUpDb()
    console.log(`running on ${process.env.APP_URL}`)
})
