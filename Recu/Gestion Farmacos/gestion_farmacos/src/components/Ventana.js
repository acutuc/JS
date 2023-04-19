import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Col } from 'reactstrap';
import { FARMACOS } from './Farmacos';

function Ventana(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleChange = (event) =>{
    if(event.target.name === "farmaco"){
      console.log(event.target.value);
    }
  }

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
              >
                {FARMACOS.map(e => {
                  return <option>{e.codATC}|{e.descATC}</option>
                })}
              </Input>
            </Col>
          </FormGroup>
          </div>
          

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Añadir
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Ventana;