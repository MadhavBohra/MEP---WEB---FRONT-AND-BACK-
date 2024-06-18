'use client';

import React, { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './StoreProvider';
import UserDashboard from './components/UserDashboard';
import UserEditForm from './components/UserEdit';

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <Router>
        <Routes>
          <Route path="/" element={<UserEditForm/>} />
          <Route path="/user-details" element={<UserEditForm />} />
        </Routes>
        {children}
      </Router>
    </StoreProvider>
  );
}
