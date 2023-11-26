import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config()

const uri = `mongodb+srv://${process.env.URI_UNAME}:${process.env.URI_PASSWD}@${process.env.URI_DBLINK}/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToDatabase();

export { client };