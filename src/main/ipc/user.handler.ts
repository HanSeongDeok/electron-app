import { ipcMain } from 'electron';
import { getUser } from '../services/user.service';
import { GET_USER } from '@/constants';

export const userHandler = () => {
    ipcMain.handle(GET_USER, async (...args) => {
    console.log('[Main] GET_USER handler called with', args);
    return await getUser();
  });
}
