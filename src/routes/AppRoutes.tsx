import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DefaultLayout from '../config/layout/DefaultLayout';
import Home from '../pages/Home';
import Transactions from '../pages/Transactions';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout component={Home} />} />
        <Route path="/transactions" element={<DefaultLayout component={Transactions} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
