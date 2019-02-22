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


    if(isset($_POST['funcion'])){
        switch ($_POST['funcion']) {
            case "getColleges":
                if($user["TIPO_USUARIO"] == "2"){
                    echo json_encode(query($conexion, "SELECT * FROM INSTITUTOS"));
                }else{
                    echo json_encode(query($conexion, "SELECT * FROM INSTITUTOS WHERE P_INSTITUTO = (SELECT A_INSTITUTO FROM INSTCURS WHERE P_INSTCURS = '".$user["A_INSTCURS"]."')"));
                }
                break;
            case "getCourses":
                if($user["TIPO_USUARIO"] == "2"){
                    echo json_encode(query($conexion, "SELECT * FROM CURSOS ORDER BY P_CURSO DESC"));
                }else{
                    echo json_encode(query($conexion, "SELECT * FROM CURSOS WHERE P_CURSO = (SELECT A_CURSO FROM INSTCURS WHERE P_INSTCURS = '".$user["A_INSTCURS"]."')"));
                }
                break;
            case "getCollegesCourses":
                if($user["TIPO_USUARIO"] == "2"){
                    echo json_encode(query($conexion, "SELECT * FROM INSTCURS"));
                }else{
                    echo json_encode(query($conexion, "SELECT * FROM INSTCURS WHERE P_INSTCURS = '".$user["A_INSTCURS"]."'"));
                }
                break;
            case "getCurrentUser":
                echo json_encode($user);
                break;
            case "getUsers":
                if($user["TIPO_USUARIO"] == "2"){
                    echo json_encode(query($conexion, "SELECT * FROM USUARIOS"));
                }else if($user["TIPO_USUARIO"] == "1"){
                    echo json_encode(query($conexion, "SELECT * FROM USUARIOS WHERE A_INSTCURS = '".$user["A_INSTCURS"]."'"));
                }else{
                    $currentUserArray = array();
                    array_push($currentUserArray, $user);
                    echo json_encode($currentUserArray);
                }
                break;
            case "getTypeQuestion":
                echo json_encode(query($conexion, "SELECT * FROM TEMATICA"));
                break;
            case "getUserSuccess":
                echo json_encode(query($conexion, "SELECT * FROM ESTADISTICAS_GENERAL WHERE TIPO = 'USUARIO' AND IDENTIFICADOR = '".$_POST['id']."'"));
                break;
            case "getCollegeCourseSuccess":
                echo json_encode(query($conexion, "SELECT * FROM ESTADISTICAS_GENERAL WHERE TIPO = 'INSTCURS' AND IDENTIFICADOR = '".$_POST['id']."'"));
                break;
            case "getCourseSuccess":
                echo json_encode(query($conexion, "SELECT * FROM ESTADISTICAS_GENERAL WHERE TIPO = 'CURSO' AND IDENTIFICADOR = '".$_POST['id']."'"));
                break;
            case "getCollegeSuccess":
                echo json_encode(query($conexion, "SELECT * FROM ESTADISTICAS_GENERAL WHERE TIPO = 'INSTITUTO' AND IDENTIFICADOR = '".$_POST['id']."'"));
                break;
            case "getFrecuencyStats":
                echo json_encode(query($conexion, "SELECT COUNT(P_ESTADISTICAS_USUARIO) AS PREGUNTAS, FECHA FROM ESTADISTICAS_USUARIO WHERE A_USUARIO = '".$_POST['id']."' GROUP BY FECHA"));
                break;
        }
    }else{
        echo json_encode("false");
    }

?>