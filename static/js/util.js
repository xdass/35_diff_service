/**
 * Created by Dass on 03.01.2018.
 */

function ajax_request(doc1) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        url: 'http://127.0.0.1:5000/diff',
        data: JSON.stringify({'doc1': doc1[0], 'doc2': doc1[1]}),
        success: function (response) {
            $('#result').html(response['text'])
            $('.nav-pills a:last').tab('show')
            $('form')[0].reset()
        },
        error: function (error) {
            console.log(error.statusText)
        }
    })
}



function read_file(files) {
    let data = []
    function callback(content) {
        data.push(content)
        if (data.length === 2) {
            ajax_request(data)
        }
    }
    for (let i = 0; i < files.length; i++) {
        fr = new FileReader()
        let file = files[i]

        fr.addEventListener('load', function (e) {
            callback(e.target.result)
        });
        fr.readAsText(file)
    }
}

$('#process_docs').click(function (e) {
    e.preventDefault();
    fls = []
    doc1 = $('#doc1')[0].files[0]
    doc2 = $('#doc2')[0].files[0]
    if (typeof doc1 === 'undefined' || typeof doc2 === 'undefined') {
        let placeForAlert = $('.card-body')
        placeForAlert.after("<div class='alert alert-danger' role='alert'>Загрузите обе версии документа</div>")
    } else {
        $('.alert').remove();
        fls.push(doc1, doc2)
        read_file(fls)
    }
});
