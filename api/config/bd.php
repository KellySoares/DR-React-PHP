<?php


abstract class ClassConexao
{

    public static function conectaDB()
    {
        try {
            $Con = new PDO("mysql:host=localhost;dbname=api-php-paint", "root", "");

            return $Con;
        } catch (PDOException $Erro) {
            return $Erro->getMessage();
        }
    }
}
