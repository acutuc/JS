import { useState } from "react";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Input, Toast, ToastBody, ToastHeader, Button } from "reactstrap";
import Ventana from "./Ventana";

function GestionAlmacen(props) {
    const [open, setOpen] = useState('1');

    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };

    return (
        <div>
            <Accordion open={open} toggle={toggle}>
                <AccordionItem>
                    <AccordionHeader targetId="1">Configura tu menú</AccordionHeader>
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
                                            <Ventana color="info" />&nbsp;
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
                                        <Input type='textarea' value={props.medicamentosExcluidos}></Input>
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

export default GestionAlmacen;