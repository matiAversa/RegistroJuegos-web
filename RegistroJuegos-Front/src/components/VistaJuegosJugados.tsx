import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type Juego = {
    id: number;
    nombre: string;
    calificacion: string;
    descripcion: string;
}

type Props = {}

export default function VistaJuegosJugados({ }: Props) {

    const [juegosList, setJuegosList] = useState<Juego[]>([]);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }
        incializarLista();

    }, []);

    if (!isAuthenticated) return null;

    async function incializarLista() {
        const response = await fetch(`${API_URL}/api/JuegosJugados`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        });
        if (response.status === 200) {
            const data = await response.json();
            setJuegosList(data);
        } else {
            if (response.status == 204) {
                setJuegosList([]);
            }
        }
    }


    async function EliminarJuego(juego: Juego) {
        const response = await fetch(`${API_URL}/api/EliminarJuegoJugado`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({ juegoId: juego.id }),
        });
        if (response.status == 204) {
            console.log("respuesta ")
        } else {
            if (response.status == 404) {
                alert("no se pudo eliminar el juego (E404)")
            } else {
                if (response.status == 500) {
                    alert("no se pudo eliminar el juego (E500)")

                }
            }
        }
        incializarLista();
        console.log("Nuevo juegosList en eliminar", juegosList);


    }

    return (
        <>
            <div className="container d-flex justify-content-end mt-5">
                <table className="table table-bordered table-hover" style={{ maxWidth: 1000 }}>
                    <thead className="thead-light">
                        <tr className="text-center">
                            <th style={{ width: "28%" }}>Nombre del Juego</th>
                            <th style={{ width: "22%" }}>Tu Calificación</th>
                            <th style={{ width: "32%" }}>Descripción</th>
                            <th style={{ width: "18%" }}>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {juegosList.map((juego) => (
                            <tr key={juego.id} className="text-center align-middle">
                                <td>{juego.nombre}</td>
                                <td>
                                    {juego.calificacion}
                                    <span style={{ color: '#FFC107', fontSize: 20, marginLeft: 2 }}>⭐</span>
                                </td>
                                <td className="text-break">{juego.descripcion}</td>
                                <td>
                                    <button onClick={() => EliminarJuego(juego)} className="btn btn-danger">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );


}

