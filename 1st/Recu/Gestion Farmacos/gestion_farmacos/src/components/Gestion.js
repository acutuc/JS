
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
} from 'reactstrap';
import { FARMACOS } from './Farmacos';
import Ventana from './Ventana';
import axios from 'axios';

function Gestion(props) {
    const [open, setOpen] = useState('1');

    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };

    const borrarMedicamentosIncluidos = () => {
        props.eliminarMedicamentosIncluidos();
    }

    const borrarMedicamentosExcluidos = () => {
        props.eliminarMedicamentosExcluidos();
    }

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
                                        <Input type='textarea' value={props.medicamentosIncluidos}></Input>
                                        <div className='d-flex justify-content-center p-3'>
                                            <Ventana color="info" nombre={"incluir"} medicamentosIncluidos={props.medicamentosIncluidos} anadirMedicamentoIncluido={(medicamento) => props.anadirMedicamentoIncluido(medicamento)} />&nbsp;
                                            <Button color="info" onClick={() => borrarMedicamentosIncluidos()} >Borrar</Button>
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
                                        <Input type='textarea' value={props.medicamentosExcluidos}></Input>
                                        <div className='d-flex justify-content-center p-3'>
                                            <Ventana color="danger" nombre={"excluir"} medicamentosExcluidos={props.medicamentosExcluidos} anadirMedicamentoExcluido={(medicamento) => props.anadirMedicamentoExcluido(medicamento)} />&nbsp;
                                            <Button color="danger" onClick={() => borrarMedicamentosExcluidos()}>Borrar</Button>
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