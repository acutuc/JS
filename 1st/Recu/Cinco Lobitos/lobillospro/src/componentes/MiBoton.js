import { Button } from 'reactstrap';

const MiBoton = (props) => {
    return (
        <>
            <Button color={props.colores} onClick={() => props.suma()}>{props.pulsaciones}</Button>
        </>
    )
}

export default MiBoton;