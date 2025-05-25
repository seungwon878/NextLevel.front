import React from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './Routes/routes';

const App: React.FC = () => {
  return <>{useRoutes(routes)}</>;
};