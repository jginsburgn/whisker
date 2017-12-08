function loadAddTransaction() {
    $.get("transaction-add",  function (data, textStatus, jqXHR) {
        container.html(data);
    });
}

function edit(id) {
    $.post("transaction-edit", {id: id}, function (data, textStatus, jqXHR) {
        container.html(data);
    });
}