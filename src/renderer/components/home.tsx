import { memo, useEffect } from "react";
import { RECIEVE_REACT_PONG, SEND_MAIN_PING } from "src/constants";
import nature from '@images/nature.png'
import { usePingPong } from "@hooks/usePingPong";

const Home = memo(() => {
  const sendToMain = () => {
    window.electron.ipcRenderer.send(SEND_MAIN_PING, SEND_MAIN_PING)
  }

  usePingPong();
  return <div className="App">
  <header className="App-header">
    <img src={nature} className="App-logo" alt="logo" />
    <p>
      TEST <br />
    </p>
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
    <button onClick={sendToMain}>Send Ping</button>
  </header>
</div>
});

export default Home;
