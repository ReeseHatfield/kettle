import parseCommand from "./parser";
import Command from "./types/Command";

const kettle = () => {
    const cliArgs: string[] = process.argv.slice(2);

    const cmd: Command = parseCommand(cliArgs);

    console.log(`Action: ${cmd.action}, Params: ${cmd.params}`);


}

kettle();