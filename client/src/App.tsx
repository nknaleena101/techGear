import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { useAuthStore } from './store/authStore';

function App() {
  const { user, logout } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Dynamic Navbar */}
        <nav className="p-4 bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-black text-blue-600 tracking-tight">Tech<span className="text-gray-800">Gear</span></Link>
                <div className="flex items-center gap-6">
                    <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Shop</Link>
                    
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-gray-700">Hello, <span className="text-blue-600 font-bold">{user.name}</span></span>
                            <button 
                                onClick={logout}
                                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded font-medium transition-colors">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
        
        {/* Routes Mapping */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;