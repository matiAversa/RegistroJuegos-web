import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {}

export default function VistaLogIn({ }: Props) {

    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");

    const navigate = useNavigate();

    const Autenticar = async () => {

        const response = await fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mail, password }),
        });

        if (response.status === 200) {
            setMensaje("User logged");
            const data = await response.json();
            if (data) {
                localStorage.clear();
                console.log(data)
                localStorage.setItem('userId', data);

                navigate("/VistaTodosJuegos")
            }
        } else if (response.status === 404) {
            setMensaje("mail not found. ERROR " + response.status);
        } else if (response.status === 401) {
            setMensaje("Incorrect Password. ERROR " + response.status);
        } else {
            setMensaje("Inesperated error. ERROR " + response.status);
        }
        console.log(mensaje);
    };

    const RedirigirSignIn = () => {
        navigate("/SignIn");
    }

    return (
        <>
            <label htmlFor="email">Mail:</label><br />
            <input type="text" id="emailInput" placeholder="Mail" onChange={e => setMail(e.target.value)} />
            <br />
            <label htmlFor="password">Contraseña:</label><br />
            <input type="password" id="passwordInput" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} />
            <br />
            <br />
            <button className="btn btn-primary" onClick={Autenticar} >Ingresar</button><br />
            <label>No tenes cuenta?</label>
            <button className="btn btn-success" onClick={RedirigirSignIn}>Registrarse</button>
            <div className="alert alert-danger" role="alert">
                {mensaje}
            </div>
        </>
    )
}