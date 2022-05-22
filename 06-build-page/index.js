const fs = require('fs');
const path = require('path');
const fsProm = require('fs/promises');

const projectDistName = 'project-dist';
const projectDistPath = path.join(__dirname, projectDistName);



async function buildPage() {
  await fsProm.rm(projectDistPath, {force: true, recursive: true});
  await fsProm.mkdir(projectDistPath, {recursive: true});
}

buildPage();