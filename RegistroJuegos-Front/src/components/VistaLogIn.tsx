import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 1. Agregado para Google OAuth:
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

// 2. Usar la variable de entorno para la URL
const API_URL = import.meta.env.VITE_API_URL;

type Props = {};

export default function VistaLogIn({ }: Props) {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

    const Autenticar = async () => {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mail, password }),
        });

        if (response.status === 200) {
            setMensaje("User logged");
            const data = await response.json();
            if (data) {
                localStorage.clear();
                localStorage.setItem('userId', data);
                navigate("/VistaTodosJuegos");
            }
        } else if (response.status === 404) {
            setMensaje("mail not found. ERROR " + response.status);
        } else if (response.status === 401) {
            setMensaje("Incorrect Password. ERROR " + response.status);
        } else {
            setMensaje("Unexpected error. ERROR " + response.status);
        }
    };

    const RedirigirSignIn = () => {
        navigate("/SignIn");
    };

    // 3. Manejo de login Google
    const onGoogleSuccess = async (credentialResponse: any) => {
        try {
            const response = await fetch(`${API_URL}/auth/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ credential: credentialResponse.credential }),
            });

            if (response.status === 200) {
                const data = await response.json();
                localStorage.clear();
                localStorage.setItem('mi_jwt', data.token); // Suponiendo que devuelves el userId
                // Si devuelves un JWT, puedes guardar data.token
                navigate("/VistaTodosJuegos");
            } else {
                setMensaje("No se pudo iniciar sesión con Google.");
            }
        } catch (error) {
            setMensaje("Error al conectar con el backend.");
        }
    };

    const onGoogleError = () => {
        setMensaje("Fallo el login con Google.");
    };

    return (
        // 4. GoogleOAuthProvider debe envolver el login para el contexto:
        <GoogleOAuthProvider clientId="248141265838-c86ptjkolt2bp9h7sargs500kg0coitq.apps.googleusercontent.com">
            <>
                <label htmlFor="email">Mail:</label><br />
                <input type="text" id="emailInput" placeholder="Mail" onChange={e => setMail(e.target.value)} />
                <br />
                <label htmlFor="password">Contraseña:</label><br />
                <input type="password" id="passwordInput" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} />
                <br />
                <br />
                <button className="btn btn-primary" onClick={Autenticar} >Ingresar</button>

                <br /><br />

                {/* 5. Botón de Google Login aquí */}
                <GoogleLogin
                    onSuccess={onGoogleSuccess}
                    onError={onGoogleError}
                />

                <br />
                <label>No tenes cuenta?</label>
                <button className="btn btn-success" onClick={RedirigirSignIn}>Registrarse</button>
                <div className="alert alert-danger" role="alert">
                    {mensaje}
                </div>
            </>
        </GoogleOAuthProvider>
    );
}