import { spawn } from 'child_process';
import glob from 'glob';

const run = () => {

    // use glob to stich all the files together, cannot handle * without it
    const javaFiles = glob.sync('./src/*.java');

    const compileJava = spawn('javac', ['-d', 'out', ...javaFiles]);

    compileJava.stderr.on('data', (data) => {
        console.error(`Error from javac: ${data}`);
        return;
    });

    compileJava.on('exit', (code) => {
        if (code !== 0) {
            console.error(`javac process exited with code ${code}`);
            return;
        }

        const runJava = spawn('java', ['-cp', 'out:lib/*', 'Driver']);

        runJava.stdout.pipe(process.stdout);
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

export default run;