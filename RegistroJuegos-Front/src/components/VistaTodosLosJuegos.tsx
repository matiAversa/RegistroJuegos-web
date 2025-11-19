import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const API_URL = import.meta.env.VITE_API_URL;
type Props = {}


export default function VistaTodosLosJuegos({ }: Props) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [juegosList, setJuegosList] = useState<Juego[]>([]);


    type Juego = {
        id: number;
        nombre: string;
        promedio: string;
    }

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
            return
        }
        incializarLista();
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return null;


    async function incializarLista() {

        const response = await fetch(`${API_URL}/api/JuegosSinCalificar`
            , {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")

                }
            });

        if (response.status == 200) {

            const data = await response.json();
            setJuegosList(data);
        }
    }


    return (

        <>
            <div className="container d-flex justify-content-end mt-5">
                <table className="table table-bordered table-hover" style={{ maxWidth: 700 }}>
                    <thead className="thead-light">
                        <tr className="text-center">
                            <th>Nombre del Juego</th>
                            <th>Promedio de Calificación</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {juegosList.map((juego, id) => (
                            <tr key={id} className="text-center align-middle">
                                <td>{juego.nombre}</td>
                                <td>{null}</td>
                                <td>
                                    <button className="btn btn-primary">Calificar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>

    )

}


