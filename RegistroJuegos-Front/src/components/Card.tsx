import { Fragment, ReactNode } from "react";

interface CardProps {
    children: ReactNode
    Width: number
    Height: number
}

function Card(props: CardProps) {
    const { Width, Height, children } = props
    const Estilo = {
        width: Width + "px",
        height: Height + "px",
        position: "absolute" as const,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    };

    return (
        <div className="card" style={Estilo}>
            <div className="card-body">
                {children}
            </div>
        </div>
    );
}

export default Card;
