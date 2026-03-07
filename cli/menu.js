import prompt from "prompt";
import searchSource from "./search.js";
import addPassword from "./addpassword.js";
import managePassword from "./manage.js";
import killSwitch from "./kill.js";
import chalk from "chalk";

async function showMenu(){
    console.log(chalk.bold('-----------[MENU]-----------'));
    console.log('1. Search your Sources');
    console.log('2. Add a Password');
    console.log('3. Manage your Password');
    console.log('4. KILL SWITCH');
    console.log('5. EXIT')

    let question = {
        name: 'option',
        description: 'Choose an Option(1-5): ',
        required: true,
        pattern: /^[12345]$/,
        message: chalk.red('Please choose from 1-5')
    }

    let {option} = await prompt.get(question);

    if(option==1){
        searchSource();
    }else if(option==2){
        addPassword();
    }else if(option==3){
        managePassword();
    }else if(option==4){
        killSwitch();
    }else if(option==5){
        process.exit(0);
    }
}

export default showMenu;
