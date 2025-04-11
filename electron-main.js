const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const { fork } = require('child_process')
const { spawn } = require('child_process');


let mainWindow
let serverProcess

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  mainWindow.webContents.openDevTools();

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000')
  } else {
    const serverPath = path.join(
      process.resourcesPath,
      'server',
      'index.js'
    )
    console.log('Server path:', serverPath)

    serverProcess = fork(serverPath, {
      env: { NODE_ENV: 'production' }
    })

console.log('Resources path:', process.resourcesPath);
    serverProcess.on('error', (err) => {
      console.error('Server failed to start:', err);
    });
    
    serverProcess.on('exit', (code) => {
      console.error('Server exited with code:', code);
    });

    const indexPath = path.join(process.resourcesPath, 'client', 'build', 'index.html')
mainWindow.loadFile(indexPath)

  }

  mainWindow.on('closed', () => (mainWindow = null))
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('will-quit', () => {
  if (serverProcess) serverProcess.kill()
})