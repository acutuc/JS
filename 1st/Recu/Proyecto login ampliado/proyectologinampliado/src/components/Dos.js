import React, { useState } from 'react';
import { Row, Col, Form, FormGroup, Button, Label, Input } from 'reactstrap';

export default function Dos(props) {
    const [texto, setTexto] = useState('');

    const handleChange = (event) => {
        if (event.target.name === "texto") {
            setTexto(event.target.value)
        }
    }
    const clicar = () => {
        if (texto !== '') {
            props.setTitulo(texto)
        }
    }

    return (
        <Row>
            <Col sm="4"></Col>
            <Col sm="4">
                <Form inline>
                    <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                        <Label className="me-sm-2" for="exampleEmail">Añada un título</Label>
                        <Input
                            id="texto"
                            name="texto"
                            placeholder="Introduzca un texto"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <br />
                    <Button color="primary" size="lg" block onClick={clicar}>
                        <strong>Add</strong>
                    </Button>
                </Form>

            </Col>
        </Row>
    )

}