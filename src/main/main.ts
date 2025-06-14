import { app } from 'electron'
import { createWindow } from './window.js'
import { registerHandlers } from './handlers.js'
import { startServer } from './server/express.js';
import { connectMongo, startMongoProcess } from './db/mongo.db.js';

app.whenReady().then(async () => { 
  startServer();
  createWindow();
  registerHandlers();
  startMongoProcess();
  await connectMongo();
})

app.on('window-all-closed', function () { 
  if (process.platform !== 'darwin') app.quit() 
})