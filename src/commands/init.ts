import { existsSync, mkdirSync, writeFile } from "fs";

const init = (args: string[]) => {
    let projectName = args[0];

    if(projectName === undefined){
        projectName = "KettleProject";
    }

    const dirName = "./" + projectName
    if(existsSync(dirName)){
        console.log(`Project with name: ${projectName} already exists in working directory`);
        return;
    }

    mkdirSync(dirName, { recursive: true });

    
}

export default init;