import {Connection, createConnection} from 'typeorm';
import {typeOrmConfig} from '../models/config';

class ConnectionPool {
    // TODO: fix creation of new connection pool every time
    async getConnection(): Promise<Connection> {
        return createConnection(typeOrmConfig);
    }
}

const connectionPool = new ConnectionPool();
export {connectionPool};