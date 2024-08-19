// importer les fonctions, variables, et éléments

import * as dp from '../js/dispay.js';
import * as lg from '../js/api-langue.js';

let object;
let content;

getCategory();
getData();
getCount();

// Inserer les données
$(document).ready(function() {
    $('#send').click(function(e) {
        if (! navigator.onLine) {
            e.preventDefault();
            object = "msg";
            content = dp.network_msg;
            dp.showMessage(object, content);
        } else {
            var name = $('#name').val();
            var seuil = $('#seuil').val();
            var img = $('#img').val();
            var category = $('#category').val();
            e.preventDefault();
            dp.loaderAdd.addClass('loader');
            dp.loaderAdd.html("");
            $.ajax({
                url: '../models/controllers/controller-product.php',
                type: 'POST',
                data: {
                    action: 'add',
                    name: name,
                    seuil: seuil,
                    img: img,
                    category: category
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

// La modification des données
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
            var seuil  = $('#seuil').val();
            var img  = $('#img').val();
            var category  = $('#category').val();
            e.preventDefault();
            dp.loaderUp.addClass('loader');
            dp.loaderUp.html("");
            $.ajax({
                url: '../models/controllers/controller-product.php',
                type: 'POST',
                data: {
                    action: 'update',
                    id: id,
                    name: name,
                    seuil: seuil,
                    img: img,
                    category: category
                },
                success: function(response) {
                    if (response == true){
                        object = "succes";
                        content = dp.successUpdateMsg;
                        dp.loaderUp.removeClass('loader');
                        dp.loaderUp.html(dp.btnUpdateLabel);
                        dp.loaderAdd.html(dp.btnSaveLabel);
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

// La supression des donées
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
                url: '../models/controllers/controller-product.php',
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

// recherche des données
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
        let id = $(this).data('id');
        if(id.value!="") {
            let Nom=$('#'+id).children('td[data-target=name]').text();
            let seuil=$('#'+id).children('td[data-target=seuil]').text();
            let category =$('#'+id).children('td[data-target=categoryId]').text();
            $('#idUp').val(id);
            $('#name').val(Nom);
            $('#seuil').val(seuil);
            $('#category').val(category);
            showBtnUp();
            dp.btnNewClick();
        }
    }
});

// Recuperer les catégories (clé étragère)
function getCategory() {
    $.ajax({
        url: '../models/controllers/controller-product.php',
        type: "post",
        data: {
            action: 'getCate'
        },
        success: function(response) {
            $("#category").html(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var object = "error";
            var content = 'Erreur : ' + textStatus + ', ' + errorThrown;
            dp.showMessage(object, content);
        }
    });
}

// fonction qui recupere les données
function getData() {
    $.ajax({
        url: '../models/controllers/controller-product.php',
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

// fonction qui fait la recherche
function searchData(search) {
    $.ajax({
        url: '../models/controllers/controller-product.php',
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

// la fonction qui compte le nombre des données
function getCount() {
    $.ajax({
        url: '../models/controllers/controller-product.php',
        type: "post",
        data: {
            action: 'count'
        },
        success: function(response) {
            if(response < 1){
                $('#data').html('');
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

// afficher le bouton de la modification
function showBtnUp(){
    dp.showElement('#update');
    dp.hideElement('#send');
}

// Masqer le bouton de la modification
function hideBtnUp(){
    dp.hideElement('#update');
    dp.showElement('#send');
}

// vider les champs
function clearfields(){
    $('#name').val("");
    $('#seuil').val("");
    $('#img').val("");
    getCategory();
}

// Sélectionnez la ligne de l'en-tête du tableau par sa classe
let headerRow = document.querySelector('.titles');

var lag = dp.getCookie("langue") ? dp.getCookie("langue") : 1;

for (let i = 0; i < headerRow.cells.length; i++) {
    headerRow.cells[i].textContent = lg.lang_prod_header[lag][i];
}

$('form label').find('input, textarea').each(function(index) {
    // Vérifiez si l'index existe dans le tableau avant de l'assigner
    if (lg.lang_prod_input[lag][index]) {
        $(this).attr('placeholder', lg.lang_prod_input[lag][index]);
    }
});

$("form label span").each(function(index) {
    // Vérifiez si l'index existe dans le tableau avant de l'assigner
    if (lg.lang_prod_label[lag][index]) {
        $(this).text(lg.lang_prod_label[lag][index]);
    }
});