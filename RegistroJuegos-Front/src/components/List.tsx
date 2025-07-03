type Props = { lista: string[]; }

function List({ lista }: Props) {
    return (
        <ul className="list-group">

            {lista.map((elemento) => <li key={elemento} className="list-group-item">{elemento} </li>)}

        </ul>
    )
}
export default List

function imprimir() {
    console.log("holamundo");
}