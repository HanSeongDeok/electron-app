import { app, BrowserWindow } from "electron";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const createWindow = () => { 
  const win = new BrowserWindow({ 
    width: 900, 
    height: 700, 
    webPreferences: { 
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation : true,
      nodeIntegration: false
    } 
  }) 
  if (app.isPackaged) {
     win.loadFile(path.join(__dirname, 'renderer/index.html'));
  } else {
    win.loadURL("http://localhost:5173")
    win.webContents.openDevTools()
  }
} 