import Card from "../components/Card";
import VistaLogIn from "../components/VistaLogIn";


function LogIn() {

    return (
        <>
            <Card Width={350} Height={350}>
                <h5>Iniciar Sesion:</h5>
                <p>Ingrese su Mail y Contraseña: </p>
                <VistaLogIn />
            </Card>
        </>
    );


}

export default LogIn;