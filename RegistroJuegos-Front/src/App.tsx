
import { Route, Routes } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import LogIn from "./Pages/LogIn";
import PaginaPrincipal from "./Pages/PaginaPrincipal"
import TodosJuegosView from "./Pages/TodosJuegosView";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/TodosLosJuegos" element={<TodosJuegosView />} />

      </Routes>
    </>
  );
}

export default App


//npm run dev
//mvn spring-boot:run