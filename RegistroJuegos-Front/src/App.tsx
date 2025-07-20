
import { Route, Routes } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import LogIn from "./Pages/LogIn";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App
