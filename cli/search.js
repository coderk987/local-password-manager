import db from "../db/connect.js";
import prompt from "prompt";
import showMenu from "./menu.js";
import chalk from "chalk";

function printRes(res){
    if(res.length===0){
        console.log(chalk.red("NOTHING FOUND"));
        return;
    }
    console.log(chalk.bold('-----------[LIST]-----------'))
    let i=1;
    for(let doc of res){
        let tags = doc.tags.join(', ');
        console.log(`${i}. ${doc.__id}: ${tags}`);
        i++;
    }
}

async function searchSource() {
    console.log(chalk.bold('-----------[SEARCH]-----------'))
    console.log("1. View All Sources");
    console.log("2. Search by Source");
    console.log("3. Search by Tags");

    let question = {
            name: 'option',
            description: 'Choose an Option(1-3): ',
            required: true,
            pattern: /^[123]$/,
            message: chalk.red('Please choose from 1-3')
        }
    
    let {option} = await prompt.get(question);
    let result;
    if(option==1){
        result = await db.collection('passwords').find({}).toArray();
    }else if(option==2){
        let {search} = await prompt.get({name: "search", description: "Enter search term: "});
        result = await db.collection('passwords').find({__id: {$regex: search, $options: "i"}}).toArray();
    }else if(option==3){
        let {tag} = await prompt.get({name: "tag", description: "Enter Tag: "});
        result = await db.collection('passwords').find({tags: {$in: [tag]}}).toArray();
    }

    printRes(result);
    showMenu();
}

export default searchSource;