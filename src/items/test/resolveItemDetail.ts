import {connectionPool} from '../../db/ConnectionPool';
import Item from '../../models/Item';

let resolveItemDetail = async () => {
    const connection = await connectionPool.getConnection();
    try {
        const repository = connection.getRepository(Item);
        const response = await repository.find();
        return response;
    } catch (e) {
        console.log(e);
    }
};

export {resolveItemDetail};
