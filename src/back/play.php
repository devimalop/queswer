
<?php
    include_once "conexion.php";
    if ( ! session_id() ) @ session_start();

    $conexion = new Conexion; 
    $dificultMin = 0;
    $dificultMax = 10;
    $higherDificultMin = 0;
    $higherDificultMax = 10;
	$lowerDificultMin = 0;
	$lowerDificultMax = 10;
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

    function getDifficulty($dif){
    	global $dificultMin, $dificultMax, $higherDificultMin, $higherDificultMax, $lowerDificultMin, $lowerDificultMax;
		switch($dif) {
        	case "1":
                $dificultMin = 0;
                $dificultMax = 3;

                $higherDificultMin = 3;
                $higherDificultMax = 5;

                $lowerDificultMin = 0;
    			$lowerDificultMax = 3;
                break;
        	case "2":
                $dificultMin = 3;
    			$dificultMax = 5;

                $higherDificultMin = 5;
                $higherDificultMax = 7;

                $lowerDificultMin = 0;
                $lowerDificultMax = 3;
                break;
        	case "3":
                $dificultMin = 5;
    			$dificultMax = 7;

                $higherDificultMin = 7;
                $higherDificultMax = 10;

                $lowerDificultMin = 5;
                $lowerDificultMax = 7;
                break;
        	case "4":
                $dificultMin = 7;
    			$dificultMax = 10;

                $higherDificultMin = 7;
                $higherDificultMax = 10;

                $lowerDificultMin = 5;
                $lowerDificultMax = 7;
                break;
        }
    }

    function getQuestions($conexion){
    	global $dificultMin, $dificultMax, $higherDificultMin, $higherDificultMax, $lowerDificultMin, $lowerDificultMax, $user;
    	$instCurs = $user["A_INSTCURS"];
    	$difAc = query($conexion, "SELECT A_CURSO FROM `INSTCURS` WHERE P_INSTCURS = '$instCurs'");
        getDifficulty($difAc[0]['A_CURSO']);
        // return query($conexion, "SELECT * FROM `PREGUNTAS` WHERE DIFICULTAD >= '$dificultMin' AND DIFICULTAD <= '$dificultMax' ORDER BY RAND() LIMIT 10");
        //Obtenemos las asgnaturas y las convertimos en un objeto;
        $subjects = [];
        $subjectsTemp = query($conexion, "SELECT * FROM ASIGNATURAS");
        foreach ($subjectsTemp as $subjectTemp) {
            $psubject = $subjectTemp["P_ASIGNATURA"];
            $subjects[$psubject] = $subjectTemp;
        }

        $calificationTypeQuestion = [];
        // Obtenemos sus calificaciones
        $calificationsSchool = query($conexion, "SELECT * FROM NOTAS WHERE A_USUARIO = ".$user["P_USUARIO"]);
        foreach ($calificationsSchool as $califSchool) {
            $asubject = $califSchool["A_ASIGNATURA"];
            $atematica = $subjects[$asubject]["A_TEMATICA"];

            $calificationTypeQuestion[$atematica] = $califSchool["NOTA"];
        }

        //Obtenemos los resultados de la aplicación y hacemos la media en caso de que exista calificación escolar
        $calificationsApp = query($conexion, "SELECT * FROM ESTADISTICAS_GENERAL WHERE TIPO = 'USUARIO' AND IDENTIFICADOR = ".$user["P_USUARIO"]);
        foreach ($calificationsApp as $califSchool) {
            $atematica = $califSchool["A_TEMATICA"];
            $calification = 10 * ($califSchool["ACIERTOS"] / $califSchool["TOTAL"]);

            if(isset($calificationTypeQuestion[$atematica])){
                $calificationTypeQuestion[$atematica] = (($calification + $calificationTypeQuestion[$atematica]) / 2);   
            }else{
                $calificationTypeQuestion[$atematica] = $calification;   
            }
        }

        //Si el resultado de la media es:
        //  menor que 4  -> seleccionamos 3 preguntas y bajamos el nivel si es posible
        //  entre 4 y 7  -> seleccionamos 2 preguntas del nivel correspondiente
        //  mayor que 7  -> seleccionamos 2 preguntas y subimos el nivel si es posible
        //  Resto        -> seleccionamos 2 preguntas de cada una de las temáticas que no estén incluidas en la selección anterior
        $finalQuestionArray = [];
        for ($i = 1; $i <= 10; $i++) {
            $questionsTemp;
            if(isset($calificationTypeQuestion[$i])){
                if($calificationTypeQuestion[$i] < 4){
                    $questionsTemp = query($conexion, "SELECT * FROM PREGUNTAS WHERE DIFICULTAD >= '$lowerDificultMin' AND DIFICULTAD <= '$lowerDificultMax' AND A_TEMATICA = '$i' ORDER BY RAND() LIMIT 3");
                }else if($calificationTypeQuestion[$i] < 7){
                    $questionsTemp = query($conexion, "SELECT * FROM PREGUNTAS WHERE DIFICULTAD >= '$dificultMin' AND DIFICULTAD <= '$dificultMax' AND A_TEMATICA = '$i' ORDER BY RAND() LIMIT 2");
                }else{
                    $questionsTemp = query($conexion, "SELECT * FROM PREGUNTAS WHERE DIFICULTAD >= '$higherDificultMin' AND DIFICULTAD <= '$higherDificultMax' AND A_TEMATICA = '$i' ORDER BY RAND() LIMIT 2");
                }
            }else{
                $questionsTemp = query($conexion, "SELECT * FROM PREGUNTAS WHERE DIFICULTAD >= '$dificultMin' AND DIFICULTAD <= '$dificultMax' AND A_TEMATICA = '$i' ORDER BY RAND() LIMIT 2");
            }
            foreach ($questionsTemp as $questionTemp) {
                array_push($finalQuestionArray, $questionTemp);
            }
        }

        //Finalmente, desordenamos el array, y nos quedamos con los 10 primeros elementos del array
        shuffle($finalQuestionArray);

        $finalTenQuestionArray = array_slice($finalQuestionArray, 0, 10, true);  

        return $finalTenQuestionArray;
    }

    function getCurrentInstCurs(){
        global $user, $conexion;
        $aInstCurs = $user["A_INSTCURS"];
        $instCurs = query($conexion, "SELECT * FROM `INSTCURS` WHERE P_INSTCURS = '$aInstCurs'");
        return $instCurs[0];
    }

    function addUserBono($data){
        global $conexion, $user;
        $transaction = ["UPDATE USUARIOS SET BONOS = " . $data . " WHERE P_USUARIO = " . $user["P_USUARIO"] . ";"];
        $transactionResult = $conexion::realizatransaccion($transaction);
        return $transactionResult;
    }

    function addUserStats($data){
        global $conexion, $user;

        $transaction = [];
        foreach ($data as $dat) {
            $pusuario = $user['P_USUARIO'];
            $ppregunta = $dat['P_PREGUNTA'];
            $date =  $dat['date'];
            $acierto = $dat['ACIERTO'];
            array_push($transaction, "INSERT INTO ESTADISTICAS_USUARIO VALUES (0, $pusuario,$ppregunta,'$date',$acierto);");
        }
        $transactionResult = $conexion::realizatransaccion($transaction);
        return $transactionResult;
    }

    function addGeneralStats($data){
        global $conexion, $user;

        $transaction = [];
        foreach ($data as $dat) {
            $atematica = $dat['A_TEMATICA'];
            $identificador = $dat['IDENTIFICADOR'];
            $tipo =  $dat['TIPO'];

            $aciertos =  $dat['ACIERTOS'];
            $total =  $dat['TOTAL'];

            $dataExists = query($conexion, "SELECT * FROM `ESTADISTICAS_GENERAL` WHERE A_TEMATICA = '" . $atematica . "' AND IDENTIFICADOR = '" . $identificador . "' AND TIPO = '" . $tipo . "'");
            if(empty($dataExists)){
                array_push($transaction, "INSERT INTO ESTADISTICAS_GENERAL VALUES (0, $identificador, '$tipo', $atematica, $aciertos, $total);");
            }else{
                $pest = $dataExists[0]["P_ESTADISTICAS_GENERAL"];
                $aciertosNew = $dataExists[0]["ACIERTOS"] + $aciertos;
                $totalNew = $dataExists[0]["TOTAL"] + $total;
                array_push($transaction, "UPDATE ESTADISTICAS_GENERAL SET ACIERTOS = " . $aciertosNew . " , TOTAL = " . $totalNew . " WHERE P_ESTADISTICAS_GENERAL = " . $pest . ";");
            }
        }
        $transactionResult = $conexion::realizatransaccion($transaction);
        return $transactionResult;
    }

    if(isset($_POST['funcion'])){
        switch ($_POST['funcion']) {
            case "getCurrentUser":
                echo json_encode($user);
                break;
        	case "getCurrentInstCurs":
                echo json_encode(getCurrentInstCurs());
                break;
            case "getQuestions":
                echo json_encode(getQuestions($conexion));
                break;
            case "getTypeQuestion":
                echo json_encode(query($conexion, "SELECT * FROM TEMATICA"));
                break;
            case "addUserStats":
                echo json_encode(addUserStats($_POST['data']));
                break;
            case "addGeneralStats":
                echo json_encode(addGeneralStats($_POST['data']));
                break;
            case "addUserBono":
                echo json_encode(addUserBono($_POST['data']));
                break;
        }
    }else{
        echo json_encode("false");
    }

?>