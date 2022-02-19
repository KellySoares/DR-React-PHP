import React from 'react';

const Home = () => {
  return (
    <div>

      <p>
        É uma aplicação web que ajuda o usuário a calcular a quantidade de tinta necessária para pintar uma sala.
      </p>
      <p>
        Essa aplicação considera que a sala é composta de 4 paredes e permite que o usuário escolha qual a medida de cada
        parede e quantas janelas e portas possuem cada parede.
      </p>

      <br />
      Regras
      <br />
      <ul>
        <li>A altura de paredes com porta deve ser, no mínimo, 30 centímetros maior que a altura da porta</li>
        <li>Nenhuma parede pode ter menos de 1 metro quadrado nem mais
          de 15 metros quadrados, mas podem possuir alturas e larguras diferentes</li>
        <li>Cada janela possui as medidas: 2,00 x 1,20 metros</li>
        <li>Cada porta possui as medidas: 0,80 x 1,90 metros</li>
      </ul>


    </div>
  )
}

export default Home;