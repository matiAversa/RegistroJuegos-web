import VistaJuegosJugados from "../components/VistaJuegosJugados";
import Layout from "../components/layout";

function MisJuegosJugados() {
    return (
        <Layout>
            <div className="container-fluid main-container d-flex flex-row align-items-stretch vh-100">
                <div id="divJuegos">
                    <h5>Mis Juegos Jugados</h5>
                    <VistaJuegosJugados></VistaJuegosJugados>
                </div>
            </div>
        </Layout>
    );
}
export default MisJuegosJugados;