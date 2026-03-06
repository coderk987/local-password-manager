import crypto from "crypto";
import db from "../db/connect.js";
import prompt from "prompt";

async function addPassword(){
    let {source} = await prompt.get({
            name: "source",
            description: "What is this password for",
            required: true,
            message: "Please enter a valid Source"
    });

    let {password} = await prompt.get({name: "password", description: "Enter your Password(type 'gen' for a random password): "});
    if(password=="gen"){
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        password = "";
        for (let i = 0; i < 16; i++) {
            const randomIndex = crypto.randomInt(0, chars.length);
            password += chars[randomIndex];
        }
    }

    let {tags} = await prompt.get({name: "tags", description: "Enter tags(comma seperated|optional)"});
    let tagsList = tags.replaceAll(' ', '').split(',');

    try{
        await db.collection("passwords").updateOne(
            {__id: source},
            { $set: {value: password, tags: tagsList}},
            { upsert: true }
        )
    }catch(err){
        console.error("Error Adding Password: ", err);
        process.exit(1);
    }

    showMenu();
}

export default addPassword;