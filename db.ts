import { MongoClient, Db, Collection } from "mongodb";

const MongoURI = process.env.MONGO_URI;
if (!MongoURI) {
    throw new Error("MongoDB URI doesn't exist");
}

const DB_NAME = "mp-5_db";
export const URL_COLLECTION = "mp-5_collection";

let client: MongoClient | null = null;
let db: Db | null = null;

async function connect(): Promise<Db> {
    if (!client) {
        client = new MongoClient(MongoURI);
        await client.connect();
    }
    return client.db(DB_NAME);
}

export default async function getCollection(
    collectionName: string,
): Promise<Collection> {
    if (!db) {
        db = await connect();
    }
    return db.collection(collectionName);
}