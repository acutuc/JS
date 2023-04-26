import { Button } from 'reactstrap';

const Boton = (props) => {
    return (
    <Button
      onClick={props.onClick}
      style={{ margin: 2 + "px" }}
      color={props.color}
    >
      &nbsp;&nbsp;&nbsp;&nbsp;
    </Button>
  );
}

export default Boton;