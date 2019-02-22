<?php
    include_once "conexion.php";
    if ( ! session_id() ) @ session_start();

    $conexion = new Conexion; 
    
    function inst($conexion) {
        $sql = "SELECT * FROM INSTITUTOS";
        $queryResult = $conexion::sendQuery($sql);
        $institutos = null;
        if (isset($queryResult)) {
            $institutos = $queryResult->fetch();
        }
        return $institutos;
    }

    function checkLogin($conexion) {
        $user = $_POST['user'];
        $password = $_POST['password'];
        $sql = "SELECT * FROM USUARIOS WHERE NOMBRE = '$user' AND CONTRASENA = '$password'";
        $queryResult = $conexion::sendQuery($sql);
        $userFound = null;
        if (isset($queryResult)) {
            $userFound = $queryResult->fetch();
            $_SESSION['currentUser'] = $userFound;
        }
        return $userFound;
    }

    if(isset($_POST['funcion'])){
        switch ($_POST['funcion']) {
            case "checkLogin":
                echo json_encode(checkLogin($conexion));
                break;
            case "getCurrentUser":
                echo json_encode($_SESSION['currentUser']);
                break;
        }
    }else{
        echo json_encode("false");
    }

?>