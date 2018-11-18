import {connectionPool} from '../db/ConnectionPool';
import Item from './Item';

const findOne = async (id: number) => {
  const connection = await connectionPool.getConnection();
  try {
    const repository = connection.getRepository(Item);
    const response = await repository.findOne(id);
    return response;
  } catch (e) {
    console.error(e);
  }
};

export {findOne};
