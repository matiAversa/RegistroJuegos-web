import VistaTodosLosJuegos from "../components/VistaTodosLosJuegos";
import Layout from "../components/layout";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function VistaTodosJuegos() {
    return (
        <Layout>
            <div className="container-fluid main-container d-flex flex-row align-items-stretch vh-100">
                <div id="divJuegos">
                    <h5>Juegos Disponibles para calificar</h5>
                    <VistaTodosLosJuegos></VistaTodosLosJuegos>
                </div>
            </div>
        </Layout>
    );
}

export default VistaTodosJuegos;