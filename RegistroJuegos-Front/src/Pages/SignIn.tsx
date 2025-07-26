
import Card from "../components/Card"
import VistaSignIn from "../components/VistaSignIn"

function SingIn() {

    return (
        <>

            <div>
                <Card Width={350} Height={350}>
                    <h5>Registrarse:</h5>
                    <VistaSignIn />
                </Card>
            </div>

        </>
    );
}

export default SingIn;