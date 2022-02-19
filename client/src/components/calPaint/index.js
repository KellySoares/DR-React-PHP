import React from 'react';
import TableInfo from '../table';

const CalPaint = (props) => {

    var arrayPaint = [18, 3.6, 2.5, 0.5];

    var total = props.parede.data.reduce(getTotal, 0);
    function getTotal(total, item) {
        return total + (item.medida);
    }

    if (total > 0) {

        var litro = ((total * props.demao) / 5).toFixed(2);

        var array = [{ lata: 0, qdd: 0, resto: parseFloat(litro) }];

        const QddLatas = arrayPaint.map(function (lata) {

            var container = {};
            var count = 1;
            var sub = (array[0].resto - lata).toFixed(2);
            while (sub >= 0) {
                array[0].resto = sub;
                container['lata'] = lata;
                container['qdd'] = count++;
                container['resto'] = sub;
                sub = sub - lata;
            }
            return container;
        });

        array = QddLatas.filter((i) => {
            return i.lata !== undefined;
        });


    }


    return (
        <TableInfo parede={props.parede}>

            <tr>
                <th colSpan={3}>Você vai precisar de {litro} Litros de tinta. </th>
                <th colSpan={3}> Para pintar {(total * props.demao).toFixed(2)} Metros² com {props.demao} demãos </th>

            </tr>
            {array &&
                <tr >
                    <th rowSpan={array.length + 1} colSpan={4}> Latas necessárias</th>
                </tr>
            }
            {array?.map((item, key) => {

                return (
                    <tr key={key}>
                        <td>{item.qdd} Lata de </td>
                        <td>{item.lata} L</td>
                    </tr>
                )
            })}
        </TableInfo>
    )
}

export default CalPaint;