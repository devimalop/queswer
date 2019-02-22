$( document ).ready(function() {
	initStats();
});

	

var initStats = function(){
	loadData();
	// loadChart();
};

var loadData = function(){
	$.when(
		utils.getDataFromServer("stats", {funcion: "getColleges"}),
		utils.getDataFromServer("stats", {funcion: "getCourses"}),
		utils.getDataFromServer("stats", {funcion: "getCollegesCourses"}),
		utils.getDataFromServer("stats", {funcion: "getTypeQuestion"}),
		utils.getDataFromServer("stats", {funcion: "getCurrentUser"}),
		utils.getDataFromServer("stats", {funcion: "getUsers"})
	).done(function(colleges, courses, collegeCourses, typeQuestion, currentUser, users){
		if(arguments.length == 6){
			utils.setDataCache("currentUser", currentUser);
			utils.setDataCache("colleges", utils.arrayToObject(colleges, "P_INSTITUTO"));
			utils.setDataCache("courses", utils.arrayToObject(courses, "P_CURSO"));
			utils.setDataCache("collegeCourses", utils.arrayToObject(collegeCourses, "P_INSTCURS"));
			utils.setDataCache("users", utils.arrayToObject(users, "P_USUARIO"));
			utils.setDataCache("typeQuestion", utils.arrayToObject(typeQuestion, "P_TEMATICA"));


			fillSelects(colleges, courses, typeQuestion, currentUser, users);
			loadBindings(collegeCourses, users);
		}else{
			alert("error 160-584; carga incorrecta, consulte con el administrador");
			window.location.href = "../index.html";
		}
	});
};



var goBack = function(){
	window.location.href = "main.html";
};

var fillSelects = function(colleges, courses, typeQuestion, currentUser, users){
	users.forEach(function(user){
		user.NOMBRE_COMBO =  user.NOMBREREAL + " " + user.APELLIDOS;
	});
	typeQuestion = typeQuestion.concat([{P_TEMATICA:"0", NOMBRE:"TODAS"}]);
	colleges = colleges.concat([{P_INSTITUTO:"0", NOMBRE:"TODOS"}]);
	courses = courses.concat([{P_CURSO:"0", NOMBRE:"TODOS"}]);

	var chartType = [
		{P_TIPO:"1" ,NOMBRE: "Porc. Aciertos"},
		{P_TIPO:"2" ,NOMBRE: "Resp. Totales"},
		{P_TIPO:"3" ,NOMBRE: "Frecuencia Uso"},
	];
	var rangeOptions = [
		{name: "60 días", value:"60"},
		{name: "30 días", value:"30"},
		{name: "15 días", value:"15"}
	];
	// var usersCombo = currentUser.TIPO_USUARIO == "0" ? currentUser : users;
	utils.fillCombo("[name='instituto']", "P_INSTITUTO", "NOMBRE", colleges, false, false, false, "Instituto");
	utils.fillCombo("[name='curso']", "P_CURSO", "NOMBRE", courses, false, false, false, "Curso");
	utils.fillCombo("[name='tematica']", "P_TEMATICA", "NOMBRE", typeQuestion, false, false, false, "Temática");
	utils.fillCombo("[name='usuario']", "P_USUARIO", "NOMBRE_COMBO", users, true, false, false, "Usuario");
	utils.fillCombo("[name='tipografica']", "P_TIPO", "NOMBRE", chartType, false, false, false, "Tipo");
	utils.fillCombo("[name='range']", "value", "name", rangeOptions, false, false, false, "Rango");
	refreshSelects();

	$(".sel__placeholder").parent().on("click", function(){
		if($("[name='instituto']").val() && $("[name='instituto']").val() != "0"){
			$("[name='instituto']").parent().find(".sel__placeholder").addClass("selected_item");
		}
		if($("[name='curso']").val() && $("[name='curso']").val() != "0"){
			$("[name='curso']").parent().find(".sel__placeholder").addClass("selected_item");
		}
		if($("[name='usuario']").val() && $("[name='usuario']").val() != "0"){
			$("[name='usuario']").parent().find(".sel__placeholder").addClass("selected_item");
		}
		if($("[name='tematica']").val() && $("[name='tematica']").val() != "0"){
			$("[name='tematica']").parent().find(".sel__placeholder").addClass("selected_item");
		}
		if($("[name='tipografica']").val() && $("[name='tipografica']").val() != "0"){
			$("[name='tipografica']").parent().find(".sel__placeholder").addClass("selected_item");
		}
		if($("[name='range']").val() && $("[name='range']").val() != "0"){
			$("[name='range']").parent().find(".sel__placeholder").addClass("selected_item");
		}
	});

	$.each($(".sel__box--usuario span"), function(i, item){
		$(item).hide();
	});
};

var loadBindings = function(collegeCourses, users){
	$("#return").off("click").on("click", goBack);
	$("#ver").off("click").on("click", firstChartLoad);
	$(".sel__box__options--tipografica").on("click", function(){
		var chartType = $("[name='tipografica']").val();
		if(chartType == "3"){
			$(".sel--tematica").parent().hide();
			$(".sel--range").parent().show();
		}else{
			$(".sel--tematica").parent().show();
			$(".sel--range").parent().hide();
		}
	});

	$(".sel__box__options--curso, .sel__box__options--instituto").on("click", function(){
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

	var _makeComboMultiple = function(idCombo){
		utils.setDataCache("combo" + idCombo, "0");
		$(".sel__box__options--" + idCombo).on("click", function(){
			var pSelected = $("#" + idCombo).val();
			if(pSelected == "0"){
				utils.setDataCache("combo" + idCombo, "0");
			}else{
				var actualSelection = utils.getDataCache("combo" + idCombo);
				var indexArray = $.inArray(pSelected, actualSelection);
				if(actualSelection == "0"){
					utils.setDataCache("combo" + idCombo, [pSelected]);
				}else if(indexArray == -1){
					actualSelection.push(pSelected);
				    utils.setDataCache("combo" + idCombo, actualSelection);
				}else{
					actualSelection.splice(indexArray, 1);
				    utils.setDataCache("combo" + idCombo, actualSelection);
				}
			}
			var newData = utils.getDataCache("combo" + idCombo);
			if(newData != "0"){
				var placeholderText;
				$.each($(".sel__box__options--" + idCombo), function(i, optionCombo){
					if($.inArray($("#" + idCombo + " option").eq(i+1).attr("value"), newData) == -1){
						$(optionCombo).removeClass("selected");
					}else{
						$(optionCombo).addClass("selected");
						var textAdd = $("#" + idCombo + " option").eq(i+1).html()
						placeholderText = placeholderText ? (placeholderText + ", " + textAdd) : textAdd;
					}
				});
				$(".sel__placeholder--" + idCombo).html(placeholderText);
			}

		});
	};
	_makeComboMultiple("tematica");

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
//***************end region

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

var firstChartLoad = function(){
	var chartType = $("[name='tipografica']").val();
	loadChartData().done(function(dat){
		if(dat){
			if(chartType != "3"){
				loadChart(dat.column1, dat.column2, dat.finalData, dat.title);
			}else{
				loadChartFrecuency(dat);
			}
		}
	});
};


var loadChartData = function(){
	var d = $.Deferred();
	var college = $("[name='instituto']").val();
	var course = $("[name='curso']").val();
	var typeQuestion = utils.getDataCache("combotematica");
	var user = $("[name='usuario']").val();
	var range = $("[name='range']").val();
	var chartType = $("[name='tipografica']").val();
	var title = chartType == "1" ? "Aciertos" : "Total";

	if((college && college != "0" || course && course != "0") && chartType && chartType != "0"){
		var getDataFunction;
		var idElement;
		var stop = false;
		switch(chartType){
			case "1":
			case "2":
				if(user && user != "0"){
					getDataFunction = "getUserSuccess";
					idElement = user;
					title += " del usuario " + $("[name='usuario']").parent().find(":selected").html();
				}else if(course && course != "0" && college && college != "0"){
					getDataFunction = "getCollegeCourseSuccess";
					for(var pinstcurs in utils.getDataCache("collegeCourses")){
						if(utils.getDataCache("collegeCourses")[pinstcurs].A_INSTITUTO == college && utils.getDataCache("collegeCourses")[pinstcurs].A_CURSO == course){
							idElement = pinstcurs;
						}
					}
					title += " del Instituto " + $("[name='instituto']").parent().find(":selected").html() + ", y del Curso " + $("[name='curso']").parent().find(":selected").html();
				}else if(course && course != "0"){
					getDataFunction = "getCourseSuccess";
					idElement = course;
					title += " del Curso " + $("[name='curso']").parent().find(":selected").html();
				}else{
					getDataFunction = "getCollegeSuccess";
					idElement = college;
					title += " del Instituto " + $("[name='instituto']").parent().find(":selected").html();
				}
				break;
			case "3":
				if(user && user != "0" && range && range != "0"){
					getDataFunction = "getFrecuencyStats";
					idElement = user;
					title = "Frecuencia de uso del Usuario " + $(".sel__placeholder--usuario").html();
				}else{
					stop = true;
					showMessage("Seleccione un usuario y rango", "Para las estadísticas de Frecuencia, se debe seleccionar primero un usuario y un rango.<br><br>(Se debe seleccionar previamente un instituto y curso)", true);
				}
				break;
		}
		if(!stop){
			utils.getDataFromServer("stats", {funcion: getDataFunction, id: idElement}).done(function(dataChart){
				if(dataChart && dataChart.length){
					d.resolve(formatChartData(dataChart, chartType, typeQuestion, title));
				}else{
					showMessage("No existen Datos", "No se han encontrado datos con esas opciones.", true);
				}
			})
		}
	}else{
		showMessage("Opciones insuficientes", "Se ha de seleccionar al menos el instituto y/o curso y el tipo de gráfica.", true)
	}
	return d.promise();
};


var formatChartData = function(dataChart, chartType, typeQuestion, title){
	var colors = ["#B3E5FC", "#81D4FA", "#4FC3F7", "#29B6F6", "#03A9F4", "#039BE5", "#0288D1", "#0277BD", "#01579B"];
	var column1;
	var column2;
	var finalData = [];
	var dataFrecuency = [];

	switch(chartType){
		case "1":
			var _addData = function(dat, i){
				var percent = Math.round(10000*dat.ACIERTOS/dat.TOTAL)/100;
				finalData.push([utils.getDataCache("typeQuestion")[dat.A_TEMATICA].NOMBRE, percent, "color: " + colors[i]]);
			};
			column1 = {type:'string', text:'Temática'};
			column2 = {type:'number', text:'Aciertos'};
			dataChart.forEach(function(dat, i){
				if(!typeQuestion || typeQuestion == "0"){
					_addData(dat, i);
				}else if($.inArray(dat.A_TEMATICA, typeQuestion) != -1){
					_addData(dat, i);
				}
			});
			break;
		case "2":
			var _addData = function(dat, i){
				var tot = parseInt(dat.TOTAL);
				finalData.push([utils.getDataCache("typeQuestion")[dat.A_TEMATICA].NOMBRE, tot, "color: " + colors[i]]);
			};
			column1 = {type:'string', text:'Temática'};
			column2 = {type:'number', text:'Total Respuestas'};
			dataChart.forEach(function(dat, i){
				if(!typeQuestion || typeQuestion == "0"){
					_addData(dat, i);
				}else if($.inArray(dat.A_TEMATICA, typeQuestion) != -1){
					_addData(dat, i);
				}
			});
			break;
		case "3":
			dataChart.forEach(function(dat, i){
				var year = parseInt(dat.FECHA.split("-")[0]);
				var month = parseInt(dat.FECHA.split("-")[1]) - 1;
				var day = parseInt(dat.FECHA.split("-")[2]);

				var value = parseInt(dat.PREGUNTAS);

				dataFrecuency.push([new Date(year, month, day), value]);
			});
			break;
	}
	if(chartType == "3"){
		return {dat: dataFrecuency, title: title};
	}else{
		return {column1: column1, column2: column2, finalData: finalData, title: title};
	}
}

var loadChart = function(column1, column2, chartData, title){
    var chart, data;
	google.charts.load('current', {'packages':['corechart', 'bar'], 'language': 'es'});

    var options = {
    	title: title,
        width:900,
        height:700,
		animation:{
	      duration: 1000,
	      easing: 'out',
	    },
	    legend: 'none',
		backgroundColor: { fill:'transparent' }
	};

	google.charts.setOnLoadCallback(firstDraw);
    function firstDraw(){
    	chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    	reloadData();
    	drawChart();
    };

  	function drawChart() {
    	chart.draw(data, options);
	};

	function reloadData(){
		data = new google.visualization.DataTable();
	    data.addColumn(column1.type, column1.text);
	    data.addColumn(column2.type, column2.text);
	    data.addColumn({type: 'string', role: 'style'});
	    data.addRows(chartData);
	};

    $("#ver").off("click").on("click",function() {
    	var chartType = $("[name='tipografica']").val();
    	loadChartData().done(function(dat){
			if(dat){
				if(chartType != "3"){
			    	column1 = dat.column1;
			    	column2 = dat.column2;
			    	chartData = dat.finalData;
			    	options.title = dat.title;
			    	reloadData();
			    	drawChart();
				}else{
					$("#ver").off("click").on("click", firstChartLoad);
					loadChartFrecuency(dat);
				}
		  	}
		});
    });
};
var loadChartFrecuency = function(frecuencyData, title){
	google.charts.load('current', {'packages':['corechart'], 'language': 'es'});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var today = new Date();
    	var daysBefore = parseInt($("[name='range']").val());
		var priorDate = new Date(new Date().setDate(today.getDate()-daysBefore));

      var data = new google.visualization.DataTable();
      data.addColumn('datetime', 'Día');
      data.addColumn('number', 'Preguntas Contestadas');

      data.addRows(frecuencyData.dat);

      var options = {
    	title: frecuencyData.title,
        width: 900,
        height: 600,
        legend: {position: 'none'},
        // enableInteractivity: false,
        chartArea: {
          width: '85%'
        },
        hAxis: {
          viewWindow: {
            min: new Date(priorDate.getFullYear(), priorDate.getMonth(), priorDate.getUTCDate()),
            max: new Date(today.getFullYear(), today.getMonth(), today.getUTCDate())
          },
          gridlines: {
            count: -1,
            units: {
              days: {format: ['MMM dd']}/*,
              hours: {format: ['HH:mm', 'ha']},*/
            }
          }/*,
          minorGridlines: {
            units: {
              hours: {format: ['hh:mm:ss a', 'ha']},
              minutes: {format: ['HH:mm a Z', ':mm']}
            }
          }*/
        }
      };

      var chart = new google.visualization.LineChart(
       document.getElementById('chart_div'));

      chart.draw(data, options);

      /*var button = document.getElementById('change');
      var isChanged = false;

      button.onclick = function () {
        if (!isChanged) {
          options.hAxis.viewWindow.min = new Date(2015, 0, 1);
          options.hAxis.viewWindow.max = new Date(2015, 0, 1, 3);
          isChanged = true;
        } else {
          options.hAxis.viewWindow.min = new Date(2014, 11, 31, 18),
          options.hAxis.viewWindow.max = new Date(2015, 0, 3, 1)
          isChanged = false;
        }
        chart.draw(data, options);
      };*/
    }
};

