import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import axios from 'axios';

export default function Menu(props) {
    const [selectedItems, setSelectedItems] = useState([]);
    const [productos, setProductos] = useState([]);
    const [cantidadOpciones, setCantidadOpciones] = useState({});
    const [cantidadComensales, setCantidadComensales] = useState(1);
    const [precioTotal, setPrecioTotal] = useState(0);

    const [modal, setModal] = useState(false);
    const [ingrediente, setIngrediente] = useState("");
    const [ingredientesFiltrados, setIngredientesFiltrados] = useState([]);
    const toggle = () => setModal(!modal);

    // Estados y funciones para los modales
    const [modalPrimerPlato, setModalPrimerPlato] = useState(false);
    const [modalSegundoPlato, setModalSegundoPlato] = useState(false);
    const [modalPostre, setModalPostre] = useState(false);

    const togglePrimerPlato = () => setModalPrimerPlato(!modalPrimerPlato);
    const toggleSegundoPlato = () => setModalSegundoPlato(!modalSegundoPlato);
    const togglePostre = () => setModalPostre(!modalPostre);

    useEffect(() => {
        console.log('Productos actualizados:', props.productos);
        setProductos(props.productos);

        const opciones = {};
        props.productos.forEach((producto) => {
            opciones[producto.id_producto] = Array.from(
                { length: producto.cantidad },
                (_, i) => (i + 1).toString()
            );
        });
        setCantidadOpciones(opciones);
    }, [props.productos]);

    const addNewItem = async () => {
        try {
            const updatedProducts = productos.map(producto => {
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
            productos.forEach(producto => {
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
                const producto = productos.find(p => p.id_producto === item.id_producto);
                return acc + producto.precio_unitario * item.cantidad;
            }, 0);
            setPrecioTotal(total);
        } catch (error) {
            console.error('Error al actualizar los datos de los productos:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setIngrediente(value);

        const texto = value.toLowerCase();
        const filtrados = productos.filter((f) =>
            f.nombre_producto.toLowerCase().includes(texto)
        );

        if (texto === "") {
            setIngredientesFiltrados(productos); // Mostrar todos los productos
        } else {
            setIngredientesFiltrados(filtrados);
        }
    };

    const handleSubmit = (event, tipoPlato) => {
        event.preventDefault();

        const platoSeleccionado = ingredientesFiltrados.find(
            (plato) => plato.nombre_producto === ingrediente
        );

        if (platoSeleccionado) {
            const updatedItems = [...selectedItems];
            const selectedItem = updatedItems.find(
                (item) => item.tipoPlato === tipoPlato
            );

            if (selectedItem) {
                selectedItem.plato = platoSeleccionado;
            } else {
                updatedItems.push({ tipoPlato, plato: platoSeleccionado });
            }

            setSelectedItems(updatedItems);
        }

        setIngrediente("");
        setIngredientesFiltrados([]);
        // Utiliza la función de toggle específica para cada modal
        if (tipoPlato === 'primer_plato') {
            togglePrimerPlato();
        } else if (tipoPlato === 'segundo_plato') {
            toggleSegundoPlato();
        } else if (tipoPlato === 'postre') {
            togglePostre();
        }
    };

    const handleRemove = (tipoPlato) => {
        const updatedItems = selectedItems.filter(
            (item) => item.tipoPlato !== tipoPlato
        );
        setSelectedItems(updatedItems);
    };

    const handleCantidadChange = (tipoPlato, cantidad) => {
        const updatedItems = [...selectedItems];
        const selectedItem = updatedItems.find(
            (item) => item.tipoPlato === tipoPlato
        );

        if (selectedItem) {
            selectedItem.cantidad = cantidad;
            setSelectedItems(updatedItems);
        }
    };

    const handleConfirmarPedido = async () => {
        try {
            // Realiza las operaciones necesarias para confirmar el pedido
            // ...

            console.log('Pedido confirmado:', selectedItems);
            setSelectedItems([]);
        } catch (error) {
            console.error('Error al confirmar el pedido:', error);
        }
    };

    const disableAddButton = selectedItems.length === 0;

    const sortedProductos = productos.slice().sort((a, b) => {
        if (a.nombre_producto < b.nombre_producto) {
            return -1;
        }
        if (a.nombre_producto > b.nombre_producto) {
            return 1;
        }
        return 0;
    });

    const renderPlatosSeleccionados = (tipoPlato) => {
        const selectedItem = selectedItems.find(
            (item) => item.tipoPlato === tipoPlato
        );

        if (!selectedItem) {
            return null;
        }

        return (
            <Table responsive striped hover>
                <thead>
                    <tr>
                        <th>{tipoPlato}</th>
                        <th>Cantidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={selectedItem.plato.id_producto}>
                        <td>{selectedItem.plato.nombre_producto}</td>
                        <td>
                            <Input
                                type="select"
                                value={selectedItem.cantidad}
                                onChange={(e) =>
                                    handleCantidadChange(tipoPlato, parseInt(e.target.value))
                                }
                            >
                                {cantidadOpciones[selectedItem.plato.id_producto].map(
                                    (opcion) => (
                                        <option key={opcion}>{opcion}</option>
                                    )
                                )}
                            </Input>
                        </td>
                        <td>
                            <Button
                                color="danger"
                                size="sm"
                                onClick={() => handleRemove(tipoPlato)}
                            >
                                Eliminar
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        );
    };

    return (
        <Row>
            <Col sm="4"></Col>
            <Col sm="4">
                <Form>
                    <FormGroup>
                        <Label for="primer_plato">Primer plato:</Label> &nbsp;
                        <Button color="primary" onClick={togglePrimerPlato}>
                            Agregar
                        </Button>
                        <Modal isOpen={modalPrimerPlato} toggle={togglePrimerPlato}>
                            <ModalHeader toggle={toggle}>
                                Agregar ingredientes al primer plato
                            </ModalHeader>
                            <ModalBody>
                                <div className="d-flex align-items-center">
                                    <Label for="">Filtrar: </Label>&nbsp;
                                    <Input
                                        type="text"
                                        name="primer_plato"
                                        value={ingrediente}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="p-2">
                                    <FormGroup row>
                                        <Col sm={10}>
                                            <Input
                                                id="exampleSelect"
                                                name="select"
                                                type="select"
                                                onChange={handleChange}
                                            >
                                                {ingredientesFiltrados.length > 0 ? (
                                                    ingredientesFiltrados.map((e) => (
                                                        <option key={e.id_producto}>{e.nombre_producto}</option>
                                                    ))
                                                ) : (
                                                    <option disabled={!ingrediente}>No se encontraron resultados</option>
                                                )}
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="primary"
                                    onClick={(e) => handleSubmit(e, 'primer_plato')}
                                    disabled={!ingrediente}
                                >
                                    Añadir
                                </Button>
                            </ModalFooter>
                        </Modal>
                        {renderPlatosSeleccionados('primer_plato')}
                    </FormGroup>
                    <FormGroup>
                        <Label for="segundo_plato">Segundo plato:</Label> &nbsp;
                        <Button color="primary" onClick={toggleSegundoPlato}>
                            Agregar
                        </Button>
                        <Modal isOpen={modalSegundoPlato} toggle={toggleSegundoPlato}>
                            <ModalHeader toggle={toggle}>
                                Agregar ingredientes al segundo plato
                            </ModalHeader>
                            <ModalBody>
                                <div className="d-flex align-items-center">
                                    <Label for="">Filtrar: </Label>&nbsp;
                                    <Input
                                        type="text"
                                        name="segundo_plato"
                                        value={ingrediente}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="p-2">
                                    <FormGroup row>
                                        <Col sm={10}>
                                            <Input
                                                id="exampleSelect"
                                                name="select"
                                                type="select"
                                                onChange={handleChange}
                                            >
                                                {ingredientesFiltrados.length > 0 ? (
                                                    ingredientesFiltrados.map((e) => (
                                                        <option key={e.id_producto}>{e.nombre_producto}</option>
                                                    ))
                                                ) : (
                                                    <option disabled={!ingrediente}>No se encontraron resultados</option>
                                                )}
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="primary"
                                    onClick={(e) => handleSubmit(e, 'segundo_plato')}
                                    disabled={!ingrediente}
                                >
                                    Añadir
                                </Button>
                            </ModalFooter>
                        </Modal>
                        {renderPlatosSeleccionados('segundo_plato')}
                    </FormGroup>
                    <FormGroup>
                        <Label for="postre">Postre:</Label> &nbsp;
                        <Button color="primary" onClick={togglePostre}>
                            Agregar
                        </Button>
                        <Modal isOpen={modalPostre} toggle={togglePostre}>
                            <ModalHeader toggle={toggle}>Agregar postre</ModalHeader>
                            <ModalBody>
                                <div className="d-flex align-items-center">
                                    <Label for="">Filtrar: </Label>&nbsp;
                                    <Input
                                        type="text"
                                        name="postre"
                                        value={ingrediente}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="p-2">
                                    <FormGroup row>
                                        <Col sm={10}>
                                            <Input
                                                id="exampleSelect"
                                                name="select"
                                                type="select"
                                                onChange={handleChange}
                                            >
                                                {ingredientesFiltrados.length > 0 ? (
                                                    ingredientesFiltrados.map((e) => (
                                                        <option key={e.id_producto}>{e.nombre_producto}</option>
                                                    ))
                                                ) : (
                                                    <option disabled={!ingrediente}>No se encontraron resultados</option>
                                                )}
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="primary"
                                    onClick={(e) => handleSubmit(e, 'postre')}
                                    disabled={!ingrediente}
                                >
                                    Añadir
                                </Button>
                            </ModalFooter>
                        </Modal>
                        {renderPlatosSeleccionados('postre')}
                    </FormGroup>
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