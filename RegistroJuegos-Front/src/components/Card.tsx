import { Fragment, ReactNode } from "react";

interface CardProps {
    children: ReactNode
}

function Card(props: CardProps) {
    const { children } = props
    const width = {
        width: "350px",
    };

    return (
        <div className="card" style={width}>
            <div className="card-body">
                {children}
            </div>
        </div>
    );
}

interface CardBodyProps {
    titulo: String
    cuerpo: String
    textoBoton: String
    direccion: string
    esEnlaceExterno?: boolean
}

function CardBody(props: CardBodyProps) {
    const { titulo, cuerpo, textoBoton, direccion, esEnlaceExterno = false } = props;
    return (
        <Fragment>
            <h5 className="card-title">{titulo}</h5>
            <p className="card-text">{cuerpo}</p>
            <a
                href={direccion}
                className="btn btn-primary"
                {...(esEnlaceExterno && { target: "_blank", rel: "noopener noreferrer" })}
            >
                {textoBoton}
            </a>
        </Fragment>
    );
}

export default Card;
export { CardBody };