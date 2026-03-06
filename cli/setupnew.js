import prompt from "prompt";
import { hashSync } from "bcrypt";
import db from "../db/connect.js";
import showMenu from "./menu.js";

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
    
    try{
        await db.collection("auth").insertOne({
            type: "auth",
            password: hashSync(res.password, 10)
        })
        showMenu();
    }catch(err){
        console.error(err);
    }
}

export default setNewPassword;