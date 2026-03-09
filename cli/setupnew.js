import prompt from "prompt";
import { hashSync } from "bcrypt";
import db from "../db/connect.js";
import showMenu from "./menu.js";
import strengthTest from "../utils/strength.js";
import chalk from "chalk";
import session from "../utils/session.js";
import crypto from "crypto";

function deriveKey(password, salt, size) {
    return crypto.scryptSync(password, salt, size);
}

async function setNewPassword(){
    let question = {
        name: "password",
        description: "Set a new password",
        required: true,
        hidden: true,
        replace: "*",
        message: chalk.red("Please enter a valid password")
    }

    let strength = false;
    let res;
    while(!strength){
        res = await prompt.get(question);
        strength = strengthTest(res.password);
    }
    
    try{
        const salt = crypto.randomBytes(16);
        session.key = deriveKey(res.password, salt, 32);
        await db.collection("auth").insertOne({
            type: "auth",
            password: hashSync(res.password, 10),
            salt: salt
        })
        showMenu();
    }catch(err){
        console.error(err);
    }
}

export default setNewPassword;