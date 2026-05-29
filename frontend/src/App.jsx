import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Header from './components/Layout/Header';
import Home from './pages/Home';
import Experiences from './pages/Experiences';
import NewExperience from './pages/NewExperience';
import Resume from './pages/Resume';

import PrivateRoute from './components/Auth/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>

      <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] to-[#1a2332]">

        <Header />

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/experiences"
            element={<Experiences />}
          />

          <Route
            path="/experiences/new"
            element={
              <PrivateRoute role="senior">
                <NewExperience />
              </PrivateRoute>
            }
          />

          <Route
            path="/resume"
            element={
              <PrivateRoute
                role={['junior', 'senior']}
              >
                <Resume />
              </PrivateRoute>
            }
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}