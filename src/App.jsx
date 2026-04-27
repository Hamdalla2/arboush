import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Login from './pages/Login';
import Product from './pages/Product';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
