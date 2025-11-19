import React, { useEffect } from "react";

const googleClientId = "248141265838-c86ptjkolt2bp9h7sargs500kg0coitq.apps.googleusercontent.com"; // Tu Client ID de Google
const apiUrl = import.meta.env.VITE_API_URL;

// Tipos para las props del componente
interface GoogleRegisterButtonProps {
    onRegister?: (response: any) => void;
}

declare global {
    interface Window {
        google?: any;
    }
}

export const GoogleRegisterButton: React.FC<GoogleRegisterButtonProps> = ({ onRegister }) => {
    useEffect(() => {
        // Carga el script solo si no está presente
        if (!window.google) {
            const script = document.createElement("script");
            script.src = "https://accounts.google.com/gsi/client";
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
            script.onload = renderButton;
        } else {
            renderButton();
        }

        function renderButton() {
            if (window.google && document.getElementById("g_id_onload") === null) {
                window.google.accounts.id.initialize({
                    client_id: googleClientId,
                    callback: handleRegister,
                });
                window.google.accounts.id.renderButton(
                    document.getElementById("google-register-btn"),
                    { theme: "outline", size: "large", text: "signup_with", type: "standard" }
                );
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRegister = (response: { credential: string }) => {
        fetch(`${apiUrl}/auth/google-register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ credential: response.credential }),
        })
            .then(res => res.json())
            .then(data => {
                if (onRegister) onRegister(data);
                else alert(data.token ? `Registro exitoso!\nToken: ${data.token}` : data.error);
            })
            .catch(error => {
                alert("Error en la solicitud: " + error);
            });
    };

    return (
        <div>
            <div id="google-register-btn"></div>
        </div>
    );
};

export default GoogleRegisterButton;