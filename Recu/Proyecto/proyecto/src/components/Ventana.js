import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Col } from 'reactstrap';

function Ventana(props) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

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
                                </Input>
                            </Col>
                        </FormGroup>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Label></Label>
                    <Button color="primary" onClick={toggle}>
                        Añadir
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Ventana;