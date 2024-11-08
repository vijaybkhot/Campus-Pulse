import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017'; // MongoDB connection URL
const dbName = 'eventsDB'; // Database name

let db;

const connectToDB = async () => {
  if (db) return db;
  const client = new MongoClient(url);
  await client.connect();
  db = client.db(dbName);
  return db;
};

export const getEventCollection = async () => {
  const database = await connectToDB();
  return database.collection('events');
};
