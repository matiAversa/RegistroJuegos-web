import { useState } from "react";

type Props = { lista: string[]; }

function List({ lista }: Props) {
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <ul className="list-group">
            {lista.map((elemento) => (
                <li
                    key={elemento}
                    className={`list-group-item list-group-item-action${selected === elemento ? ' list-group-item-success' : ''}`}
                    onClick={() => setSelected(elemento)}
                    style={{ cursor: "pointer" }}
                >
                    {elemento}
                </li>
            ))}
        </ul>
    );
}


export default List
