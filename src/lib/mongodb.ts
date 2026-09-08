import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('MONGODB_URI is missing from .env.local');
}

const mongoUri: string = uri;

const globalForMongo = globalThis as typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>;
};

export function getMongoClientPromise() {
  if (!globalForMongo.mongoClientPromise) {
    globalForMongo.mongoClientPromise = new MongoClient(mongoUri, {
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
    }).connect();
  }

  return globalForMongo.mongoClientPromise;
}
