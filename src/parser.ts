import Command from "./types/Command";
import Action from "./types/Action";

const actionMap = {
    "run": Action.Run,
    "build": Action.Build,
    "docs": Action.Docs,
    "dependency": Action.Dependency,
    "init": Action.Init
};

const parseCommand = (cliArgs: string[]): Command => {

    const attempedAction = cliArgs[0];

    if(cliArgs.length == 0){
        console.error("Must take arguments, should print help soon");
        process.exit(1);
    }

    if((actionMap[attempedAction] === undefined)){
        console.error(`Error: command ${attempedAction} not found`);
        process.exit(1);
    }

    const action: Action = actionMap[attempedAction];


    const currentCommand: Command = {
        action: action,
        params: cliArgs.slice(1)
    };

    return currentCommand;
}

export default parseCommand;