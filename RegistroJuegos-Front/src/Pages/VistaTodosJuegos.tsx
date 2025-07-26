import VistaJuegosJugados from "../components/VistaJuegosJugados";
//import VistaJuegos from "../components/VistaJuegos";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


function VistaTodosJuegos() {
    return (
        <div className="container-fluid main-container d-flex flex-row align-items-stretch vh-100">
            <div id="divJuegosJugados" className="panel panel-left">
                <h5>Juegos calificados</h5>
                <VistaJuegosJugados />
            </div>
            <div id="divJuegos" className="panel panel-right">
                <h5>Juegos Disponibles a calificar</h5>

            </div>
        </div>
    );
}

export default VistaTodosJuegos;
