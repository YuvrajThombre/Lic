import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import PlanDetails from './Component/PlanDetails';
import CategoryPlans from './Component/CategoryPlans';
import Home from './pages/Home';
import Plans from './pages/Plans';
import BlogPost from './Component/BlogPost';
import Blog from './pages/Blog';
import PlansByCatergoies from './pages/PlansByCatergoies';
import Contact from './pages/Contact';
import Header from './Component/Header';
import Footer from './Component/Footer';

function App() {
  return (
    <Router>
      <Header />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/category/:categoryName" element={<PlansByCatergoies />} />
          <Route path="/plans/:title" element={<PlanDetails />} />
          <Route path="/blog/:title" element={<BlogPost />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
