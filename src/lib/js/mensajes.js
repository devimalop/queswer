


var modalHtml = '<div id="myModal" class="modal">' +
				  '<div class="modal-content">' +
				    '<div class="modal-header">' +
				      '<span class="close">&times;</span>' +
				      '<h2 id="message_title">Modal Header</h2>' +
				    '</div>' +
				   ' <div class="modal-body">' +
				      '<p id="message_text">Some text in the Modal Body</p>' +
				    '</div>' +
				    /*'<div class="modal-footer">' +
				      '<h3>Modal Footer</h3>' +
				    '</div>' +*/
				  '</div>' +
				'</div>';

				
var showMessage = function(title, text, warning){
	var modal;
	if($("#myModal").length){
		modal = document.getElementById('myModal');
	}else{
		$(document.body).append(modalHtml);

		modal = document.getElementById('myModal');

		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];


		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
		    modal.style.display = "none";
		    if(utils.getDataCache("functionPostMessage")){
		    	utils.getDataCache("functionPostMessage")();
		    }
		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
		    if (event.target == modal) {
		        modal.style.display = "none";
		        if(utils.getDataCache("functionPostMessage")){
		        	utils.getDataCache("functionPostMessage")();
		        }
		    }
		}
	}
	if(warning){
		$(".modal-header").addClass("modal-header-warning").removeClass("modal-header");
	}else{
		$(".modal-header-warning").addClass("modal-header").removeClass("modal-header-warning");
	}
	$("#message_title").html(title);
	$("#message_text").html(text);
    modal.style.display = "block";
}