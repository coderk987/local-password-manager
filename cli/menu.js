import prompt from "prompt";

async function showMenu(){
    console.log('1. View your Password');
    console.log('2. Add a Password');
    console.log('3. Check Old password');
    console.log('4. Reset Manager');
    console.log('5. EXIT')

    let question = {
        name: 'option',
        description: 'Choose an Option(1-4): ',
        required: true,
        pattern: /^[12345]$/,
        message: 'Please choose from 1-5'
    }

    let {option} = await prompt.get(question);

    if(option==1){
        viewPasswords();
    }else if(option==2){
        addPassword();
    }else if(option==3){
        checkOldPassword();
    }else if(option==4){
        resetDatabase();
    }else if(option==5){
        process.exit(0);
    }
}

export default showMenu;
