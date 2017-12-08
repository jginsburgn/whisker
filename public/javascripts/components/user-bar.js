function logout() {
    $.get("users/logout", function(data, textStatus, jqXHR) {
        container.html(data);
    });
}