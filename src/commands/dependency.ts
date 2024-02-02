import { copyFile, rename, unlink } from "fs";
import { basename } from "path";

// kettle dependency [add]/[remove] path
const actionMap: { [key: string]: (depPath: string) => boolean } = {
    "add": addDependency,
    "remove": removeDependecy
}

const dependency = (args: string[]) => {

    console.log("Dependency command was ran");

    if(args.length === 0){
        console.log("Print dependency help here");
        process.exit(1);
    }

    const action = args[0];

    if(actionMap[action] === undefined){
        console.log(`Command: ${action} not found`);
        process.exit(1);
    }

    if(args[1] === undefined){
        console.log("Must provide dependency as argument");
        process.exit(1);
    }

    if(process.platform === "win32"){
        console.log("Kettle does not support automatic dependency management on Windows");
        console.log("Move the dependencies to the 'lib' directory manually");
        process.exit(0);
    }

    if(actionMap[action](args[1])){
        console.log("Dependency sucessfully added!");
    }

}


function addDependency(depPath: string): boolean {
    const fileName = basename(depPath);

    copyFile(depPath, `./lib/${fileName}`, (err: any) => {
        if(err){
            console.error(`Error: could not add new dependency at ${depPath}`)
            return false;
        }
    });

    return true;
}


function removeDependecy(depName: string): boolean {
    const depPath = `./lib/${depName}`;

    unlink(depPath, (err: any) => {
        if(err){
            console.error(`Error: could not remove dependency ${depName}`);
            return false;
        }
    })

    return true;
}

export default dependency;