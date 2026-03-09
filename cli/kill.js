import db from "../db/connect.js";
import prompt from "prompt";
import chalk from "chalk";
import showMenu from "./menu.js";

async function killSwitch(){
    let {ask} = await prompt.get({name: 'ask', description: "Are you Sure? (Y/N)", pattern: /^[YN]$/}) 
    if(ask=='Y'){
        await db.collection('auth').deleteMany({});
        await db.collection('passwords').deleteMany({});
        console.log(chalk.red("Deleted Everything."));
        process.exit(0);
    }else{
        showMenu();
    }
}

export default killSwitch;