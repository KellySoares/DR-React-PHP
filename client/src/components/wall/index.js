import React, { useState } from 'react';
import { InputGroup, Button, FormControl, Form, Col, Row } from 'react-bootstrap';
import usePaint from '../../hooks/calPaint';



const Wall = (props) => {

    const { sendMeasure } = usePaint();

    const [infoWall, setInfoWall] = useState(
        {
            name: '',
            id_comodo: 0,
            width: 0,
            height: 0,
            window: 0,
            door: 0
        }
    );

    const handleInputChange = (event) => {

        const { name, value } = event.target;
        setInfoWall((prevState) => ({
            ...prevState,
            [name]: value,
            id_comodo: props.value
        }));
    }


    const submitMeasure = () => {
        return sendMeasure(infoWall);
    }


    return (
        <>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formType">
                    <Form.Label>Nome da parede</Form.Label>
                    <InputGroup className="mb-3">

                        <FormControl
                            placeholder="Nome"
                            aria-label="name"
                            aria-describedby="basic-addon2"
                            defaultValue={infoWall.name} name="name" onChange={handleInputChange}
                        />

                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Largura da parede</Form.Label>
                    <InputGroup className="mb-3">

                        <FormControl
                            placeholder="Largura da parede"
                            aria-label="width"
                            aria-describedby="basic-addon2"
                            defaultValue={infoWall.width} name="width" onChange={handleInputChange}
                        />
                        <InputGroup.Text id="basic-addon2">Metros</InputGroup.Text>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Altura da parece</Form.Label>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Altura da parede"
                            aria-label="height"
                            aria-describedby="basic-addon2"
                            defaultValue={infoWall.height} name="height" onChange={handleInputChange}
                        />
                        <InputGroup.Text id="basic-addon2">Metros</InputGroup.Text>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Quantidade de Porta</Form.Label>
                    <Form.Select defaultValue={infoWall.door} name="door" onChange={handleInputChange}>
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">

                    <Form.Label>Quantidade de Janela</Form.Label>
                    <Form.Select defaultValue={infoWall.window} name="window" onChange={handleInputChange}>
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                    </Form.Select>
                </Form.Group>

            </Row>
            <Button variant="primary" type="button" onClick={submitMeasure}>
                Cadastrar novas medidas de parede
            </Button>
        </>


    )
}

export default Wall;