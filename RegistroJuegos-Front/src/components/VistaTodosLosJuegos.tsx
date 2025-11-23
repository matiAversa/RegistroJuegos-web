import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

type Juego = {
    id: number;
    nombre: string;
    promedio: string;
}

type Props = {};

export default function VistaTodosLosJuegos({ }: Props) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [juegosList, setJuegosList] = useState<Juego[]>([]);

    const [modalOpen, setModalOpen] = useState(false);
    const [juegoSeleccionado, setJuegoSeleccionado] = useState<Juego | null>(null);
    const [calificacion, setCalificacion] = useState(0);
    const [descripcion, setDescripcion] = useState("");

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }
        incializarLista();
        console.log("hago")
    }, []);

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
        if (response.status === 200) {
            const data = await response.json();
            setJuegosList(data);
        }
    }

    // Abrir modal cuando el usuario quiere calificar
    function CalificarJuego(juego: Juego) {
        return () => {
            setJuegoSeleccionado(juego);
            setCalificacion(0);
            setDescripcion("");
            setModalOpen(true);
        }
    }

    function handleStarClick(index: number) {
        setCalificacion(index + 1);
    }

    function handleDescripcionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        if (e.target.value.length <= 100)
            setDescripcion(e.target.value);
    }

    function handleCancelar() {
        setModalOpen(false);
    }

    async function handleConfirmar() {
        if (!juegoSeleccionado) return;
        await NuevoJuegoJugado(juegoSeleccionado.id, calificacion, descripcion);
        setModalOpen(false);
        incializarLista();
    }

    async function NuevoJuegoJugado(id: number, calificacion: number, descripcion: string) {
        const response = await fetch(`${API_URL}/api/nuevoJuegoJugado`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                juegoId: id,
                calificacion,
                descripcion
            })
        });

        if (response.status !== 200) {
            alert("Error al calificar juego")
        }
        incializarLista();
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
                                <td>{juego.promedio}⭐</td>
                                <td>
                                    <button onClick={CalificarJuego(juego)} className="btn btn-primary">Calificar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            {modalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                    background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
                }}>
                    <div style={{
                        background: '#fff', borderRadius: 12, minWidth: 350, padding: 26, boxShadow: '0 2 16px #0003',
                        display: 'flex', flexDirection: 'column', alignItems: 'center'
                    }}>
                        <h4 style={{ marginBottom: 12 }}>Calificar juego</h4>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
                            {/* Estrellas */}
                            {[...Array(10)].map((_, i) =>
                                <span key={i}
                                    style={{
                                        cursor: 'pointer',
                                        fontSize: 34,
                                        color: i < calificacion ? '#FFC107' : '#e0e0e0', // Amarillo o gris claro
                                        transition: 'color .2s',
                                        margin: '0 2px'
                                    }}
                                    onClick={() => handleStarClick(i)}
                                    aria-label={`${i + 1} estrellas`}
                                >
                                    {i < calificacion ? '⭐' : '☆'}
                                </span>
                            )}
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: 16
                        }}>
                            {/* Números */}
                            {[...Array(10)].map((_, i) =>
                                <span key={i}
                                    style={{
                                        display: 'inline-block',
                                        width: 34,
                                        textAlign: 'center',
                                        fontSize: 15,
                                        color: '#333'
                                    }}
                                >
                                    {i + 1}
                                </span>
                            )}
                        </div>
                        <textarea
                            placeholder="Deja una descripción (opcional, máx 100 chars)"
                            value={descripcion}
                            onChange={handleDescripcionChange}
                            maxLength={100}
                            rows={3}
                            style={{ width: '100%', marginBottom: 16, resize: 'none' }}
                        />
                        <div style={{ display: 'flex', gap: 10 }}>
                            <button className="btn btn-secondary" onClick={handleCancelar}>Cancelar</button>
                            <button className="btn btn-primary"
                                disabled={calificacion === 0}
                                onClick={handleConfirmar} >Confirmar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}