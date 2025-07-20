import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {}

export default function VistaSingIn({ }: Props) {

    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, setUser] = useState("");
    const [mensaje, setMensaje] = useState("");

    const navigate = useNavigate();

    const validarDatos = () => {
        let ok: boolean = false;
        if (mail.trim()) {
            setMensaje("El mail no puede estar vacio.")
        } else {
            if (password.trim()) {
                setMensaje("La contraseña no puede estar vacia.")
            } else {
                if (user.trim()) {
                    setMensaje("El usuario no debe estar vacio.")
                } else {
                    if (name.trim()) {
                        setMensaje("El nombre no debe estar vacio.")
                    } else {
                        ok = true;
                    }
                }
            }
        }
        if (ok) {

            if (!mail.includes("@") || !mail.includes(".")) {
                setMensaje("Se debe ingresar un mail valido.");
            } else {
                if (password.length < 6) {
                    setMensaje("La contraseña debe contener por lo menos 6 caracteres.");
                } else {
                    if (user.length < 4) {
                        setMensaje("El usuario debe contener por lo menos 4 caracteres.");
                    } else {
                        Registrar();
                        navigate("/")
                    }
                }
            }
        }
    }

    const Registrar = async () => {

        const response = await fetch("http://localhost:8080/api/SignIn", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mail, password }),
        });

        if (response.status === 204) {
            navigate("/");
        } else {
            if (response.status === 401) {
                setMensaje("El mail ingresado ya esta registrado.");
            } else {
                if (response.status === 500) {
                    console.log("INTERNAL ERROR 500");
                }
            }
        }


    }

    const RedirigirLogIn = () => {
        navigate("/");
    }



    return (

        <>

            <label htmlFor="mail">ingrese su Mail:</label> <br />
            <input type="text" id="mailInput" placeholder="Mail" onChange={e => setMail(e.target.value)} /><br />

            <label htmlFor="mail">ingrese su Contraseña:</label> <br />
            <input type="text" id="mailInput" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} /><br /><br />

            <button className="btn btn-success" onClick={validarDatos}>Registrarse.</button><br />
            <label htmlFor="mail">Ya tenes cuenta?</label>
            <button className="btn btn-primary" onClick={RedirigirLogIn}>Iniciar Sesion.</button><br />
            <div className="alert alert-danger" role="alert">
                {mensaje}
            </div>
        </>
    );

}