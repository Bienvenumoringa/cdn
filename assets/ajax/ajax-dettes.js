// importer les fonctions, variables, et éléments
import * as dp from '../js/dispay.js';
import * as lg from '../js/api-langue.js';

var object;
var content;

getData();
getCount();
getCommande();

// Inserer les données
$(document).ready(function() {
    $('#send').click(function(e) {
        if (! navigator.onLine) {
            e.preventDefault();
            object = "msg";
            content = dp.network_msg;
            dp.showMessage(object, content);
        } else {
            var description = $('#description').val();
            var commande = $('#commande').val();
            e.preventDefault();
            dp.loaderAdd.addClass('loader');
            dp.loaderAdd.html("");
            $.ajax({
                url: '../models/controllers/controller-dettes.php',
                type: 'POST',
                data: {
                    action: 'add',
                    description: description,
                    commande: commande
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
                    } else if(response == false ) {
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
            var id  = $('#idUp').val();
            var description  = $('#description').val();
            var montant  = $('#montant').val();
            var commande  = $('#commandeUp').val();
            e.preventDefault();
            dp.loaderUp.addClass('loader');
            dp.loaderUp.html("");
            $.ajax({
                url: '../models/controllers/controller-dettes.php',
                type: 'POST',
                data: {
                    action: 'update',
                    id: id,
                    description: description,
                },
                success: function(response) {
                    if (response == true){
                        object = "succes";
                        content = dp.successUpdateMsg;
                        dp.loaderUp.removeClass('loader');
                        dp.loaderUp.html(dp.btnUpdateLabel);
                        dp.loaderAdd.html(dp.btnSaveLabel);
                        dp.showElement('#cmd-hide');
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
                    } else if(response == "info") {
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
                url: '../models/controllers/controller-dettes.php',
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
                    } else if(response == "info") {
                        object = "info";
                        content = dp.infoMsg;
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

// Recherche des données
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

// completer le form lors de la modification
$(document).on('click', 'a[data-role=update]', function(){
    if(! navigator.onLine){
        content = dp.network_msg;
        object = "msg";
        dp.showMessage(object, content);
    } else {
        var id = $(this).data('id');
        if(id.value!="") {
            let description=$('#'+id).children('td[data-target=description]').text();
            $('#idUp').val(id);
            $('#description').val(description);
            dp.hideElement('#cmd-hide');
            showBtnUp();
            dp.btnNewClick();
        }
    }
});

// Recuperer les données
function getData() {
    $.ajax({
        url: '../models/controllers/controller-dettes.php',
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

// la fonction qui fait la recherche
function searchData(search) {
    $.ajax({
        url: '../models/controllers/controller-dettes.php',
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

// La fonction compte les nombre des données
function getCount() {
    $.ajax({
        url: '../models/controllers/controller-dettes.php',
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
// Recuperer les catégories (clé étragère)
function getCommande() {
    $.ajax({
        url: '../models/controllers/controller-dettes.php',
        type: "post",
        data: {
            action: 'getCom'
        },
        success: function(response) {
            $("#commande").html(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var object = "error";
            var content = 'Erreur : ' + textStatus + ', ' + errorThrown;
            dp.showMessage(object, content);
        }
    });
}
// La fonction qui affiche le bouton de la modification
function showBtnUp(){
    dp.showElement('#update');
    dp.hideElement('#send');
}

// La fonction qui cache le bouton de la modification
function hideBtnUp(){
    dp.hideElement('#update');
    dp.showElement('#send');
}

// la fonction qui vide les champs
function clearfields(){
    $('#description').val("");
    $('#montant').val("");
    getCommande();
}

// Sélectionnez la ligne de l'en-tête du tableau par sa classe
let headerRow = document.querySelector('.titles');

var lag = dp.getCookie("langue") ? dp.getCookie("langue") : 1;

for (let i = 0; i < headerRow.cells.length; i++) {
    headerRow.cells[i].textContent = lg.lang_dettes_header[lag][i];
}

$('form label').find('input, textarea').each(function(index) {
    // Vérifiez si l'index existe dans le tableau avant de l'assigner
    if (lg.lang_dettes_input[lag][index]) {
        $(this).attr('placeholder', lg.lang_dettes_input[lag][index]);
    }
});

$("form label span").each(function(index) {
    // Vérifiez si l'index existe dans le tableau avant de l'assigner
    if (lg.lang_dettes_label[lag][index]) {
        $(this).text(lg.lang_dettes_label[lag][index]);
    }
});