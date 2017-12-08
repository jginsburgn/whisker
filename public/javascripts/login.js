function loadRegister() {
    $.get("register", function (data, textStatus, jqXHR) {
        container.html(data);
    });
}

function attemptLogin() {
	var emailField = $("input[name=email]");
    var passwordField = $("input[name=password]");
	if (emailField.get(0).checkValidity() &&
		passwordField.get(0).checkValidity()) {
		var payload = {
			email: emailField.val(),
			password: passwordField.val()
        }
        $.post("users/login", payload, function(data, textStatus, jqXHR) {
            container.html(data);
        })
	}
	else {
		$("#message-holder").html("Something is wrong with your inputs!");
	}
}