import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";

type Props = {};

export default function PaginaPrincipal({ }: Props) {
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('mi_jwt');
        console.log(userId)
        if (!userId) {
            navigate("/LogIn", { replace: true });
        }
    }, [navigate]);

    return (
        <Layout>
            {localStorage.getItem('userId') && <h2>Bienvenido</h2>}
        </Layout>
    );
}