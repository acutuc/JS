import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Col } from 'reactstrap';
import { FARMACOS } from './Farmacos';

function Ventana(props) {
  const [modal, setModal] = useState(false);

  const [farmaco, setFarmaco] = useState("");

  const [farmacosFiltrados, setFarmacosFiltrados] = useState([]);

  const toggle = () => setModal(!modal);

  const handleChange = (event) => {
    if (event.target.name === "farmaco") {
      const texto = event.target.value.toLowerCase();
      const filtrados = FARMACOS.filter((f) =>
        f.codATC.toLowerCase().includes(texto) ||
        f.descATC.toLowerCase().includes(texto)
      );
      setFarmaco(texto);
      setFarmacosFiltrados(filtrados);
    }
    if (event.target.name === "select") {
      setFarmaco(event.target.value);
    }
  }

  const handleSubmit = (event) => {
    let codigo = "";
    for (let i = 0; i < farmaco.length; i++) {
      if (farmaco[i] === "|") {
        break;
      }
      codigo += farmaco[i];
    }
    if (event.target.name === "incluir") {
      props.anadirMedicamentoIncluido(codigo);
      setModal(!modal);
    } else {
      props.anadirMedicamentoExcluido(codigo);
      setModal(!modal);
    }
  };

  return (
    <div>
      <Button color={props.color} onClick={toggle}>
        Agregar
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add FÁRMACOS</ModalHeader>
        <ModalBody>
          <div className='d-flex align-items-center'>
            <Label for=''>Filtrar: </Label>&nbsp;
            <Input
              type='text'
              name='farmaco'
              onChange={handleChange}
            />
          </div>
          <div className='p-2'>
            <FormGroup row>
              <Col sm={10}>
                <Input
                  id="exampleSelect"
                  name="select"
                  type="select"
                  onChange={handleChange}
                >
                  {farmacosFiltrados.length > 0 ?
                    farmacosFiltrados.map((e) => {
                      return <option key={e.codATC}>{e.codATC}|{e.descATC}</option>;
                    }) :
                    FARMACOS.map(e => {
                      return <option key={e.codATC}>{e.codATC}|{e.descATC}</option>
                    })
                  }
                </Input>
              </Col>
            </FormGroup>
          </div>


        </ModalBody>
        <ModalFooter>
          <Label>{farmaco}</Label>
          <Button color="primary" name={props.nombre} onClick={handleSubmit}>
            Añadir
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Ventana;