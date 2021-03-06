import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import SobsListView from 'src/views/sobs/CustomerListView';
import SoesListView from 'src/views/soes/CustomerListView';
import SeetListView from 'src/views/seet/CustomerListView';
import SohtListView from 'src/views/soht/CustomerListView';
import ScitListView from 'src/views/scit/CustomerListView';
import SmatListView from 'src/views/smat/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import StudentView from 'src/views/student/AccountView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';

const routes = (authenticated) => [
  {
    path: 'portal',
    element: authenticated ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'saat', element: <CustomerListView /> },
      { path: 'sobs', element: <SobsListView /> },
      { path: 'soes', element: <SoesListView /> },
      { path: 'seet', element: <SeetListView /> },
      { path: 'soht', element: <SohtListView /> },
      { path: 'scit', element: <ScitListView /> },
      { path: 'smat', element: <SmatListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'portal/student',
    element: authenticated ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: ':slug', element: <StudentView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
