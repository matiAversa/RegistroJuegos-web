import { GoogleLogin } from '@react-oauth/google';
const apiUrl = import.meta.env.VITE_API_URL;

const LoginGoogle = () => (

    <GoogleLogin
        onSuccess={credentialResponse => {
            // Enviar credentialResponse.credential a tu backend!
            fetch("${apiUrl}/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ credential: credentialResponse.credential })
            })
                .then(res => res.json())
                .then(data => {
                    // Guardar token, etc
                    localStorage.setItem("token", data.token);
                    // Redirecciona a app, etc
                });
        }}
        onError={() => {
            alert("Fallo login Google");
        }}
    />
);

// En el toplevel de tu app:
import { GoogleOAuthProvider } from '@react-oauth/google';

<GoogleOAuthProvider clientId="TU_CLIENT_ID">
    <LoginGoogle />
</GoogleOAuthProvider>