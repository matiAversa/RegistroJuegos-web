import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
const API_URL = import.meta.env.VITE_API_URL;



type Props = {}

export default function RecomendarJuegos({ }: Props) {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

    },);

    async function RecomendarNuevoJuego(val: String) {
        const response = await fetch(`${API_URL}/api/RecomendarJuego`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({ recomendado: val }),
        });

        if (response.status == 204) {
            alert("Juego recomendado")
            const val = document.getElementById('inputJuego') as HTMLInputElement | null;
            if (val) val.value = ""
        } else {
            if (response.status == 409) {
                alert("ese juego ya esta recomendado o ya esta en la lista de juegos")
                const val = document.getElementById('inputJuego') as HTMLInputElement | null;
                if (val) val.value = ""
            } else {
                if (response.status == 500) {
                    alert("error al recomendar juego")
                }
            }
        }
    }

    return (
        <>
            <div className="container mt-4 mb-4 d-flex justify-content-center">
                <div className="input-group" style={{ maxWidth: 400 }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre del juego..."
                        id="inputJuego"
                    />
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => {
                            const val = document.getElementById('inputJuego') as HTMLInputElement | null;
                            if (val) {
                                RecomendarNuevoJuego(val.value);
                            }
                        }}
                    >
                        Recomendar
                    </button>
                </div>
            </div>
        </>
    )
}