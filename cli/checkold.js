import prompt from "prompt";
import {compareSync} from "bcrypt";
import showMenu from "./menu.js";

async function checkOldPassword(hasPassword){
    let question = {
        name: "password",
        description: "Enter your password",
        required: true,
        hidden: true,
        replace: "*",
        message: "Please enter a valid password"
    }

    let res = await prompt.get(question);

    let valid = compareSync(res.password, hasPassword.password)
    if(valid){
        showMenu();
    }else{
        console.log("INVALID PASSWORD");
        checkOldPassword(hasPassword);
    }
}

export default checkOldPassword;
