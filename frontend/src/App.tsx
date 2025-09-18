import "./App.css";
import Home from "./components/pages/Home.tsx";
import Hero from "./components/Hero/Hero.tsx";
import Registro from "./Registro.tsx";

const App = () => {
  return (
    <div>
      <Home />
      <Hero />
      <Registro />
    </div>
  );
};

export default App;
