import db from "../db/connect.js";
import prompt from "prompt";
import showMenu from "./menu.js";
import clipboard from 'clipboardy';

async function managePassword() {
    console.log("1. Copy a Password");
    console.log("2. Delete a Password");

    let question = {
            name: 'option',
            description: 'Choose an Option(1-2): ',
            required: true,
            pattern: /^[123]$/,
            message: 'Please choose from 1-2'
        }
    
    let {option} = await prompt.get(question);
    let result;
    let {source} = await prompt.get({name: "source", description: "Enter the source: "});
    const doc = await db.collection("passwords").findOne({ _id: source });
    if(!doc){
        console.log("This Source doesnt Exist");
        managePassword();
    }

    if(option==1){
        clipboard.writeSync(doc.value);
        console.log("Copied Password to Clipboard");
    }else if(option==2){
        await db.collection("passwords").deleteOne({ _id: source });
    }

    printRes(result);
    showMenu();
}