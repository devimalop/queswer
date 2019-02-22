$( document ).ready(function() {
	initApp();
});

	

var initApp = function(){
	loadBindings();
}

var loadBindings = function(){
	$("#login").off("click").on("click", startSession);
//************Zona Configuración css
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
//***************Fin zona config css
}


var startSession = function(){
	hideErrorMessage();
	var user = $("#user").val();
	var password = $("#password").val();
	if(user && user != "" && password && password != ""){
		$.post("back/login.php", {funcion:"checkLogin", user: user,  password: password}, function(response) {
		    var userFound = JSON.parse(response);
		    if(userFound && userFound.CONTRASENA == password){
		    	window.location.href = "html/main.html";
		    }else{
		    	showErrorMessage("No existe ningún usuario con las credenciales introducidas");
		    }
		});
	}else{
		showErrorMessage("Introduce el nombre de usuario y la contraseña, por favor");
	}
}

var showErrorMessage = function(message){
	$(".login_messages").html(message).addClass("message_on").removeClass("message_off");
}
var hideErrorMessage = function(message){
	$(".login_messages").html(message).addClass("message_off").removeClass("message_on");
}
