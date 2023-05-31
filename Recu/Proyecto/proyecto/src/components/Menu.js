import React, { useState, useEffect } from 'react';
import {
    Row, Col, Form, FormGroup, Label, Input, Button, Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem
} from 'reactstrap';
import axios from 'axios';

export default function Menu(props) {
    const [selectedItems, setSelectedItems] = useState([]);
    const [cantidadOpciones, setCantidadOpciones] = useState({});
    const [cantidadComensales, setCantidadComensales] = useState(1);
    const [precioTotal, setPrecioTotal] = useState(0);
    const [filtroPrimerPlato, setFiltroPrimerPlato] = useState('');
    const [filtroSegundoPlato, setFiltroSegundoPlato] = useState('');
    const [filtroPostre, setFiltroPostre] = useState('');

    const [open, setOpen] = useState('1');
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };


    useEffect(() => {
        console.log('Productos actualizados:', props.productos);

        const opciones = {};
        props.productos.forEach(producto => {
            opciones[producto.id_producto] = Array.from(
                { length: producto.cantidad },
                (_, i) => (i + 1).toString()
            );
        });
        setCantidadOpciones(opciones);
    }, [props.productos]);

    const handleCheckboxChange = (event, producto) => {
        const { checked } = event.target;
        if (checked) {
            setSelectedItems(prevItems => [
                ...prevItems,
                { plato: producto.nombre_producto, cantidad: 1 },
            ]);
        } else {
            setSelectedItems(prevItems =>
                prevItems.filter(item => item.plato !== producto.nombre_producto)
            );
        }
    };

    const handleCantidadChange = (producto, value) => {
        const updatedItems = [...selectedItems];
        const selectedItem = updatedItems.find(item => item.plato === producto.nombre_producto);
        if (selectedItem) {
            selectedItem.cantidad = parseInt(value);
            setSelectedItems(updatedItems);
        }
    };

    const addNewItem = async () => {
        try {
            const updatedProducts = props.productos.map(producto => {
                const selectedItem = selectedItems.find(item => item.plato === producto.nombre_producto);
                if (selectedItem) {
                    return {
                        id_producto: producto.id_producto,
                        cantidad: selectedItem.cantidad,
                        consumido: selectedItem.consumido - selectedItem.cantidad
                    };
                }
                return null;
            }).filter(Boolean);

            await axios.put('http://localhost/PHP/REACT/servicios_rest/actualizarProductos', { productos: updatedProducts });
            console.log('Datos de productos actualizados correctamente');

            setSelectedItems([]);

            const opciones = {};
            props.productos.forEach(producto => {
                const selectedItem = selectedItems.find(item => item.plato === producto.nombre_producto);
                if (selectedItem) {
                    opciones[producto.id_producto] = Array.from(
                        { length: producto.cantidad - selectedItem.cantidad },
                        (_, i) => (i + 1).toString()
                    );
                } else {
                    opciones[producto.id_producto] = Array.from(
                        { length: producto.cantidad },
                        (_, i) => (i + 1).toString()
                    );
                }
            });
            setCantidadOpciones(opciones);

            // Calcular el precio total y el precio por comensal después de actualizar los estados
            const total = updatedProducts.reduce((acc, item) => {
                const producto = props.productos.find(p => p.id_producto === item.id_producto);
                return acc + producto.precio_unitario * item.cantidad;
            }, 0);
            setPrecioTotal(total);
        } catch (error) {
            console.error('Error al actualizar los datos de los productos:', error);
        }
    };

    const disableAddButton = selectedItems.length === 0;

    const sortedProductosPrimerPlato = props.productos
        .slice()
        .filter(producto =>
            producto.nombre_producto.toLowerCase().includes(filtroPrimerPlato.toLowerCase())
        )
        .sort((a, b) => {
            if (a.nombre_producto < b.nombre_producto) {
                return -1;
            }
            if (a.nombre_producto > b.nombre_producto) {
                return 1;
            }
            return 0;
        });

    const sortedProductosSegundoPlato = props.productos
        .slice()
        .filter(producto =>
            producto.nombre_producto.toLowerCase().includes(filtroSegundoPlato.toLowerCase())
        )
        .sort((a, b) => {
            if (a.nombre_producto < b.nombre_producto) {
                return -1;
            }
            if (a.nombre_producto > b.nombre_producto) {
                return 1;
            }
            return 0;
        });

    const sortedProductosPostre = props.productos
        .slice()
        .filter(producto =>
            producto.nombre_producto.toLowerCase().includes(filtroPostre.toLowerCase())
        )
        .sort((a, b) => {
            if (a.nombre_producto < b.nombre_producto) {
                return -1;
            }
            if (a.nombre_producto > b.nombre_producto) {
                return 1;
            }
            return 0;
        });

    return (
        <Row>
            <Col sm="3"></Col>
            <Col sm="6">
                <Form inline>
                    <Accordion open={open} toggle={toggle}>
                        <AccordionItem>
                            <AccordionHeader targetId="1">Primer plato</AccordionHeader>
                            <AccordionBody accordionId="1">
                                <FormGroup>
                                    <Label for="filtroPrimerPlato">Filtrar primer plato:</Label>
                                    <Input
                                        type="text"
                                        id="filtroPrimerPlato"
                                        value={filtroPrimerPlato}
                                        onChange={e => setFiltroPrimerPlato(e.target.value)}
                                    />
                                </FormGroup>
                                {sortedProductosPrimerPlato.map((producto, index) => (
                                    <FormGroup className="d-flex align-items-center" key={producto.id_producto}>
                                        <Label className="me-sm-6" check>
                                            <Input
                                                type="checkbox"
                                                checked={selectedItems.some(item => item.plato === producto.nombre_producto)}
                                                onChange={e => handleCheckboxChange(e, producto)}
                                            />{' '}
                                            {producto.nombre_producto}
                                        </Label>
                                        &nbsp;
                                        <Col xs='2'>
                                            <Input
                                                type="select"
                                                value={selectedItems.find(item => item.plato === producto.nombre_producto)?.cantidad || ''}
                                                onChange={e => handleCantidadChange(producto, e.target.value)}
                                                disabled={!selectedItems.some(item => item.plato === producto.nombre_producto)}
                                            >
                                                <option value="">Seleccionar</option>
                                                {cantidadOpciones[producto.id_producto]?.map(option => (
                                                    <option key={option}>{option}</option>
                                                ))}
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                ))}
                            </AccordionBody>
                        </AccordionItem>
                    </Accordion>

                    <Accordion open={open} toggle={toggle}>
                        <AccordionItem>
                            <AccordionHeader targetId="2">Segundo plato</AccordionHeader>
                            <AccordionBody accordionId='2'>
                                <FormGroup>
                                    <Label for="filtroSegundoPlato">Filtrar segundo plato:</Label>
                                    <Input
                                        type="text"
                                        id="filtroSegundoPlato"
                                        value={filtroSegundoPlato}
                                        onChange={e => setFiltroSegundoPlato(e.target.value)}
                                    />
                                </FormGroup>
                                {sortedProductosSegundoPlato.map((producto, index) => (
                                    <FormGroup className="d-flex align-items-center" key={producto.id_producto}>
                                        <Label className="me-sm-6" check>
                                            <Input
                                                type="checkbox"
                                                checked={selectedItems.some(item => item.plato === producto.nombre_producto)}
                                                onChange={e => handleCheckboxChange(e, producto)}
                                            />{' '}
                                            {producto.nombre_producto}
                                        </Label>
                                        &nbsp;
                                        <Col xs='2'>
                                            <Input
                                                type="select"
                                                value={selectedItems.find(item => item.plato === producto.nombre_producto)?.cantidad || ''}
                                                onChange={e => handleCantidadChange(producto, e.target.value)}
                                                disabled={!selectedItems.some(item => item.plato === producto.nombre_producto)}
                                            >
                                                <option value="">Seleccionar</option>
                                                {cantidadOpciones[producto.id_producto]?.map(option => (
                                                    <option key={option}>{option}</option>
                                                ))}
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                ))}
                            </AccordionBody>
                        </AccordionItem>
                    </Accordion>

                    <Accordion open={open} toggle={toggle}>
                        <AccordionItem>
                            <AccordionHeader targetId='3'>Postre</AccordionHeader>
                            <AccordionBody accordionId='3'>
                                <FormGroup>
                                    <Label for="filtroPostre">Filtrar postre:</Label>
                                    <Input
                                        type="text"
                                        id="filtroPostre"
                                        value={filtroPostre}
                                        onChange={e => setFiltroPostre(e.target.value)}
                                    />
                                </FormGroup>
                                {sortedProductosPostre.map((producto, index) => (
                                    <FormGroup className="d-flex align-items-center" key={producto.id_producto}>
                                        <Label className="me-sm-6" check>
                                            <Input
                                                type="checkbox"
                                                checked={selectedItems.some(item => item.plato === producto.nombre_producto)}
                                                onChange={e => handleCheckboxChange(e, producto)}
                                            />{' '}
                                            {producto.nombre_producto}
                                        </Label>
                                        &nbsp;
                                        <Col xs='2'>
                                            <Input
                                                type="select"
                                                value={selectedItems.find(item => item.plato === producto.nombre_producto)?.cantidad || ''}
                                                onChange={e => handleCantidadChange(producto, e.target.value)}
                                                disabled={!selectedItems.some(item => item.plato === producto.nombre_producto)}
                                            >
                                                <option value="">Seleccionar</option>
                                                {cantidadOpciones[producto.id_producto]?.map(option => (
                                                    <option key={option}>{option}</option>
                                                ))}
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                ))}
                            </AccordionBody>
                        </AccordionItem>
                    </Accordion>

                    <FormGroup>
                        <Label for="cantidadComensales">Cantidad de comensales:</Label>
                        <Input
                            type="number"
                            id="cantidadComensales"
                            value={cantidadComensales}
                            onChange={e => setCantidadComensales(parseInt(e.target.value))}
                        />
                    </FormGroup>
                    <Button color="primary" onClick={addNewItem} disabled={disableAddButton}>
                        Reservar pedido
                    </Button>
                    <div>
                        <strong>Precio total:</strong> {precioTotal} €<br />
                        <strong>Precio por comensal:</strong> {precioTotal / cantidadComensales} €
                    </div>
                </Form>
            </Col>
        </Row>
    );
}