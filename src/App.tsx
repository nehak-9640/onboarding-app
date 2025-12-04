import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import OnboardingRouter from './pages/OnboardingRouter';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { useAppSelector } from './hooks';

const App: React.FC = () => {
  const completed = useAppSelector((s) => s.onboarding.completed);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/onboarding/*" element={<OnboardingRouter />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
