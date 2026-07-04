import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home.js';
import { ProductDetail } from './pages/ProductDetail.js';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Simple Global Navbar */}
        <nav className="p-4 bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-black text-blue-600 tracking-tight">Tech<span className="text-gray-800">Gear</span></Link>
                <div className="flex gap-4">
                    <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Shop</Link>
                </div>
            </div>
        </nav>
        
        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;