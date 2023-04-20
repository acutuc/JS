
import React, { useState } from 'react';
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Toast,
    ToastHeader,
    ToastBody,
    Input,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Label,
    ModalFooter
} from 'reactstrap';
import { FARMACOS } from './Farmacos';
import Ventana from './Ventana';
import axios from 'axios';

function Gestion(props) {
    const [open, setOpen] = useState('1');
    const [medicamentos, setMedicamentos] = useState([]);
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };

    /*function clicar() {
        axios.post(FARMACOS, JSON.stringify({

        }))
    }*/

    return (
        <div>
            <Accordion open={open} toggle={toggle}>
                <AccordionItem>
                    <AccordionHeader targetId="1">GESTIÓN DE FÁRMACOS</AccordionHeader>
                    <AccordionBody accordionId="1">
                        <div className="d-flex justify-content-between">
                            <div className="p-3 bg-info my-2 rounded">
                                <Toast>
                                    <ToastHeader>
                                        Incluir X medicamentos:
                                    </ToastHeader>
                                    <ToastBody>
                                        <Input type='textarea'>{props.medicamentos}</Input>
                                        <div className='d-flex justify-content-center p-3'>
                                            <Ventana color="info"/>&nbsp;
                                            <Button color="info">Borrar</Button>
                                        </div>
                                    </ToastBody>
                                </Toast>
                            </div>
                            <div className="p-3 bg-danger my-2 rounded">
                                <Toast>
                                    <ToastHeader>
                                        Excluir X medicamentos:
                                    </ToastHeader>
                                    <ToastBody>
                                        <Input type='textarea'>{ }</Input>
                                        <div className='d-flex justify-content-center p-3'>
                                            <Ventana color="danger"/>&nbsp;
                                            <Button color="danger">Borrar</Button>
                                        </div>
                                    </ToastBody>
                                </Toast>
                            </div>
                        </div>

                    </AccordionBody>
                </AccordionItem>
            </Accordion>
            
        </div>
    );
}

export default Gestion;