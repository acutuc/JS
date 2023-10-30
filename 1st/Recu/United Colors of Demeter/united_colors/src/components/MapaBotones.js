import { Button } from 'reactstrap';

const MapaBotones = (props) => {
    let lista = [];
    for (let i = 0; i < props.listaBotones.length; i++) {
        let lista2 = [];

        for (let j = 0; j < props.listaBotones.length; j++) {
            lista2.push(<Button
                key={i * 10 + j}
                color={props.listaBotones[i][j].color}
                onClick={() => props.pulsado(i, j)}
            />)
        }
        lista.push(
            <>
                {lista2}<br />
            </>
        )
    }
    return (
        <>
            {lista}
        </>
    )
}

export default MapaBotones;