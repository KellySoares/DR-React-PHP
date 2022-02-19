<?php

include("./Models/Comodos.php");

class ComodosController
{

    /**
     * Lista os comodos
     */
    public function listar($dados, $function)
    {
        $comodos = new Comodos;

        if ($function === null) {
            echo $comodos->all($dados);
        } else {
            echo $comodos->CalcPaint($dados);
        }
    }


    /**
     * Salvar o comodo submetido pelo formulário
     */
    public function salvar($dados)
    {
        $comodo           = new Comodos;
        $comodo->name     = $dados['name'];

        return $comodo->save();
    }

    /**
     * Atualizar o comodo conforme dados submetidos
     */
    public function atualizar($dados)
    {
        $id                = (int) $dados['id'];
        $comodo           = Comodos::find($id);
        $comodo->name     = $dados['name'];

        return $comodo->save();
    }

    /**
     * Apagar um comodo conforme o id informado
     */
    public function excluir($dados)
    {
        $id      = (int) $dados['id'];
        $comodo = Comodos::destroy($id);
        return $comodo;
    }
}
