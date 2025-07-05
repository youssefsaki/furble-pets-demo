import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import PetList from './Pages/PetList';
import PetProfile from './Pages/PetProfile';
import PetProducts from './Pages/PetProducts';
import About from './Pages/About';
import ContactUs from './Pages/ContactUs';
import FormData from './Components/FormData';
import AdoptForm from './Pages/AdoptForm';
import Favorites from './Pages/Favorites';
import NotFound from './Pages/notFound';
import Dashboard from './Components/Dashboard';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Donate from './Pages/Donate';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/petlist" element={<PetList />} />
          <Route path="/petprofile/:id" element={<PetProfile />} />
          <Route path="/petproducts" element={<PetProducts />} />
          <Route path="/petproducts/:id" element={<PetProducts />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/formdata" element={<FormData />} />
          <Route path="/adoptform/:id" element={<AdoptForm />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/donate" element={<Donate />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
