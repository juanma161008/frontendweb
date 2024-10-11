// App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './screens/main/Main';
import Login from './screens/users/Login';
import Inicio from './screens/inicio/Inicio';
import Transacciones from './screens/transacciones/Transacciones'
import Prestamos from './screens/prestamos/Prestamos'
import Reportes from './screens/reportes/Reportes'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Inicio' element={<Inicio />} />
        <Route path='/Transacciones' element={<Transacciones />} />
        <Route path='/Prestamos' element={<Prestamos />} />
        <Route path='/Reportes' element={<Reportes />} />
      </Routes>
    </Router>
  );
}

export default App;
