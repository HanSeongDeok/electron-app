import { app } from 'electron'
import { createWindow } from './window.js'
import { registerHandlers } from './handlers.js'

app.whenReady().then(() => { 
  createWindow() 
  registerHandlers();
}) 
app.on('window-all-closed', function () { 
  if (process.platform !== 'darwin') app.quit() 
})