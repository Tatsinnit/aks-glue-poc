let { app, BrowserWindow, ipcMain } = require("electron")
// let { exec } = require('node:child_process');
// const exec = require('child_process').exec;
const util = require('util');
const exec = util.promisify(require('child_process').exec);

ipcMain.handle("console", (event, line) => {
  console.log(`Received from frontend: ${line}`)
  return `Backend confirms it received: ${line}`
})

ipcMain.handle("runcommand", async (event, line) => {
  let output = await commandWrapper(line);
  return `${output}`
})

function createWindow() {
  let win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })
  win.loadFile("./index.html")
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
  app.quit()
})

async function commandWrapper(cmd) {
  console.log("------ " + cmd)

  // run the command using exec
  const { stdout, stderr } = await exec(cmd);
  
  // exec(cmd, (err, output) => {
  //     // once the command has completed, the callback function is called
  //     if (err) {
  //         // log and return if we encounter an error
  //         console.error("could not execute command: ", err);
  //         return;
  //     }
  //     // log the output received from the command
  //     console.log("Output: \n", output);

  //     return output;
  // });
  
  console.log(" ======= " + stdout);
  console.log(" ======= " + stderr);

   return stdout;
}
