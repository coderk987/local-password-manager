import db from "../db/connect.js";
import prompt from "prompt";
import showMenu from "./menu.js";
import clipboard from 'clipboardy';
import chalk from "chalk";
import decryptPassword from '../utils/decrypt.js';
import breachCheck from "../utils/breachcheck.js";

async function managePassword() {
    console.log(chalk.bold('-----------[MANAGE]-----------'))
    console.log("1. Copy a Password");
    console.log("2. Delete a Password");

    let question = {
            name: 'option',
            description: 'Choose an Option(1-2): ',
            required: true,
            pattern: /^[12]$/,
            message: chalk.red('Please choose from 1-2')
        }
    
    let {option} = await prompt.get(question);
    let {source} = await prompt.get({name: "source", description: "Enter the source: "});
    const doc = await db.collection("passwords").findOne({ _id: source });
    let clipTimer;
    if(!doc){
        console.log("This Source doesnt Exist");
    }else if(option==1){
        if(clipTimer) clearTimeout(clipTimer);
        clipboard.writeSync(decryptPassword(doc.value, doc.iv));
        console.log(chalk.green("Copied Password to Clipboard"));
        console.log(chalk.gray("Password Will be cleared in 20 seconds"));

        clipTimer = setTimeout(() => {
            clipboard.writeSync("");
        }, 20000);
    }else if(option==2){
        await db.collection("passwords").deleteOne({ _id: source });
        console.log(chalk.green("Succesfully Deleted."));
    }

    showMenu();
}

export default managePassword;