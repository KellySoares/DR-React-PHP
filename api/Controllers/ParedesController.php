<?php

include("./Models/Paredes.php");

class ParedesController
{
    /**
     * Lista as paredes
     */
    public function listar($dados)
    {
        $paredes = new Paredes;

        echo $paredes->all($dados);
    }

    /**
     * Salvar a parede submetida pelo formulário
     */
    public function salvar($dados)
    {
        $janela =  2.00 * 1.20;
        $porta = 0.80 * 1.90;

        $AreaJP = ($janela * $dados['window']) + ($porta * $dados['door']);
        $Metro = $dados['width'] * $dados['height'];



        if ((float)$dados['height'] >= 2.20) {

            if ($Metro > 1 and $Metro < 15) {
                if (($Metro / 2) >= $AreaJP) {
                    $parede           = new Paredes;
                    $parede->name     = $dados['name'];
                    $parede->id_comodo = $dados['id_comodo'];
                    $parede->width    = $dados['width'];
                    $parede->height     = $dados['height'];
                    $parede->wdw = $dados['window'];
                    $parede->door    = $dados['door'];


                    return $parede->save();
                } else {
                    $result = [
                        "message" => "O total de área das portas e janelas deve ser no máximo 50% da área de parede."
                    ];
                    echo json_encode($result);
                }
            } else {
                $result = [
                    "message" => "A parede deve ser de no minimo 1 metro quadrado e no máximo 15 metros quadrados."
                ];
                echo json_encode($result);
            }
        } else {
            $result = [
                "message" => "A altura de paredes com porta deve ser, no mínimo, 30 centímetros maior que a altura da porta."
            ];
            echo json_encode($result);
        }
    }

    /**
     * Atualizar a parede conforme dados submetidos
     */
    public function atualizar($dados)
    {
        $id                = (int) $dados['id'];
        $parede           = Paredes::find($id);
        $parede->name     = $dados['name'];
        $parede->id_comodo = $dados['id_comodo'];
        $parede->width    = $dados['width'];
        $parede->height     = $dados['height'];
        $parede->wdw = $dados['window'];
        $parede->door    = $dados['door'];

        return  $parede->save();
    }

    /**
     * Apagar uma parede conforme o id informado
     */
    public function excluir($dados)
    {
        $id      = (int) $dados['id'];
        $parede = Paredes::destroy($id);
        return $parede;
    }
}
