import parseCommand from "./parser";
import Command from "./types/Command";
import Action from "./types/Action";

import run from "./commands/run";
import build from "./commands/build";
import docs from "./commands/docs";
import dependency from "./commands/dependency";
import init from "./commands/init";


//map each key in a void function
const commandMap: { [key in Action ] : (args: string[]) => void } = {
    [Action.Run]: run,
    [Action.Build]: build,
    [Action.Docs]: docs,
    [Action.Dependency]: dependency,
    [Action.Init]: init,
}

const handleCommand = (cmd: Command) =>  {
    const {action, params } = cmd;
    commandMap[action](params);
}

const kettle = () => {
    const cliArgs: string[] = process.argv.slice(2);

    const cmd: Command = parseCommand(cliArgs);

    handleCommand(cmd);


}

kettle();