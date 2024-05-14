const https = require('https');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Pick one: ".cs" ".hpp" ".js" ".toml" ".yaml" ".vb": ', (fileType) => {
  const extensions = {
    ".cs": "cs",
    ".hpp": "hpp",
    ".js": "js",
    ".toml": "toml",
    ".yaml": "yaml",
    ".vb": "vb"
  };

  const extension = fileType.trim();
  const fileName = `offsets${extensions[extension] ? `.${extensions[extension]}` : '.txt'}`;
  const url = `https://raw.githubusercontent.com/frk1/hazedumper/master/csgo${extensions[extension] ? `.${extensions[extension]}` : '.txt'}`;

  const file = fs.createWriteStream(fileName);

  try {
    https.get(url, (res) => {
      console.log('Success! There should be a', fileName, 'file in this directory.');
      res.pipe(file);
    });
  } catch (e) {
    console.log(e);
  }

  rl.close();
});
