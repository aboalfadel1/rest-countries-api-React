import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Card from './components/card/card';
import Cards from './components/cards/cards';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryDetails from './components/country-details/countryDetails';
function App() {

  return (
   <Router>
    <Header />
    <div className="App">
      <Routes>
      <Route exact path="/" element={<Cards />} />
      <Route exact path="/:countryDetails" element={<CountryDetails />} />
      </Routes>
    </div>
   </Router>
  );
}

export default App;
