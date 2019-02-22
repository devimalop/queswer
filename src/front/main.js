$( document ).ready(function() {
	utils.getDataFromServer("main", {funcion: "getCurrentUser"}).done(function(currentUser){
		$("#wellcome").html("Bienvenido,  " + currentUser.NOMBRE + ":");
		if(currentUser.TIPO_USUARIO == "0"){
			$("#best").show();
		}else{
			$("#config").show();
		}
		loadBindings(currentUser);
	});
});

var loadBindings = function(currentUser){
	$("#play").off("click").on("click", function(){
		window.location.href = "play.html";
	});
	$("#stats").off("click").on("click", function(){
		window.location.href = "stats.html";
	});
	$("#config").off("click").on("click", function(){
		window.location.href = "config.html";
	});
	$("#exit").off("click").on("click", function(){
		var r = confirm("¿Regresar a la pantalla de Login?");
	    if (r) {
			window.location.href = "../index.html";
	    } 
	});
	$("#best").off("click").on("click", function(){
		$.when(
			utils.getDataFromServer("main", {funcion: "getAllUserStats"}),
			utils.getDataFromServer("main", {funcion: "getAllUsers"}),
			utils.getDataFromServer("main", {funcion: "getCourseCollege"}),
		).done(function(userStats, users, courseCollege){
			var courseCollegeObject = utils.arrayToObject(courseCollege, "P_INSTCURS");
			currentUser.A_INSTITUTO = courseCollegeObject[currentUser.A_INSTCURS].A_INSTITUTO;
			currentUser.A_CURSO = courseCollegeObject[currentUser.A_INSTCURS].A_CURSO;
			users.forEach(function(us){
				us.A_INSTITUTO = courseCollegeObject[us.A_INSTCURS].A_INSTITUTO;
				us.A_CURSO = courseCollegeObject[us.A_INSTCURS].A_CURSO;
				us.TOTAL = 0;
				us.ACIERTOS = 0;
			});
			var usersObject = utils.arrayToObject(users, "P_USUARIO");

			userStats.forEach(function(usStat){
				usersObject[usStat.IDENTIFICADOR].TOTAL += parseInt(usStat.TOTAL);
				usersObject[usStat.IDENTIFICADOR].ACIERTOS += parseInt(usStat.ACIERTOS);
			});

			var nombreMaxCourseCollege;
			var nombreMaxCourse;
			var nombreMaxCollege;
			var nombreMaxGlobal;

			var maxCourseCollege = 0;
			var maxCourse = 0;
			var maxCollege = 0;
			var maxGlobal = 0;

			for(var usr in usersObject){
				usersObject[usr].MARCADOR = Math.round(10000 * usersObject[usr].ACIERTOS / usersObject[usr].TOTAL)/100;
				if(usersObject[usr].A_INSTCURS == currentUser.A_INSTCURS){
					if(usersObject[usr].MARCADOR > maxCourseCollege){
						maxCourseCollege = usersObject[usr].MARCADOR;
						nombreMaxCourseCollege = usersObject[usr].NOMBRE + " (" + usersObject[usr].MARCADOR + "%)";
					}
				}
				if(usersObject[usr].A_CURSO == currentUser.A_CURSO){
					if(usersObject[usr].MARCADOR > maxCourse){
						maxCourse = usersObject[usr].MARCADOR;
						nombreMaxCourse = usersObject[usr].NOMBRE + " (" + usersObject[usr].MARCADOR + "%)";
					}
				}
				if(usersObject[usr].A_INSTITUTO == currentUser.A_INSTITUTO){
					if(usersObject[usr].MARCADOR > maxCollege){
						maxCollege = usersObject[usr].MARCADOR;
						nombreMaxCollege = usersObject[usr].NOMBRE + " (" + usersObject[usr].MARCADOR + "%)";
					}
				}
				if(usersObject[usr].MARCADOR > maxGlobal){
					maxGlobal = usersObject[usr].MARCADOR;
					nombreMaxGlobal = usersObject[usr].NOMBRE + " (" + usersObject[usr].MARCADOR + "%)";
				}
			}

			$("#best-collegecourse").html(nombreMaxCourseCollege || "¡nadie!");
			$("#best-course").html(nombreMaxCourse || "¡nadie!");
			$("#best-college").html(nombreMaxCollege || "¡nadie!");
			$("#best-global").html(nombreMaxGlobal || "¡nadie!");


			$(".main-info").hide();
			$(".bests-info").show();
		});
	});
	$("#back").off("click").on("click", function(){
		$(".main-info").show();
		$(".bests-info").hide();
	});
	$(document).on('keydown', function ( e ) {
	    if ((e.metaKey || e.ctrlKey) && ( String.fromCharCode(e.which).toLowerCase() === 'q') ) {
	        alert("To demo");
	    }
	});
};