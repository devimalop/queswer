<?php
    include_once "conexion.php";
    if ( ! session_id() ) @ session_start();

    $conexion = new Conexion; 

    function query($conexion, $query) {
        $queryResult = $conexion::sendQuery($query);
		$finalData = array();
        if ($queryResult) {
            $row = $queryResult->fetch();
            while ($row != null) {
            	array_push($finalData, $row);
                $row = $queryResult->fetch();
            }
        }
        return $finalData;
    }


    function registerUser($conexion, $newUser){
        $errorResponse = [];
        $name = $newUser["nombre"];
        $response =  query($conexion, "SELECT P_USUARIO FROM USUARIOS WHERE NOMBRE = '$name'");
        if(sizeof($response) > 0){
            $errorResponse["error"] = 'Ya existe un usuario con el Nick '.$name;
            return $errorResponse;
        }else{
            // $maxPUser = query($conexion, "SELECT MAX(P_USUARIO)+1 AS MAXP FROM USUARIOS");
            // $newUser["pusuario"] = $maxPUser[0]["MAXP"];
            $transaction = "INSERT INTO USUARIOS VALUES (0,".$newUser["instcurs"].",'".$newUser["nombre"]."','".$newUser["nombrereal"]."','".$newUser["apellidos"]."','".$newUser["contrasena"]."', 0,".$newUser["edad"].", 0);";
            if($conexion::realizatransaccion([$transaction])){
                return true;
            }else{
                $errorResponse["error"] = 'Error en la inserción de datos';
                return $errorResponse;
            }
        }
    }

    if(isset($_POST['funcion'])){
        switch ($_POST['funcion']) {
            case "getColleges":
                echo json_encode(query($conexion, "SELECT * FROM INSTITUTOS"));
                break;
            case "getCourses":
                echo json_encode(query($conexion, "SELECT * FROM CURSOS ORDER BY P_CURSO DESC"));
                break;
            case "getCollegesCourses":
                echo json_encode(query($conexion, "SELECT * FROM INSTCURS"));
                break;
            case "registerUser":
                echo json_encode(registerUser($conexion, $_POST['data']));
                break;
        }
    }else{
        echo json_encode("false");
    }

?>