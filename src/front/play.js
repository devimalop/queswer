$( document ).ready(function() {
	setBindings();
	getQuestions();
	utils.setDataCache("barTimerActive", true);
	startBarTimer();
});


var demo = function(){
	var logos = ["bio", "english", "geo", "math", "phisic", "science", "spain", "sports"];
	var time = 0;
	var counter = 0;
	for(var i=0; i<logos.length; i++){
		setTimeout(
			function(){
				changeLogo(logos[counter++]);
			},
			time
		);
		time += 2500;
	}
};

var questionsToGeneralStats = function(questions){
	var dateReturn = {};
	for(var i=0; i<questions.length;i++){
		if(dateReturn[questions[i].A_TEMATICA]){
			if(questions[i].ACIERTO == "TRUE"){
				dateReturn[questions[i].A_TEMATICA].ACIERTOS++;
			}
			dateReturn[questions[i].A_TEMATICA].TOTAL++;
		}else{
			dateReturn[questions[i].A_TEMATICA] = {
				A_TEMATICA:  questions[i].A_TEMATICA,
				ACIERTOS:  questions[i].ACIERTO == "TRUE" ? 1 : 0,
				TOTAL:1
			}
		}
	}
	var finalData = [];
	for(var temData in dateReturn){
		finalData.push(dateReturn);
	}
	return dateReturn;
};

var setBindings = function(){
	$(".answer").off("click").on("click", function(){
		var answer = $(this).attr("id");
		questionManager.check(answer);
		unsetBindings();
	});
	$("#next").off("click").on("click", function(){
		questionManager.next();
		setBindings();
		startBarTimer();
	});
};
var unsetBindings = function(){
	$(".answer").off("click");
};

var startBarTimer = function(){
	if(utils.getDataCache("barTimerActive")){
		var elem = document.getElementById("myBar");   
	  	var width = 850;
	  	elem.style.width = width + 'px'; 
	  	var id = setInterval(frame, 30);
		$(".answer").on("click", function(){
			clearInterval(id);
		});
		function frame() {
		    if (width <= 0) {
		      	clearInterval(id);
		      	questionManager.check("incorrecta");
				unsetBindings();
		    } else {
		     	width--; 
		      	elem.style.width = width + 'px'; 
		    }
		}
	}else{
		$("#myProgress").hide();
	}
};

var changeLogo = function(idTem){
	var newImg;
	switch(idTem){
		case "1":
			newImg = "queswer";//general
			break;
		case "2":
			newImg = "sports";
			break;
		case "3":
			newImg = "geo";
			break;
		case "4":
			newImg = "history";
			break;
		case "5":
			newImg = "spain";
			break;
		case "6":
			newImg = "math";
			break;
		case "7":
			newImg = "english";
			break;
		case "8":
			newImg = "science";
			break;
		case "9":
			newImg = "bio";
			break;
		case "10":
			newImg = "phisic";
			break;
		default:
			newImg = "queswer";//general
			break;
	}
	$("#logo").attr("src", "../img/tem/" + newImg + ".png");
};

var getQuestions = function(){
	$.when(
		utils.getDataFromServer("play", {funcion: "getQuestions"}),
		utils.getDataFromServer("play", {funcion: "getTypeQuestion"}),
		utils.getDataFromServer("play", {funcion: "getCurrentUser"}),
		utils.getDataFromServer("play", {funcion: "getCurrentInstCurs"})
	).done(function(questions, typeQuestions, currentUser, instCurs){
		questionManager.start(questions, currentUser, instCurs);
	});
}

var questionManager = (function(){
	var currentUser;
	var instCurs;
	var counter = 0;
	var questions = [];
	var currentQuestion;
	var totalSuccess;
	var finalizado = false;
	var _next = function(){
		if(counter < questions.length){
			$(".answer").removeClass("success fail correct incorrect");
			$("#wiki").addClass("hidden");
			$("#next").addClass("hidden");
			$("#logo").removeClass("hidden");
			currentQuestion = questions[counter++];
			$("#question").html(currentQuestion.TEXTO);
			$("#a_answer").html(currentQuestion.A);
			$("#b_answer").html(currentQuestion.B);
			$("#c_answer").html(currentQuestion.C);
			$("#wiki").html(currentQuestion.WIKI);
			changeLogo(currentQuestion.A_TEMATICA);
		}else{
			if(finalizado){
				window.location.href = "main.html";
			}else{
				utils.setDataCache("barTimerActive", false);
				_finish();
			}
		}
	};
	var _start = function(quest, currentUsr, instCrs){
		currentUser = currentUsr;
		instCurs = instCrs;
		counter = 0;
		questions = quest;
		totalSuccess = 0;
		finalizado = false;
		_next();
	};
	var _finish = function(){
		$(".answer, #wiki, #logo, #question").hide();
		$(".answer").hide();
		finalizado = true;
		var bonoMessage = "";
		var funcionBono;		
		var percentSuccess = 100 * totalSuccess / questions.length;
		if(percentSuccess >= instCurs.BONOS){
			funcionBono = utils.getDataFromServer("play", {funcion: "addUserBono", data: ++currentUser.BONOS})
			bonoMessage = "<br> ¡¡Has conseguido un bono!!";
			$("#bono_text").show();
		}

		$("#result_text").show();
		$("#success_text").html(totalSuccess);

		// alert("Has obtenido " + totalSuccess + " aciertos" + bonoMessage);
		var questionsBase = questionsToGeneralStats(questions);
		var generalStatsBase = [
			{IDENTIFICADOR: currentUser.P_USUARIO , TIPO: "USUARIO"}, 
			{IDENTIFICADOR: instCurs.A_CURSO, TIPO: "CURSO"}, 
			{IDENTIFICADOR: instCurs.A_INSTITUTO, TIPO: "INSTITUTO"}, 
			{IDENTIFICADOR: instCurs.P_INSTCURS, TIPO: "INSTCURS"}
		];
		var finalData = [];
		for(var i=0; i<generalStatsBase.length; i++){
			for(varQuestBase in questionsBase){
				finalData.push({
					IDENTIFICADOR: generalStatsBase[i].IDENTIFICADOR,
					TIPO: generalStatsBase[i].TIPO,
					A_TEMATICA: questionsBase[varQuestBase].A_TEMATICA,
					ACIERTOS: questionsBase[varQuestBase].ACIERTOS,
					TOTAL: questionsBase[varQuestBase].TOTAL
				});
			}
		}
		$.when(
			utils.getDataFromServer("play", {funcion: "addUserStats", data: questions}),
			utils.getDataFromServer("play", {funcion: "addGeneralStats", data: finalData}),
			funcionBono
		).done(function(check1, check2){
			if(check1 && check2){
				console.log("operaciones ok");
			}else{
				console.log("operaciones ko");
			}
		});
	};
	var _check = function(answer){
		$("#wiki").removeClass("hidden");
		$("#next").removeClass("hidden");
		$("#logo").addClass("hidden");
		$(".answer").addClass("incorrect");
		currentQuestion.date = utils.nowToSql();
		if(answer.split("_")[0].toUpperCase() == currentQuestion.CORRECTA){
			currentQuestion.ACIERTO = "TRUE";
			totalSuccess++;
			currentQuestion.success = true;
			$("#" + answer).addClass("success").removeClass("incorrect");
		}else{
			currentQuestion.ACIERTO = "FALSE";
			$("#" + answer).addClass("fail");
			$("#" + currentQuestion.CORRECTA.toLowerCase() + "_answer").addClass("correct").removeClass("incorrect");
		}/*
		setTimeout(function(){
			_next();
		},10000);*/
	}
    return {
    	start: _start,
    	next: _next,
    	check: _check
    };
})();