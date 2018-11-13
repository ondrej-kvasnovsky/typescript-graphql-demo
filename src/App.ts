import 'reflect-metadata';
import {createConnection} from 'typeorm';
import {typeOrmConfig} from './config';

import express from 'express';
import Item from './models/Item';

const bodyParser = require('body-parser');

// const {postgraphile} = require("postgraphile");
// const {postgraphile, createPostGraphileSchema} = require('postgraphile');

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.mountRoutes();
        // let dbUrl = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost/postgres";
        // this.app.use(postgraphile(dbUrl));
    }

    private mountRoutes(): void {
        const router = express.Router();
        router.get('/items', async (req, res) => {
            const connection = await createConnection(typeOrmConfig);
            console.log('PG connected.');
            try {
                const repository = connection.getRepository(Item);
                const response = await repository.find();
                res.json({content: response});
            } finally {
                await connection.close();
                console.log('PG connection closed.');
            }
        });
        router.post('/items', async (req, res) => {
            const connection = await createConnection(typeOrmConfig);
            console.log('PG connected.');
            try {
                const repository = connection.getRepository(Item);
                await repository.save({name: req.body.name});
                res.json({
                    res: 'Ok'
                });
            } catch (e) {
                console.log(e);
                res.json({
                    res: 'Failed'
                });
            } finally {
                await connection.close();
                console.log('PG connection closed.');
            }
        });
        this.app.use('/', router);
    }

    // async initGraphql() {
    //     https://www.graphile.org/postgraphile/usage-schema/
        // let dbUrl = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost/postgres";
        // const schema = await createPostGraphileSchema(dbUrl, 'public');
        // console.log(schema);
    // }
}

let app = new App();
// app.initGraphql();
export default app.app;
