import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

type Props = {}

export default function VistaSingIn({ }: Props) {

    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const { login, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        logout();
    }, []);

    const validarDatos = () => {
        setMensaje("");
        let ok: boolean = false;
        if (mail.length == 0) {
            setMensaje("El mail no puede estar vacio.")
        } else {
            if (password.length == 0) {
                setMensaje("La contraseña no puede estar vacia.")
            } else {
                ok = true;
            }
        }
        if (ok) {

            if (!mail.includes("@") || !mail.includes(".")) {
                setMensaje("Se debe ingresar un mail valido.");
            } else {
                if (password.length < 6) {
                    setMensaje("La contraseña debe contener por lo menos 6 caracteres.");
                } else {
                    Registrar();
                }
            }
        }
    }

    const Registrar = async () => {

        const response = await fetch('${API_URL}/SignIn', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mail, password }),
        })
            .then(response =>
                response.json().then(data => ({
                    status: response.status,
                    data
                }))
            )
            .then(({ status, data }) => {
                if (status === 200) {
                    localStorage.setItem("token", data.token);
                    login();
                    navigate("/");
                } else if (status === 409) {
                    setMensaje("El mail ingresado ya esta registrado.");
                } else if (status === 500) {
                    console.log('INTERNAL ERROR 500');
                }
            });
    }

    const RedirigirLogIn = () => {
        navigate("/Login");
    }

    // --- Botón Google register ---
    const handleGoogleRegister = (credentialResponse: any) => {
        fetch(`${API_URL}/auth/google-register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ credential: credentialResponse.credential }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    login();
                    navigate("/");
                } else {
                    setMensaje(data.error || "Error desconocido durante registro con Google");
                }
            })
            .catch(() => {
                setMensaje("Error en red al intentar registro con Google");
            });
    };
    // -----------------------------

    return (

        <>

            <label htmlFor="mail">ingrese su Mail:</label> <br />
            <input type="text" id="mailInput" placeholder="Mail" onChange={e => setMail(e.target.value)} /><br />

            <label htmlFor="mail">ingrese su Contraseña:</label> <br />
            <input type="text" id="mailInput" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} /><br /><br />

            <button className="btn btn-success" onClick={validarDatos}>Registrarse.</button><br />

            {/* Aquí se agrega el botón de Google Register */}
            <div style={{ margin: "20px 0" }}>
                <GoogleLogin
                    onSuccess={handleGoogleRegister}
                    onError={() => setMensaje("Fallo registro Google")}
                    useOneTap={false}
                    text="signup_with"
                />
            </div>
            {/* Fin botón Google */}

            <label htmlFor="mail">Ya tenes cuenta?</label>
            <button className="btn btn-primary" onClick={RedirigirLogIn}>Iniciar Sesion.</button><br />
            <div className="alert alert-danger" role="alert">
                {mensaje}
            </div>
        </>
    );

}