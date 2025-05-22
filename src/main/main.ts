import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { SEND_MAIN_PING, RECIEVE_REACT_PONG, PING_PONG_EVENT } from '../constants.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function createWindow () { 
  const win = new BrowserWindow({ 
    width: 800, 
    height: 600, 
    webPreferences: { 
      preload: path.join(__dirname, '../../build', 'preload.js'),
      contextIsolation : true,
      nodeIntegration: false
    } 
  }) 
  win.loadURL("http://localhost:5173")
  win.webContents.openDevTools()
} 
ipcMain.on(SEND_MAIN_PING, (event, args) => {
    console.log(args)
    event.reply(RECIEVE_REACT_PONG, 
      PING_PONG_EVENT, RECIEVE_REACT_PONG) // event // message 
})
app.whenReady().then(() => { 
  createWindow() 
}) 
app.on('window-all-closed', function () { 
  if (process.platform !== 'darwin') app.quit() 
})