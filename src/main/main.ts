import { app } from 'electron'
import { createWindow } from './window.js'
import { registerHandlers } from './handlers.js'
import { startServer } from './server/express.js';

app.whenReady().then(() => { 
  startServer();
  createWindow();
  registerHandlers();
})

app.on('window-all-closed', function () { 
  if (process.platform !== 'darwin') app.quit() 
})