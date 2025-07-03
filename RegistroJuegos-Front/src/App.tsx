import Card, { CardBody } from "./components/Card"
import List from "./components/List"

function App() {

  return (
    <>
      <Card>
        <CardBody titulo={"buenas"} cuerpo={"tardes"} textoBoton={"boton abc"} direccion={"p"} /><br /><br />
        <List lista={["pepe", "popo", "pipi"]} />
      </Card>

    </>
  );
}

export default App
