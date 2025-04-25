import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import GameHeader from './components/layout/GameHeader';
import GameFooter from './components/layout/GameFooter';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './index.css';

// Add custom animation keyframes
const customStyles = `
  @keyframes float {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 0.1;
    }
    50% {
      transform: translateY(-20px) rotate(10deg);
      opacity: 0.2;
    }
    100% {
      transform: translateY(0) rotate(0deg);
      opacity: 0.1;
    }
  }
  
  @keyframes pop {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    40% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  .animate-float {
    animation: float 15s ease-in-out infinite;
  }
  
  .animate-pop {
    animation: pop 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
`;

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <style>{customStyles}</style>
        
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <>
                  <GameHeader />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={isAdmin ? <AdminDashboard /> : <HomePage />} />
                    </Routes>
                  </main>
                  <GameFooter />
                </>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;