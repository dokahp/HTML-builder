const fs = require('fs');
const path = require('path');

const executePath = __dirname;
const fileName = 'text.txt';
const txtFilePath = path.join(executePath, fileName);
const readableStream = fs.createReadStream(txtFilePath, 'utf-8');

readableStream.on('data', (chunk) => {
  console.log(chunk);
});

readableStream.on('error', (error) => {
  if (error.code == 'ENOENT') {
    console.log(
      `There are no file with name ${fileName} in the directory.\nPlease check the directory`
    );
  } else {
    console.log('Error', error.message);
  }
});
