import { memo } from "react";
import nature from '@images/nature.png'
import { usePingPong } from "@hooks/usePingPong";
import { NavLink } from "react-router-dom";
import { sendToMain } from "@handlers/ipcHandler";

const Home = memo(() => {
  usePingPong();
  return (
    <div className="App">
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
            <button className="btn" onClick={sendToMain}>Send Ping</button>
          </NavLink>
          <NavLink to="/Other">
            <button className="btn">Go to Views</button>
          </NavLink>
          <NavLink to="/Test">
            <button className="btn">Go to Test</button>
          </NavLink>
          <NavLink to="/Dock">
            <button className="btn">Go to Dock</button>
          </NavLink>
          <NavLink to="/Mosaic">
            <button className="btn">Go to Mosaic</button>
          </NavLink>
          <NavLink to="/Zustand-1">
            <button className="btn">Go to ZS-1</button>
          </NavLink>
          <NavLink to="/Zustand-2">
            <button className="btn">Go to ZS-2</button>
          </NavLink>
        </div>
      </header>
    </div>
  )
});

export default Home;
