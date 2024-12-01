// src/Routes.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Partners from './pages/Partners';
import Orders from './pages/Orders';
import Assignments from './pages/Assignments';
import Layout from './components/Layout';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/assignments" element={<Assignments />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
