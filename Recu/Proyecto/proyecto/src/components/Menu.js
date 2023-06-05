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
    const [nombrePrimerPlato, setNombrePrimerPlato] = useState('');
    const [nombreSegundoPlato, setNombreSegundoPlato] = useState('');
    const [nombrePostre, setNombrePostre] = useState('');

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
        //Mostramos solamente los productos de cantidad mayor a 0
        props.productos
            .filter(producto => producto.cantidad > 0)
            .forEach(producto => {
                opciones[producto.id_producto] = Array.from(
                    { length: producto.cantidad },
                    (_, i) => (i + 1).toString()
                );
            });
        setCantidadOpciones(opciones);
    }, [props.productos]);

    useEffect(() => {
        // Calcular el precio total y el precio por comensal después de actualizar los estados
        const total = selectedItems.reduce((acc, item) => {
            const producto = props.productos.find(p => p.nombre_producto === item.plato);
            return acc + producto.precio_unitario * item.cantidad;
        }, 0);
        setPrecioTotal(total);
    }, [selectedItems]);

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

    const handleChange = (event) => {
        if (event.target.name === "nombre_primer_plato") {
            setNombrePrimerPlato(event.target.value)
        }
        if (event.target.name === "nombre_segundo_plato") {
            setNombreSegundoPlato(event.target.value)
        }
        if (event.target.name === "nombre_postre") {
            console.log(event.target.value)
            setNombrePostre(event.target.value)
        }
    }

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
        .reduce((accumulator, producto) => {
            const existingProduct = accumulator.find(
                p => p.nombre_producto === producto.nombre_producto
            );
            if (existingProduct) {
                const existingFechaRecepcion = parseInt(existingProduct.fecha_recepcion);
                const currentFechaRecepcion = parseInt(producto.fecha_recepcion);
                if (currentFechaRecepcion < existingFechaRecepcion) {
                    // Replace the existing product with the current one if it has an older fecha_recepcion
                    return [
                        ...accumulator.filter(p => p.nombre_producto !== producto.nombre_producto),
                        producto
                    ];
                } else {
                    // Keep the existing product if it has an older fecha_recepcion
                    return accumulator;
                }
            } else {
                // Add the current product if it doesn't exist in the accumulator
                return [...accumulator, producto];
            }
        }, [])
        .filter(producto => producto.cantidad > 0)
        .sort((a, b) => a.nombre_producto.localeCompare(b.nombre_producto));

        const sortedProductosSegundoPlato = props.productos
        .slice()
        .filter(producto =>
            producto.nombre_producto.toLowerCase().includes(filtroSegundoPlato.toLowerCase())
        )
        .reduce((accumulator, producto) => {
            const existingProduct = accumulator.find(
                p => p.nombre_producto === producto.nombre_producto
            );
            if (existingProduct) {
                const existingFechaRecepcion = parseInt(existingProduct.fecha_recepcion);
                const currentFechaRecepcion = parseInt(producto.fecha_recepcion);
                if (currentFechaRecepcion < existingFechaRecepcion) {
                    // Replace the existing product with the current one if it has an older fecha_recepcion
                    return [
                        ...accumulator.filter(p => p.nombre_producto !== producto.nombre_producto),
                        producto
                    ];
                } else {
                    // Keep the existing product if it has an older fecha_recepcion
                    return accumulator;
                }
            } else {
                // Add the current product if it doesn't exist in the accumulator
                return [...accumulator, producto];
            }
        }, [])
        .filter(producto => producto.cantidad > 0)
        .sort((a, b) => a.nombre_producto.localeCompare(b.nombre_producto));

        const sortedProductosPostre = props.productos
        .slice()
        .filter(producto =>
            producto.nombre_producto.toLowerCase().includes(filtroPostre.toLowerCase())
        )
        .reduce((accumulator, producto) => {
            const existingProduct = accumulator.find(
                p => p.nombre_producto === producto.nombre_producto
            );
            if (existingProduct) {
                const existingFechaRecepcion = parseInt(existingProduct.fecha_recepcion);
                const currentFechaRecepcion = parseInt(producto.fecha_recepcion);
                if (currentFechaRecepcion < existingFechaRecepcion) {
                    return [
                        ...accumulator.filter(p => p.nombre_producto !== producto.nombre_producto),
                        producto
                    ];
                } else {
                    return accumulator;
                }
            } else {
                return [...accumulator, producto];
            }
        }, [])
        .filter(producto => producto.cantidad > 0)
        .sort((a, b) => a.nombre_producto.localeCompare(b.nombre_producto));

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
                                    <Label for='nombre_primer_plato'>Introduzca su primer plato: </Label>
                                    <Input
                                        type="text"
                                        name="nombre_primer_plato"
                                        id="nombre_primer_plato"
                                        onChange={handleChange}
                                    >

                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="filtroPrimerPlato">Filtrar ingredientes para el primer plato:</Label>
                                    <Input
                                        type="text"
                                        id="filtroPrimerPlato"
                                        value={filtroPrimerPlato}
                                        onChange={e => setFiltroPrimerPlato(e.target.value)}
                                    />
                                </FormGroup>
                                {sortedProductosPrimerPlato.filter(producto => producto.cantidad > 0).map((producto, index) => (
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
                                        <Col xs='4'>
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
                                ç<FormGroup>
                                    <Label for='nombre_segundo_plato'>Introduzca su segundo plato: </Label>
                                    <Input
                                        type="text"
                                        name="nombre_segundo_plato"
                                        id="nombre_segundo_plato"
                                        onChange={handleChange}
                                    >

                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="filtroSegundoPlato">Filtrar segundo plato:</Label>
                                    <Input
                                        type="text"
                                        id="filtroSegundoPlato"
                                        value={filtroSegundoPlato}
                                        onChange={e => setFiltroSegundoPlato(e.target.value)}
                                    />
                                </FormGroup>
                                {sortedProductosSegundoPlato.filter(producto => producto.cantidad > 0).map((producto, index) => (
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
                                        <Col xs='4'>
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
                                    <Label for='nombre_postre'>Introduzca su postre: </Label>
                                    <Input
                                        type="text"
                                        name="nombre_postre"
                                        id="nombre_postre"
                                        onChange={handleChange}
                                    >

                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="filtroPostre">Filtrar postre:</Label>
                                    <Input
                                        type="text"
                                        id="filtroPostre"
                                        value={filtroPostre}
                                        onChange={e => setFiltroPostre(e.target.value)}
                                    />
                                </FormGroup>
                                {sortedProductosPostre.filter(producto => producto.cantidad > 0).map((producto, index) => (
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
                                        <Col xs='4'>
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
                        <strong>Precio total:</strong> {precioTotal.toFixed(2)} €
                    </div>
                    <div>
                        <strong>Precio por comensal:</strong>{' '}
                        {(precioTotal / cantidadComensales).toFixed(2)} €
                    </div>
                </Form>
            </Col>
            <Col sm="3"></Col>
        </Row>
    );
}
