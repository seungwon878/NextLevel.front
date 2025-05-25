import React from 'react';
import { RouteObject } from 'react-router-dom';
import LandingPageContainer from '../LandingPage';
// import other page containers...

export const routes: RouteObject[] = [
  { path: '/', element: <LandingPageContainer /> },
  { path: 'landing', element: <LandingPageContainer /> },
  { path: '*', element: <LandingPageContainer /> },
  // 여기에 다른 경로 추가
];
