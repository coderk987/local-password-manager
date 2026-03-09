import prompt from "prompt";
import searchSource from "./search.js";
import addPassword from "./addpassword.js";
import managePassword from "./manage.js";
import killSwitch from "./kill.js";
import chalk from "chalk";
import breachCheck from "../utils/breachcheck.js";

async function showMenu(){
    console.log(chalk.bold('-----------[MENU]-----------'));
    console.log('1. Search your Sources');
    console.log('2. Add a Password');
    console.log('3. Manage your Password');
    console.log('4. KILL SWITCH');
    console.log('5. Breach Check')
    console.log('6. EXIT')

    let question = {
        name: 'option',
        description: 'Choose an Option(1-6): ',
        required: true,
        pattern: /^[123456]$/,
        message: chalk.red('Please choose from 1-6')
    }

    let {option} = await prompt.get(question);

    if(option==1){
        await searchSource();
    }else if(option==2){
        await addPassword();
    }else if(option==3){
        await managePassword();
    }else if(option==4){
        killSwitch();
    }else if(option==5){
        await breachCheck();
    }else if(option==6){
        process.exit(0);
    }
}

export default showMenu;
