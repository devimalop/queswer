$( document ).ready(function() {
	initRegistro();
});

	

var initRegistro = function(){
	loadSelects();
	loadBindings();
};

var loadSelects = function(){
	$.when(
		utils.getDataFromServer("register", {funcion: "getColleges"}),
		utils.getDataFromServer("register", {funcion: "getCourses"}),
		utils.getDataFromServer("register", {funcion: "getCollegesCourses"})
	).done(function(){
		if(arguments.length >= 3){
			fillSelects(arguments[0], arguments[1]);
			utils.setDataCache("instcurs", arguments[2]);
		}else{
			alert("error 100101; carga incorrecta, consulte con el administrador");
			window.location.href = "../index.html";
		}
	})
};

var loadBindings = function(){
	$("#register").off("click").on("click", registerUser);
	$("#return").off("click").on("click", goBack);

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

var fillSelects = function(colleges, courses){
	utils.fillCombo("[name='instituto']", "P_INSTITUTO", "NOMBRE", colleges, false, false, false, "Instituto");
	utils.fillCombo("[name='curso']", "P_CURSO", "NOMBRE", courses, false, false, false, "Curso");
	refreshSelects();
	$(".sel__placeholder").parent().on("click", function(){
		if($("[name='instituto']").val() && $("[name='instituto']").val() != "0"){
			$("[name='instituto']").parent().find(".sel__placeholder").addClass("selected_item");
		}
		if($("[name='curso']").val() && $("[name='curso']").val() != "0"){
			$("[name='curso']").parent().find(".sel__placeholder").addClass("selected_item");
		}
	});
}


var goBack = function(){
	window.location.href = "../index.html";
};

var registerUser = function(){
	hideErrorMessage();
	if(utils.validateForm()){
		if($("[name='contrasena']").eq(0).val() == $("[name='contrasena']").eq(1).val()){
			var data = utils.getFormData($("form"), true);
			if(data.contrasena.length>=6){
				data.instcurs = $.grep(utils.getDataCache("instcurs"), function(ic){return ic.A_INSTITUTO == data.instituto && ic.A_CURSO == data.curso})[0].P_INSTCURS;
				delete data.instituto;
				delete data.curso;
				utils.getDataFromServer("register", {funcion:"registerUser", data:data}).done(function(response){
					var resp = JSON.parse(JSON.stringify(response));
					if(resp === true){
						utils.setDataCache("functionPostMessage", function(){window.location.href = "../index.html";})
						showMessage("Usuario Creado Correctamente", "Se regresará a la ventana de login, donde podrás acceder con el usuario que acabas de crear.");
					}else{
						if(resp && resp.error){
							showErrorMessage(resp.error);
						}else{
							showErrorMessage("Error en la creación del usuario");
						}
					}
				});
			}else{
				showErrorMessage("La contraseña ha de tener al menos 6 caracteres");
			}
		}else{
			showErrorMessage("Las contraseñas no coinciden");
		}
	}else{
		showErrorMessage("Faltan datos por completar");
	}
};

var showErrorMessage = function(message){
	$(".register_messages").html(message).addClass("message_on").removeClass("message_off");
};
var hideErrorMessage = function(message){
	$(".register_messages").html(message).addClass("message_off").removeClass("message_on");
};
