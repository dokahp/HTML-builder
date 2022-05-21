const fs = require('fs/promises');
const { createWriteStream, createReadStream } = require('fs');
const path = require('path');

const executePath = __dirname;
const bundlePath = path.join(executePath, 'project-dist', 'bundle.css');
const stylesPath = path.join(executePath, 'styles');

async function mergeStyles() {
  const write = createWriteStream(bundlePath, 'utf-8');
  const files = await fs.readdir(stylesPath, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const read = createReadStream(path.join(stylesPath, file.name), 'utf-8');
      read.pipe(write);
    }
  }
}

mergeStyles();
