import React, { useState } from 'react';
import Wall from '../../components/wall';
import { InputGroup, Button, FormControl, Form, Col, Tab, Tabs, Row } from 'react-bootstrap';
import Comodo from '../../components/select';
import TableInfo from '../../components/table';
import usePaint from '../../hooks/calPaint';
import CalPaint from '../../components/calPaint';

const Calculadora = () => {

  const { sendCalComodo, Comodos, Paredes, sendComodo, sendBuscarComodo } = usePaint();

  const [infoComodo, setInfoComodo] = useState();
  const [demao, setDemao] = useState(1);
  const [nameComodo, setNameComodo] = useState('');

  const submitCalcComodo = () => {
    return sendCalComodo(infoComodo);
  }

  const submitBuscarComodo = () => {
    return sendBuscarComodo(infoComodo);
  }

  const submitComodo = () => {
    return sendComodo(nameComodo);
  }


  return (
    <>
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="cadastrar" title="Cadastrar informações">
          <Form>
            <Row className="mb-3">

              <Comodo defaultValue={infoComodo} label={<Form.Label>Escolha seu comodo</Form.Label>} onChange={(event) => { setInfoComodo(event.target.value) }} ></Comodo>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label> </Form.Label>
                <InputGroup className="mb-3">
                  <Button variant="outline-primary" id="button-addon2" onClick={submitBuscarComodo}>
                    Visualizar
                  </Button>
                </InputGroup>

              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Cadastre novo comodo</Form.Label>
                <InputGroup className="mb-3">

                  <FormControl
                    placeholder="Nome do novo comodo"
                    aria-label="Cadastre novo comodo"
                    aria-describedby="basic-addon2"
                    defaultValue={nameComodo}
                    onChange={(event) => { setNameComodo(event.target.value) }}
                  />
                  <Button variant="outline-primary" id="button-addon2" onClick={submitComodo}>
                    Cadastrar
                  </Button>
                </InputGroup>
              </Form.Group>
            </Row>
            {Comodos.messageNull &&
              <div className="alert alert-success" role="alert">
                <strong>{Comodos.message}</strong>
              </div>}

            <Wall value={infoComodo} />
            {Paredes.messageNull &&
              <div className="alert alert-success" role="alert">
                <strong>{Paredes.message}</strong>
              </div>}
          </Form>
          <TableInfo parede={Paredes} />
        </Tab>
        <Tab eventKey="calcular" title="Calcular">
          <Form>

            <Form.Label>Calcule a quantidade necessaria de tinta para cada comodo</Form.Label>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <InputGroup className="mb-3">

                  <FormControl
                    placeholder="Largura da parede"
                    aria-label="demao"
                    aria-describedby="basic-addon2"
                    defaultValue={demao} name="demao" onChange={(event) => { setDemao(event.target.value) }}
                  />
                  <InputGroup.Text id="basic-addon2">Demãos</InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Comodo defaultValue={infoComodo} Label="" onChange={(event) => { setInfoComodo(event.target.value) }} ></Comodo>
              <Form.Group as={Col} controlId="formGridEmail">
                <Button variant="outline-primary" id="button-addon2" onClick={submitCalcComodo}>
                  Calcular
                </Button>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <CalPaint parede={Paredes} demao={demao} />

            </Row>

          </Form>
        </Tab>
      </Tabs>
    </>


  )
}

export default Calculadora;