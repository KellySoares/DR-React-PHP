<?php

//Cabecalhos obrigatorios
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

error_reporting(E_ALL);
ini_set('display_errors', true);

$dados = '';
$dados = json_decode(file_get_contents("php://input"), true);

$method = $_SERVER["REQUEST_METHOD"];

$class = isset($dados["folder"]) ? $dados["folder"] : $_GET['folder'];

$id = isset($_GET["id"]) ? $_GET["id"] : null;

$function = isset($_GET["function"]) ? $_GET["function"] : null;


if (file_exists("./Controllers/$class.php")) {

    require_once "./Controllers/$class.php";
    $Paint = new $class();

    switch ($method) {
        case 'GET':
            $Paint->listar($id, $function);
            break;
        case 'POST':
            $Paint->salvar($dados['dados']);
            break;
        case 'PUT':
            $Paint->atualizar($id);
            break;
        case 'DELETE':
            $Paint->excluir($id);
            break;
    }
    return true;
}
