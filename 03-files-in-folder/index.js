const fs = require('fs/promises');
const path = require('path');

const executePath = __dirname;
const secretFolderPath = path.join(executePath, 'secret-folder');

async function readDir() {
  try {
    const directory = await fs.readdir(secretFolderPath, {
      withFileTypes: true,
    });
    for (const file of directory) {
      if (file.isFile()) {
        const fileExtension = path.extname(file.name);
        const fileName = file.name.replace(fileExtension, '');
        const stats = await fs.stat(path.join(secretFolderPath, file.name));
        const fileSizeInBytes = stats.size;
        const fileSizeInKb = fileSizeInBytes / 1000;
        console.log(
          `${fileName} - ${fileExtension.slice(1)} - ${fileSizeInKb}kb`
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
}

readDir();
