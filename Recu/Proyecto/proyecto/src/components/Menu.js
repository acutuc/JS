import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

export default function Menu(props) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cantidadOpciones, setCantidadOpciones] = useState({});

  useEffect(() => {
    console.log('Productos actualizados:', props.productos);
    setProductos(props.productos);

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
      const updatedProducts = productos.map(producto => {
        const selectedItem = selectedItems.find(item => item.plato === producto.nombre_producto);
        if (selectedItem) {
          return {
            id_producto: producto.id_producto,
            cantidad: selectedItem.cantidad
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
    } catch (error) {
      console.error('Error al actualizar los datos de los productos:', error);
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

  return (
    <Row>
      <Col sm="3"></Col>
      <Col sm="6">
        <Form inline>
          {sortedProductos.map((producto, index) => (
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
          <Button color="primary" onClick={addNewItem} disabled={disableAddButton}>
            Reservar pedido
          </Button>
        </Form>
      </Col>
    </Row>
  );
}