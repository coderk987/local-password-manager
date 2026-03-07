import prompt from "prompt";
import {compareSync} from "bcrypt";
import showMenu from "./menu.js";
import chalk from 'chalk'

function deriveKey(password, salt, size) {
  return crypto.scryptSync(password, salt, size);
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
        session.key = deriveKey(res.password, 12, 32);
        session.iv = deriveKey(res.password.split('').reverse().join(''), 12, 12);
        showMenu();
    }else{
        console.log("INVALID PASSWORD");
        checkOldPassword(hasPassword);
    }
}

export default checkOldPassword;
