import logo from '@images/logo.svg';
import './App.css';
import { SEND_MAIN_PING, RECIEVE_REACT_PONG } from './constants.js'
import { useEffect, useState, memo } from "react";

const App = memo(() => {
  const sendToMain = () => {
    window.electron.ipcRenderer.send(SEND_MAIN_PING, SEND_MAIN_PING)
  }
  
  useEffect(() => {
    const listener = (event: Electron.IpcRendererEvent, message: string) => {
      console.log(`${event}: ${message}`);
    };
  
    window.electron.ipcRenderer.on(RECIEVE_REACT_PONG, listener);
    return () => {
      window.electron.ipcRenderer.removeListener(RECIEVE_REACT_PONG, listener);
    };
  }, []);

  return <div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      TEST <br />
      Edit <code>src/App.js</code> and save to reload.
    </p>
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
    <button onClick={sendToMain}>Send Mail</button>
  </header>
</div>
});

export default App;
