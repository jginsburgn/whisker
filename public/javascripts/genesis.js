container = $("#container");
$.get("genesis", function (data, textStatus, jqXHR) {
    container.html(data);
});