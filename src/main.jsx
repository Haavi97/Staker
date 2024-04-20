import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Staking from './pages/Staking.jsx'
import Vesting from './pages/Vesting.jsx'
import Entity from './pages/Entity.jsx'
import Info from './pages/Info.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/staking' element={<Staking/>}/>
        <Route path='/vesting' element={<Vesting/>}/>
        <Route path='/entity' element={<Entity/>}/>
        <Route path='/info' element={<Info/>}/>
        
      </Routes>
    </Router>
  </React.StrictMode>,
)
