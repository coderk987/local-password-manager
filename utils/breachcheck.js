import crypto from "crypto";
import db from "../db/connect.js"
import decryptPassword from "./decrypt.js";
import chalk from "chalk";
import showMenu from "../cli/menu.js";

async function breachCheck(){
    let passwords = await db.collection("passwords").find({}).toArray();
    for(let pass of passwords){
        let decryptedPass = decryptPassword(pass.value, pass.iv);
        let sha1Pass = crypto.createHash("sha1").update(decryptedPass).digest("hex").toUpperCase();
        let prefix = sha1Pass.slice(0,5);
        let suffix = sha1Pass.slice(5);

        let pwnedRes = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
        let pwnedText = await pwnedRes.text(); 
        let lines = pwnedText.split(/\r?\n/);

        for(let line of lines){
            let [match, count] = line.split(':');
            
            if(match==suffix){
                console.log(chalk.red(pass._id), `: found in ${count} Breaches`);
                break;
            }
        }
    }

    showMenu();
}

export default breachCheck;