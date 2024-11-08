import { getDb } from '../config/db';

const getEventCollection = () => {
  const db = getDb();
  return db.collection('events');
};

export default { getEventCollection };
