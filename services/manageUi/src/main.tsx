import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.js'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import {AppShell, MantineProvider} from '@mantine/core';
import {ApplicationFooter, ApplicationHeader, ApplicationNavbar} from "./components/AppShellComponents.js";

const router = createBrowserRouter([
  {
    path: "/manage/",
    element:  <Home />,
  },
]);

const theme = { fontFamily: 'Open Sans' }


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <AppShell header={<ApplicationHeader/>} footer={<ApplicationFooter/>} navbar={<ApplicationNavbar/>}>
        <RouterProvider router={router} />
      </AppShell>
    </MantineProvider>
  </React.StrictMode>
)
