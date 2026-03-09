import prompt from "prompt";
import {compareSync} from "bcrypt";
import showMenu from "./menu.js";
import chalk from 'chalk'
import session from "../utils/session.js";
import crypto from "crypto";

function deriveKey(password, salt, size) {
    return crypto.scryptSync(password, Buffer.from(salt, "hex"), size);
}

async function checkOldPassword(hasPassword){
    let question = {
        name: "password",
        description: "Enter your password",
        required: true,
        hidden: true,
        replace: "*",
        message: chalk.red("Please enter a valid password")
    }

    let res = await prompt.get(question);

    let valid = compareSync(res.password, hasPassword.password)
    if(valid){
        session.key = deriveKey(res.password, hasPassword.salt, 32);
        showMenu();
    }else{
        console.log("INVALID PASSWORD");
        checkOldPassword(hasPassword);
    }
}

export default checkOldPassword;
