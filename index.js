const fs = require("fs");
const path = require("path");

const filesArray = [];

function sortFiles(dir, isRecursed = false) {
  let files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fileName = `${dir}/${file}`;
    if (!fs.statSync(fileName).isDirectory()) {
      filesArray.push({
        file: `${dir}/${file}........`,
        size: fs.statSync(fileName).size,
      });
    } else {
      files = fs.readdirSync(fileName);
      sortFiles(fileName, true);
    }
  });
  if (!isRecursed) {
    filesArray
      .sort((a, b) => b.size - a.size)
      .forEach((file, i) => {
        let memory = file.size;
        if (memory > 1024) {
          memory = `${Math.round(file.size / 1024)}kb\n`;
        } else if (memory > 1000000) {
          memory = `${Math.round(file.size) / 1000000}mb\n`;
        } else {
          memory = `${file.size}bytes\n`;
        }
        filesArray[i] = file.file + memory;
      });
  }
  return fs.writeFileSync("sorted_files.txt", filesArray.join(""));
}

sortFiles(process.argv[2]);
