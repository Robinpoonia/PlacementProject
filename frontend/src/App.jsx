import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] to-[#1a2332]">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes as you implement pages */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
