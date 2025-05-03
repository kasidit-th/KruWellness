const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const { fork } = require('child_process')
const fs = require('fs')

let mainWindow
let serverProcess

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  mainWindow.webContents.openDevTools()

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000')
  } else {
    const serverPath = path.join(process.resourcesPath, 'server', 'index.js')
    serverProcess = fork(serverPath, {
      env: { NODE_ENV: 'production' }
    })

    serverProcess.on('error', (err) => {
      console.error('Server failed to start:', err)
    })

    serverProcess.on('exit', (code) => {
      console.error('Server exited with code:', code)
    })

    const indexPath = path.join(process.resourcesPath, 'client', 'build', 'index.html')

    const waitForFile = (filePath, timeout = 10000) => {
      return new Promise((resolve, reject) => {
        const start = Date.now()
        const check = () => {
          if (fs.existsSync(filePath)) {
            return resolve()
          }
          if (Date.now() - start > timeout) {
            return reject(new Error('Timeout waiting for file'))
          }
          setTimeout(check, 300)
        }
        check()
      })
    }

    waitForFile(indexPath)
      .then(() => {
        mainWindow.loadFile(indexPath)
      })
      .catch((err) => {
        console.error('Failed to load frontend:', err)
        mainWindow.loadURL('data:text/html,<h1>Failed to load frontend</h1>')
      })
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
