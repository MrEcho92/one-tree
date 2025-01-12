import React from 'react';
import { useRoutes } from 'react-router-dom';
import { publicRoutes, protectedRoutes } from './routes';
import './App.scss';
import '../src/core';

function App() {
  const element = useRoutes([...publicRoutes, ...protectedRoutes]);
  return <div className="App">{element}</div>;
}

export default App;
