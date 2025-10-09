// * Se importan los componentes a utilizar
import { createBrowserRouter } from "react-router-dom";
import Registro from "../components/Registro/Registro.tsx";
import Login from "../components/Login/Login.tsx";
import Home from "../components/pages/Home.tsx";

// * Se hace una onstante router en donde se guardan todas las direcciones para ir navegando por los componentes
export const router = createBrowserRouter([
  { path: "/", element: <Registro /> },
  { path: "/login", element: <Login /> },
  { path: "/app", element: <Home /> },
]);
