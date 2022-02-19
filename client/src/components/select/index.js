import React from 'react';
import { Form, Col } from 'react-bootstrap';
import usePaint from '../../hooks/calPaint';

const Comodo = (props) => {
  const { Comodos } = usePaint();

  return (
    <Form.Group as={Col} controlId="formGridEmail">

      {props.label}

      <Form.Select defaultValue={props.defaultValue} name="id" onChange={props.onChange}>

        {!Comodos.loading ? (
          <option key={0} >Selecione...</option>
        ) : <>
          <option key={0} >Selecione...</option>
          {Comodos.data.map(item => {
            return (<option key={item.id} value={item.id}>{item.name}</option>)
          })}
        </>

        }
      </Form.Select>

    </Form.Group>


  )
}

export default Comodo;