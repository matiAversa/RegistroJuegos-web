import Card from "./components/Card"
import VistaLogIn from "./components/LogIn"

function App() {

  return (
    <>
      <Card>
        <h5>Iniciar Sesion:</h5>
        <p>Ingrese su Mail y Contraseña: </p>
        <VistaLogIn />
      </Card>

    </>
  );
}

export default App
