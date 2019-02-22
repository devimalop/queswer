<?php
	class Conexion { 
	    public static function sendQuery($sql) {
	        $opc = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
	        $dsn = "mysql:host=localhost;dbname=id4272972_1718d0_ivan";
	        $usuario = 'id4272972_1718d0_ivan';
	        $contrasena = '1718d0_ivan';
	        $queswerdb = new PDO($dsn, $usuario, $contrasena, $opc);
	        $queryResult = null;
	        if (isset($queswerdb)) {
	            $queryResult = $queswerdb->query($sql);
	        }
	        return $queryResult;
	    }

	    public static function realizatransaccion($transaccion) {
	        try {
	        	//Instituto:
	            //$db = new PDO("mysql:host=localhost;dbname=1718d0_ivan", "1718d0_ivan", "1718d0_ivan");
	            //Hosting:
	            $db = new PDO("mysql:host=localhost;dbname=id4272972_1718d0_ivan", "id4272972_1718d0_ivan", "1718d0_ivan");
	        } catch (Exception $e) {
	            die("No se pudo conectar: " . $e->getMessage());
	            return false;
	        }
	        try {
	            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	            $db-> beginTransaction();
	            foreach ($transaccion as $trans) {
	                $sentencia = $db->prepare($trans);
	                $sentencia->execute();
	            }
	            $db->commit();
	            return true; 
	        } catch (Exception $e) {
	            $db->rollBack();
	            return false;
	        }
	    }
	}
	

?>