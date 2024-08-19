// importer les fonctions, variables, et éléments
import * as dp from '../js/dispay.js';import * as lg from '../js/api-langue.js';let object;let content;getData();getCount();$(document).ready(function() {$('#send').click(function(e){if (! navigator.onLine) {e.preventDefault();object = "msg";content = dp.network_msg;dp.showMessage(object, content);}else{var name = $('#name').val();var description = $('#description').val();var adress = $('#adress').val(); e.preventDefault();
            dp.loaderAdd.addClass('loader');
            dp.loaderAdd.html("");

            $.ajax({
                url: '../models/controllers/controller-boutique.php',
                type: 'POST',
                data: {
                    action: 'add',
                    name: name,
                    description: description,
                    adress: adress,
                },
                success: function(response) {
                    if (response == true){
                        object = "succes";
                        content = dp.successAddMsg;

                        dp.loaderAdd.removeClass('loader');
                        dp.loaderAdd.html(dp.btnSaveLabel);
                        dp.showMessage(object, content);

                        getData();
                        getCount();
                        clearfields();
                    } else if(response == false) {
                        object = "error";
                        content = dp.errorAddMsg;

                        dp.loaderAdd.removeClass('loader');
                        dp.loaderAdd.html(dp.btnSaveLabel);
                        dp.showMessage(object, content);

                        getData();
                        getCount();
                    } else if(response == 'info') {
                        object = "info";
                        content = dp.infoMsg;

                        dp.loaderAdd.removeClass('loader');
                        dp.loaderAdd.html(dp.btnSaveLabel);
                        dp.showMessage(object, content);

                        getData();
                        getCount();
                    }else {
                        object = "error";
                        content = response;

                        dp.loaderAdd.removeClass('loader');
                        dp.loaderAdd.html(dp.btnUpdateLabel);
                        dp.loaderAdd.html(dp.btnSaveLabel);
                        dp.showMessage(object, content);

                        getData();
                        getCount();
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    object = "error";
                    content = 'Erreur : ' + textStatus + ', ' + errorThrown;
                    dp.showMessage(object, content);
                }
            });
        }
    });
});

// update data
$(document).ready(function() {
    $('#update').click(function(e) {
        if (! navigator.onLine) {
            e.preventDefault();
            object = "msg";
            content = dp.network_msg;
            dp.showMessage(object, content);
        } else {
            var id  = $('#idUp').val();
            var name  = $('#name').val();
            var description  = $('#description').val();
            var adress  = $('#adress').val();

            e.preventDefault();
            dp.loaderUp.addClass('loader');
            dp.loaderUp.html("");

            $.ajax({
                url: '../models/controllers/controller-boutique.php',
                type: 'POST',
                data: {
                    action: 'update',
                    id: id,
                    name: name,
                    description: description,
                    adress: adress,
                },
                success: function(response) {
                    if (response == true){
                        object = "succes";
                        content = dp.successUpdateMsg;

                        dp.loaderUp.removeClass('loader');
                        dp.loaderUp.html(dp.btnUpdateLabel);
                        dp.loaderAdd.html(dp.btnSaveLabel);
                        dp.showMessage(object, content);
                        dp.btnNewClick();

                        hideBtnUp();
                        getData();
                        getCount();
                        clearfields();
                    }  else if(response == false) {
                        object = "error";
                        content = dp.errorUpdateMsg;

                        dp.loaderUp.removeClass('loader');
                        dp.loaderUp.html(dp.btnUpdateLabel);
                        dp.loaderAdd.html(dp.btnSaveLabel);
                        dp.showMessage(object, content);

                        getData();
                        getCount();
                    } else if(response == 'info'){
                        object = "info";
                        content = dp.infoMsg;

                        dp.loaderUp.removeClass('loader');
                        dp.loaderUp.html(dp.btnUpdateLabel);
                        dp.loaderAdd.html(dp.btnSaveLabel);
                        dp.showMessage(object, content);

                        getData();
                        getCount();
                    } else {
                        object = "error";
                        content = response;

                        dp.loaderUp.removeClass('loader');
                        dp.loaderUp.html(dp.btnUpdateLabel);
                        dp.loaderAdd.html(dp.btnSaveLabel);
                        dp.showMessage(object, content);

                        getData();
                        getCount();
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    object = "error";
                    content = 'Erreur : ' + textStatus + ', ' + errorThrown;
                    dp.showMessage(object, content);
                }
            });
        }
    });
});

// Delete data
$(document).ready(function() {
    $('#yes').click(function(e) {
        if (! navigator.onLine) {
            e.preventDefault();
            object = "msg";
            content = dp.network_msg;
            dp.showMessage(object, content);
        } else {
            var id = $('#idSup').val();
            e.preventDefault();
            $.ajax({
                url: '../models/controllers/controller-boutique.php',
                type: 'POST',
                data: {
                    action: 'delete',
                    id: id
                },
                success: function(response) {
                    if (response == true){
                        object = "succes";
                        content = dp.successDeleteMsg;

                        dp.showMessage(object, content);

                        getData();
                        getCount();
                        clearfields();
                    }  else if(response == false) {
                        object = "error";
                        content = dp.errorDeleteMsg;

                        dp.showMessage(object, content);

                        getData();
                        getCount();
                    } else {
                        object = "error";
                        content = response;

                        dp.showMessage(object, content);

                        getData();
                        getCount();
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    object = "error";
                    content = 'Erreur : ' + textStatus + ', ' + errorThrown;
                    dp.showMessage(object, content);
                }
            });
        }
    });
});

// Search data event
$(document).ready(function(){
    $('#search').on('input', function() {
        if(! navigator.onLine) {
            content = dp.network_msg;
            object = "msg";
            $('#search').val('');

            dp.showMessage(object, content);
        }else{
            var search = $(this).val();
            searchData(search);
        }
    });
});

// complete form
$(document).on('click', 'a[data-role=update]', function(){
    if(! navigator.onLine){
        content = dp.network_msg;
        object = "msg";

        dp.showMessage(object, content);
    } else {
        let id = $(this).data('id');
        if(id.value!="") {
            let Nom=$('#'+id).children('td[data-target=name]').text();
            let description=$('#'+id).children('td[data-target=description]').text();
            let adress =$('#'+id).children('td[data-target=adress]').text();

            $('#idUp').val(id);
            $('#name').val(Nom);
            $('#description').val(description);
            $('#adress').val(adress);
            showBtnUp();

            dp.btnNewClick();
        }
    }
});

/**
 * Creation of functions
 */

// get data function
function getData() {
    $.ajax({
        url: '../models/controllers/controller-boutique.php',
        type: "post",
        data: {
            action: 'get'
        },
        success: function(response) {
            $("#data").html(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var object = "error";
            var content = 'Erreur : ' + textStatus + ', ' + errorThrown;

            dp.showMessage(object, content);
        }
    });
}

// Search data function
function searchData(search) {
    $.ajax({
        url: '../models/controllers/controller-boutique.php',
        type: "post",
        data: {
            action: 'get',
            search: search
        },
        success: function(response) {
            $("#data").html(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var object = "error";
            var content = 'Erreur : ' + textStatus + ', ' + errorThrown;

            dp.showMessage(object, content);
        }
    });
}

// Count data function
function getCount() {
    $.ajax({
        url: '../models/controllers/controller-boutique.php',
        type: "post",
        data: {
            action: 'count'
        },
        success: function(response) {
            $("#total").html(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var object = "error";
            var content = 'Erreur : ' + textStatus + ', ' + errorThrown;

            dp.showMessage(object, content);
        }
    });
}

// show update btn function
function showBtnUp(){
    dp.showElement('#update');
    dp.hideElement('#send');
}

// Hide update function
function hideBtnUp(){
    dp.hideElement('#update');
    dp.showElement('#send');
}

// clear fieldes
function clearfields(){
    $('#name').val("");
    $('#description').val("");
    $('#adress').val("");
}

// Sélectionnez la ligne de l'en-tête du tableau par sa classe
let headerRow = document.querySelector('.titles');

var lag = dp.getCookie("langue") ? dp.getCookie("langue") : 1;

for (let i = 0; i < headerRow.cells.length; i++) {
    headerRow.cells[i].textContent = lg.lang_bout_header[lag][i];
}

$('form label').find('input, textarea').each(function(index) {
    // Vérifiez si l'index existe dans le tableau avant de l'assigner
    if (lg.lang_bout_input[lag][index]) {
        $(this).attr('placeholder', lg.lang_bout_input[lag][index]);
    }
});

$("form label span").each(function(index) {
    // Vérifiez si l'index existe dans le tableau avant de l'assigner
    if (lg.lang_bout_label[lag][index]) {
        $(this).text(lg.lang_bout_label[lag][index]);
    }
});