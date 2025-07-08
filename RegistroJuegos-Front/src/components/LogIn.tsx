import { useState } from "react";

type Props = {}

export default function VistaLogIn({ }: Props) {

    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");

    const Autenticar = async (e: React.FormEvent) => {

        const response = await fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mail, password }),
        });

        if (response.status === 204) {
            setMensaje("¡Login exitoso!");
        } else if (response.status === 404) {
            setMensaje("El mail no existe.");
        } else if (response.status === 401) {
            setMensaje("Contraseña incorrecta.");
        } else {
            setMensaje("Error inesperado.");
        }
        console.log(mensaje);
    };


    return (
        <>
            <label htmlFor="email">Mail:</label><br />
            <input type="text" id="emailInput" placeholder="Mail" onChange={e => setMail(e.target.value)} />
            <br />
            <label htmlFor="password">Contraseña:</label><br />
            <input type="password" id="passwordInput" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} />
            <br />
            <br />
            <button className="btn btn-primary" onClick={Autenticar} >Ingresar</button>
            <div className="alert alert-danger" role="alert">
                {mensaje}
            </div>
        </>
    )
}