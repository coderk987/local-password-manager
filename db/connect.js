import { MongoClient } from "mongodb";

const dbUrl = "mongodb://localhost:27017";
const client = new MongoClient(dbUrl);
const dbName = "passwordManager";

let db;

async function mongoConnect(){
    try{
        client.connect();
        db = client.db(dbName);
    }catch(err){
        console.log("Error connecting to the database");
        process.exit(1);
    }
}

await mongoConnect();
export default db;