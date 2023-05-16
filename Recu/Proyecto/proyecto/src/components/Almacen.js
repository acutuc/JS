import React, { useState } from 'react';
import { Row, Col, Form, FormGroup, Button, Label, Input, Table } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default function Almacen(props) {

  //State para el DatePicker
  const [fecha, setFecha] = useState(null);

  //States para el nuevo producto:
  const [nombreProducto, setNombreProducto] = useState();
  const [cantidad, setCantidad] = useState();
  const [unidad_medida, setUnidadMedida] = useState();
  const [precio, setPrecio] = useState();

  console.log(fecha)
  const handleChange = (event) =>{
    
  }

  const anadirProducto = () => {
    axios.post("http://localhost/PHP/REACT/servicios_rest",)
  }

  return (
    <Row>
      <Col sm="4"></Col>
      <Col sm="4">
        <Form inline className=''>
          <FormGroup className="d-flex align-items-center">
            <Label className="me-sm-2" for="fecha">Fecha:</Label>

            <DatePicker
              id='fecha'
              name='fecha'
              selected={fecha}
              onChange={(date) => setFecha(date)}
              minDate={new Date()}
              placeholderText="Seleccione una fecha"
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center">
            <Label className="me-sm-2" for="producto">Producto:</Label>
            <Input
              id='producto'
              name='producto'
              type='select'
            >
              {props.productos.map(element => <option>{element.nombre_producto}</option>)}
            </Input>
            &nbsp;
            <Button
              onClick={anadirProducto}
            ><strong>+</strong>
            </Button>
          </FormGroup>
          <FormGroup className="d-flex align-items-center">
            <Label className="me-sm-2" for="cantidad">Cantidad:</Label>
            <Col sm="3">
            <Input
              id='cantidad'
              name='cantidad'
              type='number'
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
                type='number'
                placeholder='2.20'
              />
            </Col>
            &nbsp;€
          </FormGroup>
          <FormGroup className="d-flex align-items-center">
            <FormGroup className='d-flex align-items-center'>
              <Input
                id='mostrar'
                type='checkbox'
              />
              &nbsp;
              <Label for='mostrar'>No mostrar consumidos</Label>
            </FormGroup>
            <Button color="primary" size="lg" block>
              <strong>Alta</strong>
            </Button>
          </FormGroup>
          <br />

        </Form>

      </Col>
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>
              #
            </th>
            <th>
              Fecha
            </th>
            <th>
              Producto
            </th>
            <th>
              Cantidad
            </th>
            <th>
              Unidad
            </th>
            <th>
              Precio
            </th>
            <th>
              Consumido
            </th>
          </tr>
        </thead>
        <tbody>
          {props.productos.map(element =>
            <tr>
              <th scope='row'>
                {element.id_producto}
              </th>
              <td>
                {element.fecha_recepcion}
              </td>
              <td>
                {element.nombre_producto}
              </td>
              <td>
                {element.cantidad}
              </td>
              <td>
                {element.unidad_medida}
              </td>
              <td>
                {element.precio_unitario}
              </td>
              <td>
                {element.consumido}
              </td>
            </tr>)}
        </tbody>
      </Table>
    </Row>
  )

}