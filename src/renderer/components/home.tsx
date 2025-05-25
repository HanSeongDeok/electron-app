import { memo } from "react";
import nature from '@images/nature.png'
import { usePingPong } from "@hooks/usePingPong";
import { sendToMain } from "@ipcs/ipcSend";
import { NavLink } from "react-router-dom";

const Home = memo(() => {
  usePingPong();
  return <div className="App">
  <header className="App-header">
    <img src={nature} className="App-logo" alt="logo" />
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
    <div className="Flex-row">
      <NavLink to="/">
        <button onClick={sendToMain}>Send Ping</button>
      </NavLink>
      <NavLink to="/Other">
        <button>Go to Views</button>
      </NavLink>
    </div>
  </header>
</div>
});

export default Home;
