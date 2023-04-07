import React, { useState, useEffect, createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home.js';
import NavBar from './NavBar.js';
import Signup from './Signup.js';
import Login from './Login.js';
import MyInventory from './MyInventory.js';
import Manager from './Manager.js';
import './App.css';

export const ItemsContext = createContext();
export const LoginContext = createContext();
export const ManagersContext = createContext();

function App() {
  const [items, setItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [managers, setManagers] = useState([]);
  const [user, setUser] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080')
      .then(res => res.json())
      .then(data => {
        data.sort((a,b) => a.id - b.id);
        setItems(data)
      })
  }, [])

  // console.log('items from App:\n', items)
  // console.log('managers from App:\n', managers);

  return (
    <>
      <ManagersContext.Provider value={{ managers, setManagers }}>
        <LoginContext.Provider value={{ loggedIn, setLoggedIn, user, setUser }}>
          <ItemsContext.Provider value={{ items, setItems }} >
            <NavBar />
            {!loggedIn &&
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            }
            {loggedIn &&
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/myinventory" element={<MyInventory />} />
                {managers.map((manager, index) => (
                  <Route key={index} path={`/${manager}`} element={<Manager manager={manager} />} />
                ))}
              </Routes>
            }
          </ItemsContext.Provider>
        </LoginContext.Provider>
      </ManagersContext.Provider>
    </>
  );
}

export default App;
