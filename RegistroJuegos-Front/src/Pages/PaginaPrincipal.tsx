import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import { useAuth } from "../context/AuthContext";


type Props = {};

export default function PaginaPrincipal({ }: Props) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return null;


    return (
        <Layout>
            <h1>Bienvenido</h1>
            <p>Has iniciado sesión correctamente.</p>
        </Layout>
    );
}