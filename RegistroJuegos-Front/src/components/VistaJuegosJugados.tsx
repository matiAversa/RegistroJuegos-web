import { useEffect, useState } from "react";


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
        const response = await fetch(`http://localhost:8080/api/JuegosJugados?userId=${localStorage.getItem("userId")}`);
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
        const response = await fetch('http://localhost:8080/api/EliminarJuegoJugado', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: localStorage.getItem("userId"), juegoId: juegoActivo }),
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
            <label>Seleccione un juego para eliminarlo.</label><br />
            <ul className="list-group" style={{ width: "100%", margin: 0, padding: 0 }}>
                {JuegosJugados.map((jueguito) => (
                    <li className={`list-group-item list-group-item-action${juegoActivo === jueguito.id ? " active" : ""}`}
                        key={jueguito.id} onClick={() => setJuegoActivo(jueguito.id)} > {jueguito.nombre} --- {jueguito.calificacion}/10</li>
                ))}
            </ul>
            <button className="" onClick={EliminarJuego} >Eliminar</button>
        </>

    );


}

