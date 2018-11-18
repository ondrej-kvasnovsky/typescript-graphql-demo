import {connectionPool} from '../db/ConnectionPool';
import Item from './Item';

const findAll = async () => {
  const connection = await connectionPool.getConnection();
  try {
    const repository = connection.getRepository(Item);
    const response = await repository.find();
    return response;
  } catch (e) {
    console.error(e);
  }
};

export {findAll};
