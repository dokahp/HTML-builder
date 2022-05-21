const fs = require('fs/promises');
const path = require('path');

const newFolderName = 'files-copy';
const newFolderPath = path.join(__dirname, newFolderName);
const masterFolderName = 'files';
const masterFolderPath = path.join(__dirname, masterFolderName);


async function copyDir() {
  await fs.rm(newFolderPath, {recursive: true, force: true});
  await fs.mkdir(newFolderPath);
  const files = await fs.readdir(masterFolderPath);
  for (const file of files) {
    await fs.copyFile(path.join(masterFolderPath, file), path.join(newFolderPath, file));
  }
}

copyDir();

