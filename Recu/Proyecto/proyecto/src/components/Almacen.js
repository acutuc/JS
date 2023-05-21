import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Button, Label, Input, Table } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import axios from 'axios';

export default function Almacen(props) {
  const [fecha, setFecha] = useState(null);
  const [nombreProducto, setNombreProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [unidad_medida, setUnidadMedida] = useState("");
  const [precio, setPrecio] = useState("");
  const [productos, setProductos] = useState(props.productos)
  const [error, setError] = useState("");

  const handleFechaChange = (fechaSeleccionada) => {
    const fechaFormateada = format(fechaSeleccionada, 'yyyyMMdd');
    setFecha(fechaFormateada)
  }

  const handleChange = (event) => {
    // eslint-disable-next-line default-case
    switch (event.target.name) {
      case "producto":
        setNombreProducto(event.target.value.toUpperCase());
        break;
      case "cantidad":
        setCantidad(event.target.value);
        break;
      case "unidad_medida":
        setUnidadMedida(event.target.value);
        break;
      case "precio":
        setPrecio(event.target.value)
        break;
    }
  }


  const altaProducto = (event) => {

    event.preventDefault();

    if (fecha === "" || nombreProducto === "" || cantidad === "" || unidad_medida === "" || precio === "") {
      setError("Por favor, complete todos los campos"); // Mostrar mensaje de error
      return;
    }

    const nuevoProducto = {
      fecha_recepcion: fecha,
      nombre_producto: nombreProducto,
      cantidad: cantidad,
      unidad_medida: unidad_medida,
      precio_unitario: precio
    };
    console.log(nuevoProducto)
    // Realizar la solicitud POST a la API para agregar el nuevo producto
    axios.post("http://localhost/PHP/REACT/servicios_rest/insertar_producto", nuevoProducto)
      .then(response => {
        console.log("Producto agregado exitosamente");
        setProductos([...productos, nuevoProducto])
        setError("");
        // Realizar cualquier otra acción necesaria después de agregar el producto
      })
      .catch(error => {
        console.error("Error al agregar el producto:", error);
      });
  }

  return (
    <Row>
      <Col sm="4"></Col>
      <Col sm="4">
        <Form inline >
          <FormGroup className="d-flex align-items-center">
            <Label className="me-sm-2" for="fecha">Fecha:</Label>
            <DatePicker
              id='fecha'
              name='fecha'
              onChange={handleFechaChange}
              minDate={new Date()}
              placeholderText="Seleccione una fecha"
              value={fecha}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center">
            <Label className="me-sm-2" for="producto">Producto:</Label>
            <Input
              id='producto'
              name='producto'
              type='select'
              onChange={handleChange}
            >
              {props.productos.map(element => <option key={element.id}>{element.nombre_producto}</option>)}
            </Input>
            &nbsp;
            <Button><strong>+</strong></Button>
          </FormGroup>
          <FormGroup className="d-flex align-items-center">
            <Label className="me-sm-2" for="cantidad">Cantidad:</Label>
            <Col sm="3">
              <Input
                id='cantidad'
                name='cantidad'
                type='number'
                min="1"
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup className="d-flex align-items-center">
            <Label className="me-sm-2" for="unidad_medida">Unidad de medida:</Label>
            <Col sm="6">
              <Input
                id='unidad_medida'
                name='unidad_medida'
                type='select'
                onChange={handleChange}
              >
                <option>L (LITROS)</option>
                <option>gr (GRAMOS)</option>
                <option>u (UNIDAD)</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup className="d-flex align-items-center">
            <Label className="me-sm-2" for="precio">Precio unitario:</Label>
            <Col sm='4'>
              <Input
                id='precio'
                name='precio'
                type='number'
                placeholder='2.20'
                onChange={handleChange}
              />
            </Col>
            &nbsp;€
          </FormGroup>
          <FormGroup className="d-flex align-items-center">
            <FormGroup className='d-flex align-items-center'>
              <Input id='mostrar' type='checkbox' />
              &nbsp;
              <Label for='mostrar'>No mostrar consumidos</Label>
            </FormGroup>
            <Button color="primary" size="lg" block onClick={altaProducto}>
              <strong>Alta</strong>
            </Button>
          </FormGroup>
          <br />
          {error && <p>{error}</p>}
        </Form>
      </Col>
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Unidad</th>
            <th>Precio</th>
            <th>Consumido</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(element =>
            <tr key={element.id_producto}>
              <th scope='row'>{element.id_producto}</th>
              <td>{element.fecha_recepcion}</td>
              <td>{element.nombre_producto}</td>
              <td>{element.cantidad}</td>
              <td>{element.unidad_medida}</td>
              <td>{element.precio_unitario}</td>
              <td>{element.consumido}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Row>
  );
}