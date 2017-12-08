function edit(id) {
    var titleField = $("input[name=title]");
    var amountField = $("input[name=amount]");
    var notesTextArea = $("textarea[name=notes]");
    var payload = {
        title: titleField.val(),
        amount: amountField.val(),
        notes: notesTextArea.val(),
        id: id
    }
    $.post("transactions/edit", payload, function(data, textStatus, jqXHR) {
        container.html(data);
    });
}