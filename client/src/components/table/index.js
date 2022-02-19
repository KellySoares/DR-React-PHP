import React from 'react';
import { Table } from 'react-bootstrap';

const TableInfo = (props) => {

    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Largura</th>
                    <th>Altura</th>
                    <th>Janelas</th>
                    <th>Porta</th>
                    <th>Medida de cada parede</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {!props.parede.loading ? (
                    <></>
                ) : <>

                    {props.parede.data.map(item => {
                        if (item.medida !== undefined) {
                            return (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.width} Metros</td>
                                    <td>{item.height} Metros</td>
                                    <td>{item.window}</td>
                                    <td>{item.door}</td>
                                    <td>{item.medida} Metros²</td>
                                </tr>
                            )
                        } else {
                            return (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.width} Metros</td>
                                    <td>{item.height} Metros</td>
                                    <td>{item.window}</td>
                                    <td>{item.door}</td>

                                </tr>
                            )
                        }

                    })}
                </>

                }
                {props.children}
            </tbody>
        </Table>
    )
}

export default TableInfo;