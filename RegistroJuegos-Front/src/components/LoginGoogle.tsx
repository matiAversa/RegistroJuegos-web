import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const LoginGoogle = () => {
    const navigate = useNavigate();

    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
                fetch(`${apiUrl}/auth/google`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ credential: credentialResponse.credential }),
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem("token", data.token);
                        navigate("/");
                    });
            }}
            onError={() => {
                alert("Fallo login Google");
            }}
        />
    );
};

export default LoginGoogle;