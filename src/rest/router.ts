import express from 'express';
import {Connection, createConnection} from 'typeorm';
import {typeOrmConfig} from '../models/config';
import Item from '../models/Item';

let connection: Connection;
createConnection(typeOrmConfig).then(conn => connection = conn);

const createRouter = () => {
    const router = express.Router();
    router.get('/items', async (req, res) => {
        const repository = connection.getRepository(Item);
        const response = await repository.find();
        res.json({data: response});
    });

    router.post('/items', async (req, res) => {
        const repository = connection.getRepository(Item);
        await repository.save({name: req.body.name});
        res.json({
            data: 'Ok',
        });
    });
    return router;
};

const router = createRouter();
export {router};
