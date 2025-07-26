
import { Route, Routes } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import LogIn from "./Pages/LogIn";
import VistaJuegosJugados from "./Pages/VistaTodosJuegos";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/VistaTodosJuegos" element={<VistaJuegosJugados />} />

      </Routes>
    </>
  );
}

export default App


//npm run dev
//mvn spring-boot:run