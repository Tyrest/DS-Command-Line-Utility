const { app, BrowserWindow } = require("electron");
const { ipcMain } = require("electron");
const path = require("path");
const os = require("os");
const pty = require("node-pty");

var shell = os.platform() === "win32" ? "cmd.exe" : "bash";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  ipcMain.handle("ping", () => "pong");

  win.loadFile("index.html");

  var ptyProcess = pty.spawn(shell, [], {
    name: "xterm-color",
    cols: 80,
    rows: 24,
    cwd: process.env.HOME,
    env: process.env,
  });

  ptyProcess.onData((data) => {
    win.webContents.send("terminal-incData", data);
  });

  ipcMain.on("terminal-into", (event, data) => {
    ptyProcess.write(data);
  });

  // console.log("Terminal PID: " + ptyProcess.pid);
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
