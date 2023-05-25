import React, { useState } from 'react';
import { Row, Col, Form, FormGroup, Button, Label, Input, Table } from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default function Almacen(props) {
    //Primer plato:
    const [primerPlato, setPrimerPlato] = useState([]);
    const [cantidadPrimerPlato, setCantidadPrimerPlato] = useState()

    //Segundo plato:
    const [segundoPlato, setSegundoPlato] = useState([]);
    const [cantidadSegundoPlato, setCantidadSegundoPlato] = useState();

    //Postre:
    const [postre, setPostre] = useState([]);
    const [cantidadPostre, setCantidadPostre] = useState();

    //Productos:
    const [productos, setProductos] = useState(props.productos);

    return (
        <Row>
            <Col sm="3"></Col>
            <Col sm="6">
                <Form inline >
                    <FormGroup className="d-flex align-items-center">
                        <Label className="me-sm-6" for="primer_plato">Primer plato:</Label>
                        <Input
                            id='primer_plato'
                            name='primer_plato'
                            type="select"
                        >
                            {productos.map(element => {
                                return <option>{element.nombre_producto}</option>
                            })}
                        </Input>
                        &nbsp;
                        <Col xs='2'>
                            <Input
                                id='cantidad_primer_plato'
                                name='cantidad_primer_plato'
                                type='select'
                            >
                                {productos.map(element => {
                                    return <option></option>
                                })}
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup className="d-flex align-items-center">
                        <Label className="me-sm-2" for="segundo_plato">Segundo plato:</Label>
                        <Input
                            id='segundo_plato'
                            name='segundo_plato'
                            type="select"
                        >
                            {productos.map(element => {
                                return <option>{element.nombre_producto}</option>
                            })}
                        </Input>
                        &nbsp;
                        <Col xs='2'>
                            <Input
                                id='cantidad_segundo_plato'
                                name='cantidad_segundo_plato'
                                type='select'
                            >
                                {productos.map(element => {
                                    return <option></option>
                                })}
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup className="d-flex align-items-center">
                        <Label className="me-sm-2" for="postre">Primer plato:</Label>
                        <Input
                            id='postre'
                            name='postre'
                            type="select"
                        >
                            {productos.map(element => {
                                return <option>{element.nombre_producto}</option>
                            })}
                        </Input>
                        &nbsp;
                        <Col xs='2'>
                            <Input
                                id='cantidad_postre'
                                name='cantidad_postre'
                                type='select'
                            >
                                {productos.map(element => {
                                    return <option></option>
                                })}
                            </Input>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
        </Row>
    );
}