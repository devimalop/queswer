$( document ).ready(function() {
	loadData();
});


var loadData = function(){
	$.when(
		utils.getDataFromServer("config", {funcion: "getColleges"}),
		utils.getDataFromServer("config", {funcion: "getCourses"}),
		utils.getDataFromServer("config", {funcion: "getCollegesCourses"}),
		utils.getDataFromServer("config", {funcion: "getSubjects"}),
		utils.getDataFromServer("config", {funcion: "getCurrentUser"}),
		utils.getDataFromServer("config", {funcion: "getTypeQuestion"}),
		utils.getDataFromServer("config", {funcion: "getUsers"})
	).done(function(colleges, courses, collegeCourses, subjects, currentUser, typeQuestion, users){
		if(arguments.length == 7){
			utils.setDataCache("currentUser", currentUser);
			utils.setDataCache("colleges", utils.arrayToObject(colleges, "P_INSTITUTO"));
			utils.setDataCache("courses", utils.arrayToObject(courses, "P_CURSO"));
			utils.setDataCache("collegeCourses", utils.arrayToObject(collegeCourses, "P_INSTCURS"));
			utils.setDataCache("users", utils.arrayToObject(users, "P_USUARIO"));
			utils.setDataCache("subjects", utils.arrayToObject(subjects, "P_ASIGNATURA"));
			utils.setDataCache("editAvailable", true);


			fillSelects(colleges, courses, currentUser, users, typeQuestion, collegeCourses);
			loadBindings(subjects);
		}else{
			alert("error 160-584; carga incorrecta, consulte con el administrador");
			window.location.href = "../index.html";
		}
	});
};

var goBack = function(){
	window.location.href = "main.html";
};
var editUser = function(){
	if(utils.getDataCache("editAvailable")){
		if(utils.validateDivForm("#tab1")){
			var errorMessages = [];
			utils.setDataCache("editAvailable", false);
			var dataEdit = utils.getFormData($("#tab1"), true);
			var finalData = {
				userData:{
					P_USUARIO: dataEdit.usuario,
					BONOS: dataEdit.bonos,
					TIPO_USUARIO: dataEdit.rol == "cero" ? "0" : dataEdit.rol
				},
				insert:[],
				update:[]
			};
			if(dataEdit.bonos < 0){errorMessages.push("Se debe introducir un valor positivo para los bonos.");}
			$.each($(".subject"),function(i, subj){
				finalData[$(subj).data("operation")].push({PK: $(subj).data("psubject"), NOTA: $(subj).val()});
				var subjFloat = parseFloat($(subj).val().replace(",", "."));
				if(subjFloat < 0 || subjFloat > 10){
					errorMessages.push("Las notas deben contener un valor entre 0 y 10.");
				}
			});
			if(errorMessages.length){
				showMessage("Datos incorrectos", errorMessages.join("<br>"), true);
				utils.setDataCache("editAvailable", true);
			}else{
				utils.getDataFromServer("config", {funcion:"editUserData", data:finalData}).done(function(response){
					utils.setDataCache("editAvailable", true);
					var resp = JSON.parse(JSON.stringify(response));
					if(resp === true){
						utils.getDataCache("users")[dataEdit.usuario].BONOS = dataEdit.bonos;
						utils.getDataCache("users")[dataEdit.usuario].TIPO_USUARIO = dataEdit.rol;
						showMessage("Edición usuario", "Los datos del usuario se han editado correctamente.");
					}else{
						showMessage("Error", "Error en el proceso de creación", true);
					}
				});
			}
		}else{
			showMessage("Error", "Faltan datos por completar", true);
		}
	}
};

var insertQuestion = function(){
	if(utils.getDataCache("editAvailable")){
		if(utils.validateDivForm("#tab2")){
			utils.setDataCache("editAvailable", false);
			var dataInsert = utils.getFormData($("#tab2"), true);
			utils.getDataFromServer("config", {funcion:"insertQuestion", data:dataInsert}).done(function(response){
				utils.setDataCache("editAvailable", true);
				var resp = JSON.parse(JSON.stringify(response));
				if(resp === true){
					showMessage("Pregunta insertada", "Pregunta insertada correctamente.");
				}else{
					showMessage("Error", "Error en el proceso de creación", true);
				}
			});
		}else{
			showMessage("Error", "Faltan datos por completar", true);
		}
	}
};

var editCourse = function(){
	if(utils.getDataCache("editAvailable")){
		if(utils.validateDivForm("#tab3")){
			var dataInsertTemp = utils.getFormData($("#tab3"), true);
			if(dataInsertTemp.bonoscurso > 0 && dataInsertTemp.bonoscurso <= 100){
				utils.setDataCache("editAvailable", false);
				var dataInsert = {BONOS: dataInsertTemp.bonoscurso};
				for(var collCour in utils.getDataCache("collegeCourses")){
					var currColCur = utils.getDataCache("collegeCourses")[collCour];
					if(currColCur.A_INSTITUTO == dataInsertTemp.institutocurso && currColCur.A_CURSO == dataInsertTemp.cursocurso){
						dataInsert.P_INSTCURS = currColCur.P_INSTCURS;
					}
				}
				utils.getDataFromServer("config", {funcion:"editCourse", data:dataInsert}).done(function(response){
					utils.setDataCache("editAvailable", true);
					var resp = JSON.parse(JSON.stringify(response));
					if(resp === true){
						utils.getDataCache("collegeCourses")[dataInsert.P_INSTCURS].BONOS = dataInsert.BONOS;
						showMessage("Curso Editado", "Curso editado correctamente.");
					}else{
						showMessage("Error", "Error en el proceso de edición del curso", true);
					}
				});
			}else{
				showMessage("Error", "Los bonos han de ser un valor entre 1 y 100", true);
			}
		}else{
			showMessage("Error", "Faltan datos por completar", true);
		}
	}
};

var downloadCsv = function(){
	var encabezado = JSON.parse('[{"PREGUNTA":"", "RESPUESTA A":"", "RESPUESTA B":"", "RESPUESTA C":"", "CORRECTA(A-B-C)":"", "WIKI":"", "DIFICULTAD(1-10)":"", "TEMATICA(1-GENERAL | 2-DEPORTES | 3-GEOGRAFIA | 4-HISTORIA | 5-LENGUA | 6-MATEMATICAS | 7-INGLES | 8-CIENCIAS | 9-BIOLOGIA | 10-FISICA Y QUIMICA )":""}]');
	utils.exportarCsv(encabezado, "plantilla_preguntas");
};
var uploadCsv = function(){
    var fileInput = document.getElementById("import-csv");
    var _readFile = function () {
      var reader = new FileReader();

      reader.onload = function () {
          _comprobarCsv(reader.result);
      };
      // start reading the file. When it is done, calls the onload event defined above.
      reader.readAsBinaryString(fileInput.files[0]);
    };
    var _comprobarCsv = function(csvText){
	    var infoError = "";
	    var extension = $("#import-csv").val().split(".")[$("#import-csv").val().split(".").length-1].toLowerCase();
	    if(extension == "csv"){
	    	console.log("Leyendo archivo");
	    	var totalLines = csvText.split(/\r\n|\n/);
	    	var csvData = [];
	    	var errorText = [];
	    	if(totalLines.length > 1){
		    	$.each(totalLines, function(i, line) {
		    		if(i != 0){
		    			var datLine = line.split(";");
		    			if(datLine.length == 8){
		    				if(datLine[0] == ""){
		    					errorText.push("Introduce el texto de todas las preguntas");
		    				}else if(datLine[1] == "" || datLine[2] == "" || datLine[3] == ""){
		    					errorText.push("Introduce todas las respuestas disponibles");
		    				}else if(datLine[4] == "" || (datLine[4].toUpperCase() != "A" && datLine[4].toUpperCase() != "B" && datLine[4].toUpperCase() != "C")){
		    					errorText.push("Introduce la respuesta correcta de todas las preguntas");
		    				}else if(datLine[5] == ""){
		    					errorText.push("Introduce la descripcición de wiki de todas las preguntas");
		    				}else if(parseInt(datLine[6]) < 1 || parseInt(datLine[6]) > 10){
		    					errorText.push("La dificultad ha de ser un valor entre 1 y 10");
		    				}else if(parseInt(datLine[7]) < 1 || parseInt(datLine[7]) > 10){
		    					errorText.push("La temática ha de ser un valor entre 1 y 10");
		    				}else{
		    					csvData.push(datLine);
		    				}
		    			}else{
		    				errorText.push("El número de datos introducidos no coincide con los datos requeridos");
		    			}
		    		}
		    	});
		    	if(errorText.length){
		    		if(csvData.length){
		    			utils.setDataCache("functionPostMessage", function(){insertQuestions(csvData);});
						showMessage("Errores detectados", "Se han detectado errores, aún así, se intentarán añadir las preguntas detectadas como válidas.", true);
		    		}else{
						showMessage("Errores detectados", "Se han detectado errores, no se ha encontrado ninguna pregunta válida.", true);
		    		}
		    	}else if(csvData.length){
					insertQuestions(csvData);
		    	}
	    	}else{
		      	showMessage("Error", "No se detectan líneas con datos", true);
	    	}
	    }else{
	      	showMessage("Error", "Solo se admiten archivos de tipo csv", true);
	    }
    };
    $("#import-csv").off().on("change", _readFile);
    $("#import-csv").click();
};
var insertQuestions = function(questions){
	utils.setDataCache("functionPostMessage", false);
	var finalDataQuestion = [];
	questions.forEach(function(quest, i){
		var questData = {};
		questData.TEXTO = quest[0];
		questData.A = quest[1];
		questData.B = quest[2];
		questData.C = quest[3];
		questData.CORRECTA = quest[4].toUpperCase();
		questData.WIKI = quest[5];
		questData.DIFICULTAD = quest[6];
		questData.A_TEMATICA = quest[7];

		finalDataQuestion.push(questData);
	});

	utils.getDataFromServer("config", {funcion:"insertQuestions", data:finalDataQuestion}).done(function(response){
		var resp = JSON.parse(JSON.stringify(response));
		if(resp === true){
			showMessage("Importación CSV", "Importación CSV exitosa.<br><br>Se han añadido " + questions.length + " preguntas.");
		}else{
			showMessage("Error", "Error en el proceso de inserción CSV", true);
		}
	});
};

var loadBindings = function(subjects){
	$("#return").off("click").on("click", goBack);
	$("#edit").off("click").on("click", editUser);
	$("#edit-course").off("click").on("click", editCourse);
	$("#insert-question").off("click").on("click", insertQuestion);
	$("#downloadcsv").off("click").on("click", downloadCsv);
	$("#uploadcsv").off("click").on("click", uploadCsv);

	$(".sel__box__options--curso, .sel__box__options--instituto").on("click", function(){
		$(".buttonBlue2").addClass("buttonBlue").removeClass("buttonBlue2");
		$("#user-options").css("margin-top", "0px").html("");
		$("#user-common, #edit").hide();
		var pinstituto = $("#instituto").val();
		var pcurso = $("#curso").val();
		var availableUsers = [];
		if(pinstituto && pinstituto != "0" && pcurso && pcurso != "0"){
			var ainstcurs;
			for(var collCour in utils.getDataCache("collegeCourses")){
				var currColCur = utils.getDataCache("collegeCourses")[collCour];
				if(currColCur.A_INSTITUTO == pinstituto && currColCur.A_CURSO == pcurso){
					ainstcurs = currColCur.P_INSTCURS;
				}
			}
			for(var user in utils.getDataCache("users")){
				if(utils.getDataCache("users")[user].A_INSTCURS == ainstcurs){
					availableUsers.push(utils.getDataCache("users")[user]);
				}
			}
		}
		var arrayUsers = [];
		availableUsers.forEach(function(avUser){
			arrayUsers.push(avUser.NOMBREREAL + " " + avUser.APELLIDOS);
		});

		$("[name='usuario']").val("0");
		$(".sel__placeholder--usuario").html("Usuario");

		$.each($(".sel__box--usuario span"), function(i, item){
			if($.inArray($(item).html(), arrayUsers) == -1){
				$(item).hide();
			}else{
				$(item).show();
			}
		});
	});

	$(".sel__box__options--cursocurso, .sel__box__options--institutocurso").on("click", function(){
		var pinstituto = $("#institutocurso").val();
		var pcurso = $("#cursocurso").val();
		if(pinstituto && pinstituto != "0" && pcurso && pcurso != "0"){
			var bonosCourse;
			for(var collCour in utils.getDataCache("collegeCourses")){
				var currColCur = utils.getDataCache("collegeCourses")[collCour];
				if(currColCur.A_INSTITUTO == pinstituto && currColCur.A_CURSO == pcurso){
					bonosCourse = currColCur.BONOS;
				}
			}
			$("[name='bonoscurso']").val(bonosCourse).addClass("used");
		}
	});

	$(".sel__box__options--usuario").on("click", function(){
		var currentPUser = utils.getDataCache("users")[$("#usuario").val()];
		if(currentPUser.TIPO_USUARIO == "0"){currentPUser.TIPO_USUARIO = "cero"}
		utils.getDataFromServer("config", {funcion: "getUserCalifications", data: $("#usuario").val()}).done(function(califications){
			$(".buttonBlue").addClass("buttonBlue2").removeClass("buttonBlue");
			$("#user-options").css("margin-top", "205px");
			$("#user-common, #edit").show();
			$("[name='bonos']").val(currentPUser.BONOS || "0");
			$("#rol").val(currentPUser.TIPO_USUARIO);
			$(".sel__box__options--rol").removeClass("selected");
			$("[name='rol']").parent().find(".sel__placeholder").addClass("selected_item");
			switch(currentPUser.TIPO_USUARIO){
				case "cero":
					$(".sel__placeholder--rol").html("Alumno");
					$(".sel__box__options--rol").eq(2).addClass("selected");
					break;
				case "1":
					$(".sel__placeholder--rol").html("Profesor");
					$(".sel__box__options--rol").eq(1).addClass("selected");
					break;
				case "2":
					$(".sel__placeholder--rol").html("Administrador");
					$(".sel__box__options--rol").eq(0).addClass("selected");
					break;
			}

			var califs = utils.arrayToObject(califications, "A_ASIGNATURA");
			var pcurso = $("#curso").val();
			var currentSubjects = subjects.filter(function(subj){return subj.A_CURSO == pcurso});

			var htmlText = 	'';
			currentSubjects.forEach(function(subj){
				var operation = califs[subj.P_ASIGNATURA] ? "update" : "insert";
				var califHtml = califs[subj.P_ASIGNATURA] ? califs[subj.P_ASIGNATURA].NOTA : "5";
				var pNota = califs[subj.P_ASIGNATURA] ? califs[subj.P_ASIGNATURA].P_NOTA : subj.P_ASIGNATURA;
				htmlText +=	'<div class="group">' + 
							    '<input data-psubject="' + pNota + '" data-operation="' + operation + '" value="' + califHtml + '" type="number" min="0" step="0.5" max="10" onkeypress="return event.charCode >= 48 && event.charCode <= 57" class="save-input mandatory check-numeric used subject" name="' + subj.P_ASIGNATURA + '"><span class="highlight"></span><span class="bar"></span>' + 
							    '<label>' + subj.NOMBRE + '</label>' + 
							'</div>';
			});
			$("#user-options").html(htmlText);
			$('input').blur(function() {
				var $this = $(this);
				if ($this.val())
				  $this.addClass('used');
				else
				  $this.removeClass('used');
			});
		});
	});

	$("#tab3-tab").on("click", function(){
		$(".buttonBlue").addClass("buttonBlue2").removeClass("buttonBlue");
		$("#edit, #insert-question, .img-tab").hide();
		$("#edit-course").show();
	});
	$("#tab2-tab").on("click", function(){
		$(".buttonBlue").addClass("buttonBlue2").removeClass("buttonBlue");
		$("#edit, #edit-course").hide();
		$("#insert-question, .img-tab").show();
	});
	$("#tab1-tab").on("click", function(){
		$(".buttonBlue2").addClass("buttonBlue").removeClass("buttonBlue2");
		$("#user-options").css("margin-top", "0px").html("");
		$("#user-common, #edit, #insert-question, #edit-course, .img-tab").hide();
	});

	$(".buttonBlue").addClass("buttonBlue2").removeClass("buttonBlue");
	$("#edit").show();
	$(".buttonBlue2").addClass("buttonBlue").removeClass("buttonBlue2");
	$("#user-options").css("margin-top", "0px").html("");
	$("#user-common, #edit").hide();


//************config css region
	$('input').blur(function() {
		var $this = $(this);
		if ($this.val())
		  $this.addClass('used');
		else
		  $this.removeClass('used');
	});

	var $ripples = $('.ripples');

	$ripples.on('click.Ripples', function(e) {
		var $this = $(this);
		var $offset = $this.parent().offset();
		var $circle = $this.find('.ripplesCircle');

		var x = e.pageX - $offset.left;
		var y = e.pageY - $offset.top;

		$circle.css({
		  top: y + 'px',
		  left: x + 'px'
		});

		$this.addClass('is-active');

	});

	$ripples.on('animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd', function(e) {
		$(this).removeClass('is-active');
	});

	//tabs:
	$('#material-tabs').each(function() {

		var $active, $content, $links = $(this).find('a');

		$active = $($links[0]);
		$active.addClass('active');

		$content = $($active[0].hash);

		$links.not($active).each(function() {
				$(this.hash).hide();
		});

		$(this).on('click', 'a', function(e) {

				$active.removeClass('active');
				$content.hide();

				$active = $(this);
				$content = $(this.hash);

				$active.addClass('active');
				$content.show();

				e.preventDefault();
		});
	});
//***************end region

};
var fillSelects = function(colleges, courses, currentUser, users, typeQuestion, collegeCourses){
	users.forEach(function(user){
		user.NOMBRE_COMBO =  user.NOMBREREAL + " " + user.APELLIDOS;
	});
	courses.forEach(function(course){
		course.DIFICULTAD =  course.P_CURSO * 2;
	});
	var comboRol = [{name: "Alumno", value:"cero"},{name: "Profesor", value:"1"}];
	if(currentUser.TIPO_USUARIO == "2"){
		comboRol.push({name: "Administrador", value:"2"});
	}

	utils.fillCombo("[name='instituto']", "P_INSTITUTO", "NOMBRE", colleges, false, false, false, "Instituto");
	utils.fillCombo("[name='institutocurso']", "P_INSTITUTO", "NOMBRE", colleges, false, false, false, "Instituto");
	utils.fillCombo("[name='curso']", "P_CURSO", "NOMBRE", courses, false, false, false, "Curso");
	utils.fillCombo("[name='cursocurso']", "P_CURSO", "NOMBRE", courses, false, false, false, "Curso");
	utils.fillCombo("[name='DIFICULTAD']", "DIFICULTAD", "NOMBRE", courses, false, false, false, "Dificultad");
	utils.fillCombo("[name='usuario']", "P_USUARIO", "NOMBRE_COMBO", users, true, false, false, "Usuario");
	utils.fillCombo("[name='rol']", "value", "name", comboRol, true, false, false, "Rol");
	utils.fillCombo("[name='A_TEMATICA']", "P_TEMATICA", "NOMBRE", typeQuestion, true, false, false, "Temática");
	utils.fillCombo("[name='CORRECTA']", "value", "name", [{name:"Respuesta C", value:"C"}, {name:"Respuesta B", value:"B"}, {name:"Respuesta A", value:"A"}], true, false, false, "Correcta");
	refreshSelects();

	$(".sel__placeholder").parent().on("click", function(){
		var comboApply = ["instituto", "curso", "institutocurso", "cursocurso", "usuario", "rol", "DIFICULTAD", "A_TEMATICA", "CORRECTA"];
		comboApply.forEach(function(comb){
			if($("[name='" + comb + "']").val() && $("[name='" + comb + "']").val() != "0"){
				$("[name='" + comb + "']").parent().find(".sel__placeholder").addClass("selected_item");
			}
		});
	});
	if(currentUser.TIPO_USUARIO == "2"){
		$.each($(".sel__box--usuario span"), function(i, item){
			$(item).hide();
		});
	}else{
		$("[name='bonoscurso']").val(collegeCourses[0].BONOS).addClass("used");
	}
};

var refreshSelects = function(){
	/* ===== Logic for creating fake Select Boxes ===== */
	$('.sel').each(function() {
	  $(this).children('select').css('display', 'none');
	  
	  var $current = $(this);
	  
	  $(this).find('option').each(function(i) {
	    if (i == 0) {
	      $current.prepend($('<div>', {
	        class: $current.attr('class').replace(/sel/g, 'sel__box')
	      }));
	      
	      var placeholder = $(this).text();
	      $current.prepend($('<span>', {
	        class: $current.attr('class').replace(/sel/g, 'sel__placeholder'),
	        text: placeholder,
	        'data-placeholder': placeholder
	      }));
	      
	      return;
	    }
	    
	    $current.children('div').append($('<span>', {
	      class: $current.attr('class').replace(/sel/g, 'sel__box__options'),
	      text: $(this).text()
	    }));
	  });
	});
	// Toggling the `.active` state on the `.sel`.
	$('.sel').click(function() {
	  $(this).toggleClass('active');
	});

	// Toggling the `.selected` state on the options.
	$('.sel__box__options').click(function() {
	  var txt = $(this).text();
	  var index = $(this).index();
	  
	  $(this).siblings('.sel__box__options').removeClass('selected');
	  $(this).addClass('selected');
	  
	  var $currentSel = $(this).closest('.sel');
	  $currentSel.children('.sel__placeholder').text(txt);
	  $currentSel.children('select').prop('selectedIndex', index + 1);
	});
};