import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;



type Props = {}

export default function VistaJuegosJugados({ }: Props) {
    type Juego = {
        id: number;
        nombre: string;
        calificacion: string;
    }

    const [JuegosJugados, setJuegosJugados] = useState<Juego[]>([]);
    const [juegoActivo, setJuegoActivo] = useState<number | null>(-1);

    const fetchData = async () => {
        const response = await fetch(`${API_URL}/api/JuegosJugados?userId=${localStorage.getItem("userId")}`);
        if (response.status == 200) {
            const data = await response.json();
            setJuegosJugados(data);
        } else {
            if (response.status == 204) {
                setJuegosJugados([{ id: 0, nombre: "no hay juegos agrgados a tu lista", calificacion: "" }])
            }
        }

    };

    useEffect(() => {

        fetchData();
    }, []);


    async function EliminarJuego() {
        const response = await fetch(`${API_URL}/api/EliminarJuegoJugado`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({ juegoId: juegoActivo }),
        });

        if (response.status == 204) {
            fetchData();
        } else {
            if (response.status == 404) {

            } else {
                if (response.status == 500) {

                }
            }
        }
    }

    return (

        <>
            <div className="container d-flex justify-content-end mt-5">
                <table className="table table-bordered table-hover" style={{ maxWidth: 700 }}>
                    <thead className="thead-light">
                        <tr className="text-center">
                            <th>Nombre del Juego</th>
                            <th>Tu Calificación</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {juegosList.map((juego, id) => (
                            <tr key={id} className="text-center align-middle">
                                <td>{juego.nombre}</td>
                                <td>
                                    {juego.calificacion}
                                    <span style={{ color: '#FFC107', fontSize: 20, marginLeft: 2 }}>⭐</span>
                                </td>
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

