import inquirer from "inquirer";
import chalk from "chalk";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import chuckNorris from "chuck-norris-api";
import { createSpinner } from "nanospinner";
import fs from "fs";
import config from "./config.json" assert {type: "json"};

let userName = config.user_name;

export {
    moveFilesPrompt,
    prompt,
    welcome,
    listOptions,
    handleAnswer,
    sleep
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    console.clear();
    const msg = `Herzlich wikommen, ${userName}`;

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });

    await sleep(2000);
    
}

async function prompt(message, def) {
    const answers = await inquirer.prompt({
        name: "option",
        type: "input",
        message: message,
        default() {
            return def;
        },
    });
    return answers.option;
}

async function listUserOptions(choices) {
    const options = await inquirer.prompt({
        name: "userPrompt",
        type: "list",
        message: "Please choose an option",
        choices: [
            "get",
            "set"
        ],
    });
    return handleAnswer(options.option);
}


async function listOptions() {
    const options = await inquirer.prompt({
        name: "first",
        type: "list",
        message: "Please choose an option",
        choices: [
            "move files",
            "user",
            "exit"
        ],
    });
    return handleAnswer(options.first);
}

async function handleAnswer(option) {

    const spinner = createSpinner(`Loading ${option}...`).start();
    await sleep(2000);
    spinner.success({text: `success`});

    switch(option.toLowerCase()) {
            case "move files":
                moveFilesPrompt();
                break;
            case "user":
                listUserOptions();
                break;
            case "exit":
                console.log(chalk.redBright("Preparing stuff for exit..."));
                await sleep(1000)

                const msg = `Bis zum Nächsten Mal, ${userName}`;

                figlet(msg, (err, data) => {
                    console.log(gradient.pastel.multiline(data));
                });

                await sleep(2000);
                process.exit(0);
    }

    
    
    if(option == "userPrompt") {
        switch(option.toLowerCase()) {
            case "get":
                console.log("get");
                break;
            case "set":
                console.log("set");
                break;
        }
    }
}

async function handleUserInput(option) {
    switch(option.toLowerCase()) {
        case "get":

        break;
        case "set":
            break;
    }
}


async function moveFilesPrompt() {
    const file = await prompt("Please specify a file", "file to move");
    const dest = await prompt("Please specify a file", "destination");

    const spinner = createSpinner(`Moving ${file} to ${dest}...`).start();
    await sleep(2000);

    fs.rename(file, dest, (err) => {
        if(err) spinner.error({text: err.message});
        else spinner.success(`Moved ${file} to ${dest} successfully!`);
    });
    await sleep(2000);

    console.clear();
    await listOptions();
}