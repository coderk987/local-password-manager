import db from "../db/connect.js";

async function killSwitch(){
    await db.collection('auth').deleteMany({});
    await db.collection('passwords').deleteMany({});
    console.log("Deleted Everything.");
    process.exit(0);
}

export default killSwitch;