const rl = require("readline");
const fs = require("fs");
const path = require("path");
const colors = require("colors");
const HIVE_UI_APP_PATH = process.env.HIVE_UI_APP_PATH || process.cwd();

class Postinstall {
  constructor() {
    this.makeDirectory = this._makeDirectory.bind(this);
    this.writeFile = this._writeFile.bind(this);
  }

  question(question) {
    const r = rl.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true
    });

    return new Promise((resolve, error) => {
      r.question(question.green, answer => {
        r.close();
        resolve(answer);
      });
    });
  }

  onError(e) {
    e ? console.warn(`☠️: ${e.message.yellow}`) : console.log("🐝 DONE!");
  }

  _makeDirectory(dir) {
    return new Promise((resolve, reject) => {
      const appPath = path.resolve(HIVE_UI_APP_PATH, dir);
      console.log(`Creating directory: ${appPath}`);

      fs.mkdir(appPath, e => {
        this.onError(e);
        e && e.code !== "EEXIST" ? reject(e) : resolve(appPath);
      });
    });
  }

  _writeFile(dir, data) {
    return new Promise((resolve, reject) => {
      const appPath = path.resolve(HIVE_UI_APP_PATH, dir);
      console.log(`Creating file: ${appPath}`);

      fs.writeFile(appPath, data, e => {
        this.onError(e);
        e ? reject(e) : resolve(appPath);
      });
    });
  }
}

const install = new Postinstall();

//ask for public directory name

install.question("public web directory: (public) ").then(answer => {
  const publicDirectory = answer || "public";

  install
    .makeDirectory(publicDirectory)
    .then(dir => {
      let indexHTMLPath = path.join(publicDirectory, "index.html");
      return install
        .question(`entry point: (${indexHTMLPath}) `)
        .then(answer => {
          indexHTMLPath = answer
            ? path.join(publicDirectory, answer)
            : indexHTMLPath;
          return install
            .writeFile(
              indexHTMLPath,
              `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    {__header__}
    {__styles__}
    {__scripts__}
  </head>
  <body>
    <div id="app">{content}</app>
  </body>
</html>`
            )
            .then(dir => {
              console.log("yay".cyan);
            });
        });
    })
    .catch(e => {
      console.error(`☠️ FAIL!!! ${e.message}`.red);
    });
});
