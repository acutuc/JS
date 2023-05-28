import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

export default function Menu(props) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    console.log('Productos actualizados:', props.productos);
    setProductos(props.productos);
  }, [props.productos]);

  const handleCheckboxChange = (event, producto) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedItems(prevItems => [...prevItems, { plato: producto.nombre_producto, cantidad: 1 }]);
    } else {
      setSelectedItems(prevItems => prevItems.filter(item => item.plato !== producto.nombre_producto));
    }
  };

  const handleCantidadChange = (index, value) => {
    const updatedItems = [...selectedItems];
    updatedItems[index].cantidad = parseInt(value);
    setSelectedItems(updatedItems);
  };

  const addNewItem = async () => {
    // Aquí puedes hacer la solicitud a través de Axios con los datos seleccionados (selectedItems)
    // Ejemplo de solicitud:
    try {
      await axios.post('/api/ingredientes', { ingredientes: selectedItems });
      console.log('Solicitud enviada correctamente');
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }

    // Limpia la selección después de enviar la solicitud
    setSelectedItems([]);
  };

  const disableAddButton = selectedItems.length === 0;

  return (
    <Row>
      <Col sm="3"></Col>
      <Col sm="6">
        <Form inline>
          {productos.map((producto, index) => (
            <FormGroup className="d-flex align-items-center" key={producto.id_producto}>
              <Label className="me-sm-6" check>
                <Input
                  type="checkbox"
                  checked={selectedItems.some(item => item.plato === producto.nombre_producto)}
                  onChange={e => handleCheckboxChange(e, producto)}
                />{' '}
                {producto.nombre_producto}
              </Label>
              <Col xs='2'>
                <Input
                  type='select'
                  value={selectedItems.find(item => item.plato === producto.nombre_producto)?.cantidad || ''}
                  onChange={e => handleCantidadChange(index, e.target.value)}
                  disabled={!selectedItems.some(item => item.plato === producto.nombre_producto)}
                >
                  <option value="">Seleccionar</option>
                  {Array.from({ length: producto.cantidad }, (_, i) => (i + 1).toString()).map(option => (
                    <option key={option}>{option}</option>
                  ))}
                </Input>
              </Col>
            </FormGroup>
          ))}
          <Button color="primary" onClick={addNewItem} disabled={disableAddButton}>Alta ingrediente</Button>
        </Form>
      </Col>
    </Row>
  );
}
