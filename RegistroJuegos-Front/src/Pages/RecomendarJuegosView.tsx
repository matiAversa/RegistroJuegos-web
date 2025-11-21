import Layout from "../components/layout";
import RecomendarJuegos from "../components/RecomendarJuegos";

function RecomendarJuegosView() {

    return (
        <>
            <Layout>
                <p>Recomienda juegos para integrar en la aplicacion: </p>
                <RecomendarJuegos></RecomendarJuegos>
            </Layout>
        </>
    );
}

export default RecomendarJuegosView;