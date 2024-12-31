import React from 'react';
import { useRoutes } from 'react-router-dom';
import { publicRoutes, protectRoutes } from './routes';
import './App.scss';
import '../src/core';

function App() {
  // const element = useRoutes([...publicRoutes, ...protectRoutes]);
  return <div className="App">Welcome</div>;
}

export default App;
