const fs = require('fs');
const path = require('path');
const fsProm = require('fs/promises');

const projectDistName = 'project-dist';
const projectDistPath = path.join(__dirname, projectDistName);

const originalStylesPath = path.join(__dirname, 'styles');
const bundlePath = path.join(projectDistPath, 'styles.css');

async function mergeStyles() {
  const write = fs.createWriteStream(bundlePath, 'utf-8');
  const files = await fsProm.readdir(originalStylesPath, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const read = fs.createReadStream(path.join(originalStylesPath, file.name), 'utf-8');
      read.pipe(write);
    }
  }
}

async function buildPage() {
  await fsProm.rm(projectDistPath, {force: true, recursive: true});
  await fsProm.mkdir(projectDistPath, {recursive: true});
  await mergeStyles();
}

buildPage();