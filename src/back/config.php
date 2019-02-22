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

    
    function editUserData($data){
        global $conexion, $user;

        $transaction = [];
        array_push($transaction, "UPDATE USUARIOS SET BONOS = " . $data["userData"]["BONOS"] . " , TIPO_USUARIO = " . $data["userData"]["TIPO_USUARIO"]  . " WHERE P_USUARIO = " . $data["userData"]["P_USUARIO"] . ";");
        if(isset($data["insert"])){
            foreach ($data["insert"] as $insert) {
                array_push($transaction, "INSERT INTO NOTAS VALUES (0, " . $data["userData"]["P_USUARIO"] . ", " . $insert["PK"] . ", " . $insert["NOTA"] . ");");
            }
        }
        if(isset($data["update"])){
            foreach ($data["update"] as $update) {
                array_push($transaction, "UPDATE NOTAS SET NOTA = " . $update["NOTA"] . " WHERE P_NOTA = " . $update["PK"] . ";");
            }
        }
        $transactionResult = $conexion::realizatransaccion($transaction);
        return $transactionResult;
    }

    function insertQuestion($data){
        global $conexion, $user;

        $transaction = "INSERT INTO PREGUNTAS VALUES (0, '" . $data["TEXTO"] . "', '" . $data["A"] . "', '" . $data["B"] . "', '" . $data["C"] . "', '" . $data["CORRECTA"] . "', " . $data["A_TEMATICA"] . ", " . $data["DIFICULTAD"] . ", '" . $data["WIKI"] . "');";
       
        $transactionResult = $conexion::realizatransaccion([$transaction]);
        return $transactionResult;
    }

    function insertQuestions($data){
        global $conexion, $user;

        $transaction = [];
       
        foreach ($data as $quest) {
            array_push($transaction, "INSERT INTO PREGUNTAS VALUES (0, '" . $quest["TEXTO"] . "', '" . $quest["A"] . "', '" . $quest["B"] . "', '" . $quest["C"] . "', '" . $quest["CORRECTA"] . "', " . $quest["A_TEMATICA"] . ", " . $quest["DIFICULTAD"] . ", '" . $quest["WIKI"] . "');");
        }
        $transactionResult = $conexion::realizatransaccion($transaction);
        return $transactionResult;
    }

    function editCourse($data){
        global $conexion;

        $transaction = "UPDATE INSTCURS SET BONOS = " . $data["BONOS"] . " WHERE P_INSTCURS = " . $data["P_INSTCURS"] . ";";
       
        $transactionResult = $conexion::realizatransaccion([$transaction]);

        return $transactionResult;
    }


    if(isset($_POST['funcion'])){
        switch ($_POST['funcion']) {
            case "getColleges":
                if($user["TIPO_USUARIO"] == "2"){
                    echo json_encode(query("SELECT * FROM INSTITUTOS"));
                }else{
                    echo json_encode(query("SELECT * FROM INSTITUTOS WHERE P_INSTITUTO = (SELECT A_INSTITUTO FROM INSTCURS WHERE P_INSTCURS = '".$user["A_INSTCURS"]."')"));
                }
                break;
            case "getCourses":
                if($user["TIPO_USUARIO"] == "2"){
                    echo json_encode(query("SELECT * FROM CURSOS ORDER BY P_CURSO DESC"));
                }else{
                    echo json_encode(query("SELECT * FROM CURSOS WHERE P_CURSO = (SELECT A_CURSO FROM INSTCURS WHERE P_INSTCURS = '".$user["A_INSTCURS"]."')"));
                }
                break;
            case "getCollegesCourses":
                if($user["TIPO_USUARIO"] == "2"){
                    echo json_encode(query("SELECT * FROM INSTCURS"));
                }else{
                    echo json_encode(query("SELECT * FROM INSTCURS WHERE P_INSTCURS = '".$user["A_INSTCURS"]."'"));
                }
                break;
            case "getCurrentUser":
                echo json_encode($user);
                break;
            case "getUsers":
                if($user["TIPO_USUARIO"] == "2"){
                    echo json_encode(query("SELECT * FROM USUARIOS"));
                }else if($user["TIPO_USUARIO"] == "1"){
                    echo json_encode(query("SELECT * FROM USUARIOS WHERE A_INSTCURS = '".$user["A_INSTCURS"]."'"));
                }else{
                    $currentUserArray = array();
                    array_push($currentUserArray, $user);
                    echo json_encode($currentUserArray);
                }
                break;
            case "getSubjects":
                echo json_encode(query("SELECT * FROM ASIGNATURAS"));
                break;
            case "getTypeQuestion":
                echo json_encode(query("SELECT * FROM TEMATICA"));
                break;
            case "getUserCalifications":
                echo json_encode(query("SELECT * FROM NOTAS WHERE A_USUARIO ='".$_POST['data']."'"));
                break;
            case "editUserData":
                echo json_encode(editUserData($_POST['data']));
                break;
            case "insertQuestion":
                echo json_encode(insertQuestion($_POST['data']));
                break;
            case "insertQuestions":
                echo json_encode(insertQuestions($_POST['data']));
                break;
            case "editCourse":
                echo json_encode(editCourse($_POST['data']));
                break;
        }
    }else{
        echo json_encode("false");
    }

?>