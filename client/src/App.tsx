import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <nav className="p-4 bg-white shadow-md">
            <h1 className="text-xl font-bold">TechGear</h1>
        </nav>
        <main className="p-6">
          <Routes>
            <Route path="/" element={<h2>Home Page</h2>} />
            <Route path="/products/:id" element={<h2>Product Detail Page</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;