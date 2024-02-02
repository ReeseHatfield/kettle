import { spawn } from 'child_process';
import { readFile, readFileSync } from 'fs';
import glob from 'glob';

const run = (args: string[]) => {

    const buildKettle: JSON = getBuildKettle();

    // use glob to stich all the files together, cannot handle * without it
    const javaFiles = glob.sync(`${buildKettle["srcPath"]}/*.java`);

    const compileJava = spawn('javac', ['-d', `${buildKettle["outPath"]}`, ...javaFiles]);

    compileJava.stderr.on('data', (data) => {
        console.error(`Error from javac: ${data}`);
        return;
    });

    compileJava.on('exit', (code) => {
        if (code !== 0) {
            console.error(`javac process exited with code ${code}`);
            return;
        }

        // Windows uses a different compile syntax than *nix
        const libChar = (process.platform === "win32") ? ";" : ":";

        const runJava = spawn('java', ['-cp', `${buildKettle["outPath"]}${libChar}${buildKettle["libPath"]}/*`, 'Driver', ...args]);

        runJava.stdout.pipe(process.stdout);
        runJava.stderr.pipe(process.stderr);
        process.stdin.pipe(runJava.stdin);

        runJava.on('exit', (code) => {
            if (code !== 0) {
                console.error(`java process exited with code ${code}`);
            }
        });
    
    });

    compileJava.on('error', (err) => {
        console.error('Error spawning javac:', err);
    });
};


function getBuildKettle(): JSON {

    let data: JSON;
    //" ./ " => relative to execution path
    try{
        data = JSON.parse(readFileSync('./build.kettle', { encoding: 'utf8', flag: 'r' }));
    }
    catch(err: any){
        console.error("Fatal error: could not read build.kettle");
        process.exit(1);
    }

    return data;
}

export default run;