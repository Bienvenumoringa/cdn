// importer les fonctions, variables, et éléments
import * as dp from '../js/dispay.js';
import * as lg from '../js/api-langue.js';

var object;
var content;

getData();
getCount();

// Inserer les données à la base de données
$(document).ready(function() {
    $('#send').click(function(e) {
        if (! navigator.onLine) {
            e.preventDefault();
            object = "msg";
            content = dp.network_msg;
            dp.showMessage(object, content);
        } else {
            var name = $('#name').val();
            var lastname = $('#lastname').val();
            var fistname = $('#fistname').val();
            var gender = $('#gender').val();
            var adress = $('#adress').val();
            var phone = $('#phone').val();
            e.preventDefault();
            dp.loaderAdd.addClass('loader');
            dp.loaderAdd.html("");

            $.ajax({
                url: '../models/controllers/controller-clients.php',
                type: 'POST',
                data: {
                    action: 'add',
                    name: name,
                    lastname: lastname,
                    fistname: fistname,
                    gender: gender,
                    adress: adress,
                    phone: phone
                },
                success: function(response) {
                    if (response == true) {
                        object = "succes";
                        content = dp.successAddMsg;
                        dp.loaderAdd.removeClass('loader');
                        dp.loaderAdd.html(dp.btnSaveLabel);
                        $('#gender').val("Masculin");
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
                    } else if(response == "info") {
                        object = "info";
                        content = dp.infoMsg;
                        dp.loaderAdd.removeClass('loader');
                        dp.loaderAdd.html(dp.btnSaveLabel);
                        dp.showMessage(object, content);
                        getData();
                        getCount();
                    } else {
                        object = "error";
                        content = response;
                        dp.loaderAdd.removeClass('loader');
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

// Modification des données
$(document).ready(function() {
    $('#update').click(function(e) {
        if (! navigator.onLine) {
            e.preventDefault();
            object = "msg";
            content = dp.network_msg;
            dp.showMessage(object, content);
        } else {
            var id = $('#idUp').val();
            var name = $('#name').val();
            var lastname = $('#lastname').val();
            var fistname = $('#fistname').val();
            var gender = $('#gender').val();
            var adress = $('#adress').val();
            var phone = $('#phone').val();

            e.preventDefault();
            dp.loaderUp.addClass('loader');
            dp.loaderUp.html("");
            $.ajax({
                url: '../models/controllers/controller-clients.php',
                type: 'POST',
                data: {
                    action: 'update',
                    id: id,
                    name: name,
                    lastname: lastname,
                    fistname: fistname,
                    gender: gender,
                    adress: adress,
                    phone: phone
                },
                success: function(response) {
                    if (response == true ){
                        object = "succes";
                        content = dp.successUpdateMsg;
                        dp.loaderUp.removeClass('loader');
                        dp.loaderUp.html(dp.btnUpdateLabel);
                        dp.loaderAdd.html(dp.btnSaveLabel);
                        $('#gender').val("Masculin");
                        dp.showMessage(object, content);
                        hideBtnUp();
                        dp.btnNewClick();
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
                    } else if(response == "info"){
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

// Suppression des données
$(document).ready(function() {
    $('#yes').click(function(e) {
        if (! navigator.onLine) {
            e.preventDefault();
            object = "msg";
            content = dp.network_msg;
            dp.showMessage(object, content);
        } else {
            var id  = $('#idSup').val();
            e.preventDefault();
            $.ajax({
                url: '../models/controllers/controller-clients.php',
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
                    } else if(response == "info"){
                        object = "info";
                        content = dp.infoMsg;
                        dp.loaderUp.removeClass('loader');
                        dp.loaderUp.html(dp.btnUpdateLabel);
                        dp.loaderAdd.html(dp.btnSaveLabel);
                        dp.showMessage(object, content);
                        getData();
                        getCount();
                    }else {
                        object = "error";
                        content = response;
                        dp.showMessage(object, content);
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

// Evenement qui appel la methode de la recherche
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

// completer form lors de la modification
$(document).on('click', 'a[data-role=update]', function(){
    if(! navigator.onLine){
        content = dp.network_msg;
        object = "msg";
        dp.showMessage(object, content);
    } else {
        var id = $(this).data('id');
        if(id.value!="") {
            var mane=$('#'+id).children('td[data-target=mane]').text();
            var lastname=$('#'+id).children('td[data-target=lastname]').text();
            var fistname=$('#'+id).children('td[data-target=fistname]').text();
            var gender=$('#'+id).children('td[data-target=gender]').text();
            var adress=$('#'+id).children('td[data-target=adress]').text();
            var phone=$('#'+id).children('td[data-target=phone]').text();

            $('#idUp').val(id);
            $('#name').val(mane);
            $('#lastname').val(lastname);
            $('#fistname').val(fistname);
            $('#gender').val(gender);
            $('#adress').val(adress);
            $('#phone').val(phone);
            showBtnUp();
            dp.btnNewClick();
        }
    }
});

// Recuperer les données
function getData() {
    $.ajax({
        url: '../models/controllers/controller-clients.php',
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

// Rechercher les données
function searchData(search) {
    $.ajax({
        url: '../models/controllers/controller-clients.php',
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

// Compter les données
function getCount() {
    $.ajax({
        url: '../models/controllers/controller-clients.php',
        type: "post",
        data: {
            action: 'count'
        },
        success: function(response) {
            if(response < 1){
                $('#data').html('ok');
            }
            $("#total").html(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var object = "error";
            var content = 'Erreur : ' + textStatus + ', ' + errorThrown;
            dp.showMessage(object, content);
        }
    });
}

// afficher le Bouton de la modification
function showBtnUp(){
    dp.showElement('#update');
    dp.hideElement('#send');
}

// masquer le bouton de la modification
function hideBtnUp(){
    dp.hideElement('#update');
    dp.showElement('#send');
}

// Vider les champs
function clearfields(){
    $('#name').val('');
    $('#lastname').val('');
    $("#fistname").val('');
    $('#phone').val('');
    $('#adress').val('');
    $('gender').val('');
}

// Sélectionnez la ligne de l'en-tête du tableau par sa classe
let headerRow = document.querySelector('.titles');

var lag = dp.getCookie("langue") ? dp.getCookie("langue") : 1;

for (let i = 0; i < headerRow.cells.length; i++) {
    headerRow.cells[i].textContent = lg.lang_client_header[lag][i];
}

$('form label').find('input, textarea').each(function(index) {
    // Vérifiez si l'index existe dans le tableau avant de l'assigner
    if (lg.lang_client_input[lag][index]) {
        $(this).attr('placeholder', lg.lang_client_input[lag][index]);
    }
});

$("form label span").each(function(index) {
    // Vérifiez si l'index existe dans le tableau avant de l'assigner
    if (lg.lang_client_label[lag][index]) {
        $(this).text(lg.lang_client_label[lag][index]);
    }
});