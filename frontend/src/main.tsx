import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.tsx'

import AboutScreen from './screens/AboutScreen.tsx'
import HomeScreen from './screens/HomeScreen.tsx'
import LoginScreen from './screens/LoginScreen.tsx'
import SignupScreen from './screens/SignupScreen.tsx'
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter
} from "react-router";

/*
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
        { index: true, Component: HomeScreen },
        { path: "about", Component: AboutScreen },
        { path: "signup", Component: SignupScreen },
    ]
  },
  {
      path: "login",
      element: <LoginScreen/>
  }
]);
*/

// NOTE! StrictMode renders components twice in dev mode
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
  </StrictMode>
)
/*
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
// NOTE! StrictMode renders components twice in dev mode
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>
)
*/
