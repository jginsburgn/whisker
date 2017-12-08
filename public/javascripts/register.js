function loadLogin() {
	$.get("login", function (data, textStatus, jqXHR) {
		container.html(data);
	});
}

function attemptRegister() {
	var nameField = $("input[name=name]");
	var emailField = $("input[name=email]");
	var passwordField = $("input[name=password]");
	if (nameField.get(0).checkValidity() &&
		emailField.get(0).checkValidity() &&
		passwordField.get(0).checkValidity()) {
		var payload = {
			name: nameField.val(),
			email: emailField.val(),
			password: passwordField.val()
		};
		$.post("users/register", payload, function(data, textStatus, jqXHR) {
			container.html(data);
		});
	}
	else {
		$("#message-holder").html("Something is wrong with your inputs!");
	}
}