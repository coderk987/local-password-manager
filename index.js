import db from './db/connect.js';
import checkOldPassword from './cli/checkold.js';
import setNewPassword from './cli/setupnew.js';

async function startApp(){
    const hasPassword = await db.collection("auth").findOne({type: "auth"});
    if(!!hasPassword){
        checkOldPassword(hasPassword);
    }else{
        setNewPassword();
    }
}

startApp();