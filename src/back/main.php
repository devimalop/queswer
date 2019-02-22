<?php
    include_once "conexion.php";
    if ( ! session_id() ) @ session_start();

    $conexion = new Conexion; 

    //************************borrar en la version final
    if(!isset($_SESSION['currentUser'])){
        $sql = "SELECT * FROM USUARIOS WHERE NOMBRE = 'Ivan'";
        $queryResult = $conexion::sendQuery($sql);
        $userFound = null;
        if (isset($queryResult)) {
            $userFound = $queryResult->fetch();
            $_SESSION['currentUser'] = $userFound;
        }
    }
    //**********************************
    $user = $_SESSION['currentUser'];
    function query($query) {
        global $conexion;
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

    if(isset($_POST['funcion'])){
        switch ($_POST['funcion']) {
            case "getCurrentUser":
                echo json_encode($_SESSION['currentUser']);
                break;
            case "getAllUserStats":
                echo json_encode(query("SELECT * FROM ESTADISTICAS_GENERAL WHERE TIPO = 'USUARIO'"));
                break;
            case "getAllUsers":
                echo json_encode(query("SELECT * FROM USUARIOS"));
                break;
            case "getCourseCollege":
                echo json_encode(query("SELECT * FROM INSTCURS"));
                break;
        }
    }else{
        echo json_encode("false");
    }

?>