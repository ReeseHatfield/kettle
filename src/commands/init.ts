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

    const directories = ["lib", "src", "docs", "out", "build", "assets"];

    directories.forEach((subDir) => {
        mkdirSync(dirName + "/" + subDir, {recursive: true});
    })

    const buildKettleContent = {
        "libPath": "./lib",
        "srcPath": "./src",
        "docsPath": "./docs",
        "outPath": "./out",
        "buildPath": "./build",
        "assetsPath": "./assets",
        "entryPath": "./src/Driver.java"
    }


    writeFile(dirName + "/build.kettle", JSON.stringify(buildKettleContent, null, 2), err => {
        if(err){
            console.log("Something went wrong while creating build.kettle");
        }
    })

    const helloWorld = 

`
public class Driver {

    public static void main(String[] args) {
        System.out.println("Hello, World!"); 
    }
    
}
`

    writeFile(dirName + "/src/Driver.java", helloWorld, err => {
        if(err){
            console.log("Something went wrong creating the starting java file");
        }
    });

}

export default init;