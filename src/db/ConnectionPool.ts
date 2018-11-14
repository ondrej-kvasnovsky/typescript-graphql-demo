import {Connection, createConnection} from 'typeorm';
import {typeOrmConfig} from '../models/config';

class ConnectionPool {
    private static instance: Connection;

    async getConnection(): Promise<Connection> {
        if (!ConnectionPool.instance) {
            console.log("Creating instance...");
            ConnectionPool.instance = await createConnection(typeOrmConfig);
        }
        return ConnectionPool.instance;
    }
}

const connectionPool = new ConnectionPool();
export {connectionPool};
