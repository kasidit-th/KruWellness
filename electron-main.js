const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const { fork } = require("child_process");

let mainWindow;
let serverProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    resizable: true,
    webPreferences: {
      devTools: true,
      webSecurity: !isDev,
      allowRunningInsecureContent: isDev,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.webContents.openDevTools();

  const serverPath = isDev
    ? path.join(__dirname, "server", "app.js")
    : path.join(process.resourcesPath, "app", "server", "app.js");

  console.log("Forking server from:", serverPath);

  if (!serverProcess) {
    serverProcess = fork(serverPath);
  }

  serverProcess.on("error", (err) => {
    console.error("❌ Server failed to start:", err);
  });

  serverProcess.on("exit", (code) => {
    console.error("⚠️ Server exited with code:", code);
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    const indexPath = path.join(
      process.resourcesPath,
      "app",
      "client",
      "build",
      "index.html"
    );
    mainWindow.loadFile(indexPath);
  }

  mainWindow.on("closed", () => {
    if (serverProcess) {
      serverProcess.kill("SIGKILL");
      serverProcess = null;
    }
    mainWindow = null;
  });

  mainWindow.webContents.send("main-log", "🚀 Main started");
}

app.on("ready", createWindow);

function cleanupServer() {
  if (serverProcess) {
    serverProcess.kill("SIGKILL");
    serverProcess = null;
  }
}

app.on("window-all-closed", () => {
  cleanupServer();
  if (process.platform !== "darwin") app.quit();
});

app.on("will-quit", cleanupServer);

process.on("exit", cleanupServer);
process.on("SIGINT", () => {
  cleanupServer();
  process.exit();
});
process.on("SIGTERM", () => {
  cleanupServer();
  process.exit();
});
