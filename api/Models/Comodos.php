<?php

include("./config/bd.php");

class Comodos  extends ClassConexao
{
    private $atributos;

    public function __construct()
    {
    }

    public function __set(string $atributo, $valor)
    {
        $this->atributos[$atributo] = $valor;
        return $this;
    }

    public function __get(string $atributo)
    {
        return $this->atributos[$atributo];
    }

    public function __isset($atributo)
    {
        return isset($this->atributos[$atributo]);
    }

    /**
     * Salvar o comodo
     * @return boolean
     */
    public function save()
    {
        $colunas = $this->preparar($this->atributos);
        if (!isset($this->id)) {
            $query = "INSERT INTO comodos (" .
                implode(', ', array_keys($colunas)) .
                ") VALUES (" .
                implode(', ', array_values($colunas)) . ");";
        } else {
            foreach ($colunas as $key => $value) {
                if ($key !== 'id') {
                    $definir[] = "{$key}={$value}";
                }
            }
            $query = "UPDATE comodos SET " . implode(', ', $definir) . " WHERE id='{$this->id}';";
        }
        if ($conexao = ClassConexao::conectaDB()) {
            $stmt = $conexao->prepare($query);
            if ($stmt->execute()) {
                if (!isset($this->id)) {
                    $idInsert =  $conexao->lastInsertId();
                } else {
                    $idInsert =  $this->id;
                }
                $result = [
                    "id" =>  $idInsert,
                    "message" => "Comodo salvo com sucesso!"
                ];

                echo json_encode($result);
            }
        }
        return false;
    }

    /**
     * Tornar valores aceitos para sintaxe SQL
     * @param type $dados
     * @return string
     */
    private function escapar($dados)
    {
        if (is_string($dados) && !empty($dados)) {
            return "'" . addslashes($dados) . "'";
        } elseif (is_bool($dados)) {
            return $dados ? 'TRUE' : 'FALSE';
        } elseif ($dados !== '') {
            return $dados;
        } else {
            return 'NULL';
        }
    }

    /**
     * Verifica se dados são próprios para ser salvos
     * @param array $dados
     * @return array
     */
    private function preparar($dados)
    {
        $resultado = array();
        foreach ($dados as $k => $v) {
            if (is_scalar($v)) {
                $resultado[$k] = $this->escapar($v);
            }
        }
        return $resultado;
    }

    /**
     * Retorna uma lista de comodos
     * @return array/boolean
     */
    public static function all($id)
    {

        $conexao = ClassConexao::conectaDB();

        if ($id !== null) {
            $stmt = $conexao->prepare("SELECT * FROM comodos where id = ?");
            $stmt->bindParam(1, $id, PDO::PARAM_INT);
        } else {
            $stmt = $conexao->prepare("SELECT * FROM comodos");
        }

        $result  = [];
        $I = 0;

        if ($stmt->execute()) {

            while ($rs = $stmt->fetchObject(Comodos::class)) {

                $result[$I] = [
                    "id" => $rs->atributos["id"],
                    "name" => $rs->atributos["name"]
                ];
                $I++;
            }
        }

        if (count($result) > 0) {
            echo json_encode($result);
        }
        return false;
    }

    /**
     * Retorna a lista das paredes do como com valores calculados
     * @return array/boolean
     */
    public static function CalcPaint($id)
    {

        $conexao = ClassConexao::conectaDB();

        $stmt = $conexao->prepare("SELECT c.id as id_comodo, p.id,  c.name AS Cname,p.name, p.width, p.height, p.wdw, p.door FROM comodos c
        JOIN paredes p ON p.id_comodo=c.id
         WHERE c.id = ?");
        $stmt->bindParam(1, $id, PDO::PARAM_INT);


        $result  = [];
        $I = 0;

        $janela =  2.00 * 1.20;
        $porta = 0.80 * 1.90;

        if ($stmt->execute()) {

            while ($rs = $stmt->fetchObject(Comodos::class)) {

                $medida = ($rs->atributos["width"] * $rs->atributos["height"]) - ($janela * $rs->atributos["wdw"]) - ($porta * $rs->atributos["door"]);

                $result[$I] = [
                    "id_comodo" => $rs->atributos["id_comodo"],
                    "Cname" => $rs->atributos["Cname"],
                    "medida" => round($medida, 2),
                    "id" => $rs->atributos["id"],
                    "name" => $rs->atributos["name"],
                    "width" => $rs->atributos["width"],
                    "height" => $rs->atributos["height"],
                    "window" => $rs->atributos["wdw"],
                    "door" => $rs->atributos["door"]
                ];
                $I++;
            }
        }

        if (count($result) > 0) {
            echo json_encode($result);
        }
        return false;
    }

    /**
     * Retornar o número de registros
     * @return int/boolean
     */
    public static function count()
    {
        $conexao = ClassConexao::conectaDB();
        $count   = $conexao->exec("SELECT count(*) FROM comodos;");
        if ($count) {
            $result = [
                "count" => (int) $count
            ];
            echo json_encode($result);
        }
        return false;
    }

    /**
     * Encontra um recurso pelo id
     * @param type $id
     * @return type
     */
    public static function find($id)
    {
        $conexao = ClassConexao::conectaDB();
        $stmt    = $conexao->prepare("SELECT * FROM comodos WHERE id='{$id}';");
        if ($stmt->execute()) {
            if ($stmt->rowCount() > 0) {
                $resultado = $stmt->fetchObject('Comodos');
                if ($resultado) {
                    $result = [
                        "id" => $resultado["id"],
                        "name" => $resultado["name"]
                    ];

                    echo json_encode($result);
                }
            }
        }
        return false;
    }

    /**
     * Destruir um recurso
     * @param type $id
     * @return boolean
     */
    public static function destroy($id)
    {
        $conexao = ClassConexao::conectaDB();
        if ($conexao->exec("DELETE FROM comodos WHERE id='{$id}';")) {
            return true;
        }
        return false;
    }
}
