const fs = require('fs');
const { EOL } = require('os');
const path = require('path');
const { stdin, stdout } = process;
const readline = require('readline');

const executePath = __dirname;
const fileName = 'output.txt';
const outputFilePath = path.join(executePath, fileName);
const output = fs.createWriteStream(outputFilePath, 'utf-8');
const rl = readline.createInterface(stdin, stdout);

stdout.write('Hello, enter a text that you want save into file\n');

rl.on('line', (input) => {
  if (input.toString() === 'exit') {
    rl.close();
  }
  output.write(`${input}${EOL}`);
});

rl.on('SIGINT', () => {
  rl.close();
});

rl.on('close', () => {
  stdout.write(`Programm finishes. All results in file: ${fileName}${EOL}`);
  process.exit();
});
