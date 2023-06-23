import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI as string;

export async function connectToDatabase(): Promise<MongoClient> {
  const client = await MongoClient.connect(uri);

  return client;
}
