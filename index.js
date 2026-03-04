import { hashSync, compare} from "bcrypt";
import prompt from "prompt"
import { MongoClient } from "mongodb";

const dbUrl = "mongodb://localhost:27017";
const client = new MongoClient(dbUrl);
let hasPasswords = false;
let passwordsCollection, authCollection;
let hashedPassword;
const dbName = "passwordManager";

prompt.start();

async function mongoConnect(){
    try{
        client.connect();
        const db = client.db(dbName);
        passwordsCollection = db.collection("passwords");
        authCollection = db.collection("auth");
        hashedPassword = await authCollection.findOne({ type: "auth" });
        hasPasswords = !!hashedPassword;
    }catch(err){
        console.log("Error connecting to the database");
        process.exit(1);
    }
}

await mongoConnect();

async function checkOldPassword(){
    let question = {
        name: "password",
        description: "Enter your password",
        required: true,
        hidden: true,
        replace: "*",
        message: "Please enter a valid password"
    }

    let res = await prompt.get(question);

    let valid = await compare(res.password, hashedPassword.password)
    if(valid){
        showMenu();
    }else{
        console.log("INVALID PASSWORD");
        process.exit(1);
    }
}

async function setNewPassword(){
    let question = {
        name: "password",
        description: "Set a new password",
        required: true,
        hidden: true,
        replace: "*",
        message: "Please enter a valid password"
    }
    let res = await prompt.get(question);

    await authCollection.insertOne({
        type: "auth",
        password: hashSync(res.password, 10)
    })

    hashedPassword = await authCollection.findOne({ type: "auth" });

    //Menu prompt
    showMenu();
}

async function showMenu(){
    console.log('1. View your Password');
    console.log('2. Add a Password');
    console.log('3. Check Old password');
    console.log('4. Reset Manager');
    console.log('5. EXIT')

    let question = {
        name: 'option',
        description: 'Choose an Option(1-4): ',
        required: true,
        pattern: /^[12345]$/,
        message: 'Please choose from 1-5'
    }

    let {option} = await prompt.get(question);

    if(option==1){
        viewPasswords();
    }else if(option==2){
        addPassword();
    }else if(option==3){
        checkOldPassword();
    }else if(option==4){
        resetDatabase();
    }else if(option==5){
        process.exit(0);
    }
}

async function viewPasswords(){
    let res = await passwordsCollection.find({}).toArray();
    console.log("-------------------");
    res.forEach((e, index) => {
        console.log(`${index+1}. ${e.__id}: ${e.value}`)
    });
    console.log("-------------------");
    showMenu();
}

async function addPassword(){
    let question = [
        {
            name: "source",
            description: "What is this password for",
            required: true,
            message: "Please enter a valid Source"
        },
        {
            name: "password",
            description: "Enter your password",
            required: true,
            hidden: true,
            replace: "*",
            message: "Please enter a valid password"
        }
    ]


    let res = await prompt.get(question);

    try{
        await passwordsCollection.updateOne(
            {__id: res.source},
            { $set: {value: res.password}},
            { upsert: true }
        )
    }catch(err){
        console.error("Error Adding Password: ", err);
        process.exit(1);
    }

    showMenu();
}

async function resetDatabase(){
    await authCollection.deleteMany({});
    await passwordsCollection.deleteMany({});
    console.log("Succesfully Reset Manager");
    process.exit(0);
}

function startApp(){
    if(!hasPasswords){
        setNewPassword();
    }else{
        checkOldPassword();
    }
}

startApp();