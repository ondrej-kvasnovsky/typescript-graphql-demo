import Item from './Item';
import {connectionPool} from '../db/ConnectionPool';

let findAll = async () => {
    const connection = await connectionPool.getConnection();
    try {
        const repository = connection.getRepository(Item);
        const response = await repository.find();
        return response;
    } catch (e) {
        console.log(e);
    }
};

export {findAll};