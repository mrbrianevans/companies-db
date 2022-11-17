import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.js'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import {App} from "./App.js";
import KeyPage from "./pages/KeyPage.js";
import Tester from "./pages/Tester.js";

const router = createBrowserRouter([
  {
    path: "/manage/",
    element:  <App />,
    children: [
      {
        path: '/manage/',
        element: <Home/>
      },
      {
        path: '/manage/key',
        element: <KeyPage/>
      },
      {
        path: '/manage/tester',
        element: <Tester/>
      }
    ]
  },
]);



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
