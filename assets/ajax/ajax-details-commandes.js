// importer les fonctions, variables, et éléments
import * as dp from '../js/dispay.js';
import * as lg from '../js/api-langue.js';

var object;
var content;

getData();
getCount();
getProduit();
getMontantApayer();
getEnTete();

// Inserer les données
$(document).ready(function() {
    $('#send').click(function(e) {
        if (! navigator.onLine) {
            e.preventDefault();
            object = "msg";
            content = dp.network_msg;
            dp.showMessage(object, content);
        } else {
            // Supposons que l'URL est "http://exemple.com?cle=valeur"
            let params = new URLSearchParams(window.location.search);

            var description = $('#description').val();
            var quantity = $('#quantity').val();
            var produit = $('#produit').val();
            var idCommande = params.get('id'); // "valeur"
            e.preventDefault();
            dp.loaderAdd.addClass('loader');
            dp.loaderAdd.html("");
            $.ajax({
                url: '../models/controllers/controller-commandes.php',
                type: 'POST',
                data: {
                    action: 'addDetail',
                    description: description,
                    quantity: quantity,
                    produit: produit,
                    idCommande: idCommande
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
                        getMontantApayer();
                        clearfields();
                    } else if(response == false ) {
                        object = "error";
                        content = dp.errorAddMsg;
                        dp.loaderAdd.removeClass('loader');
                        dp.loaderAdd.html(dp.btnSaveLabel);
                        dp.showMessage(object, content);
                        getData();
                        getMontantApayer();
                        getCount();
                    } else if(response == "info") {
                        object = "info";
                        content = dp.infoMsg;
                        dp.loaderAdd.removeClass('loader');
                        dp.loaderAdd.html(dp.btnSaveLabel);
                        dp.showMessage(object, content);
                        getData();
                        getMontantApayer();
                        getCount();
                    } else {
                        object = "error";
                        content = response;
                        dp.loaderAdd.removeClass('loader');
                        dp.loaderAdd.html(dp.btnSaveLabel);
                        dp.showMessage(object, content);
                        getData();
                        getMontantApayer();
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
            var produit = $('#produitUp').val();
            var quantity = $('#quantity').val();
            e.preventDefault();
            dp.loaderUp.addClass('loader');
            dp.loaderUp.html("");
            $.ajax({
                url: '../models/controllers/controller-commandes.php',
                type: 'POST',
                data: {
                    action: 'updateDetail',
                    id: id,
                    description: description,
                    produit: produit,
                    quantity: quantity
                },
                success: function(response) {
                    if (response == true){
                        object = "succes";
                        content = dp.successUpdateMsg;
                        dp.loaderUp.removeClass('loader');
                        dp.loaderUp.html(dp.btnUpdateLabel);
                        dp.loaderAdd.html(dp.btnSaveLabel);
                        dp.showMessage(object, content);
                        var produit = $('#produitUp');
                        produit.attr('id', 'produit');
                        hideBtnUp();
                        dp.btnNewClick();
                        getData();
                        getMontantApayer();
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
                        getMontantApayer();
                        getCount();
                    } else if(response == "info") {
                        object = "info";
                        content = dp.infoMsg;
                        dp.loaderUp.removeClass('loader');
                        dp.loaderUp.html(dp.btnUpdateLabel);
                        dp.loaderAdd.html(dp.btnSaveLabel);
                        dp.showMessage(object, content);
                        getData();
                        getMontantApayer();
                        getCount();
                    } else {
                        object = "error";
                        content = response;
                        dp.loaderUp.removeClass('loader');
                        dp.loaderUp.html(dp.btnUpdateLabel);
                        dp.loaderAdd.html(dp.btnSaveLabel);
                        dp.showMessage(object, content);
                        getData();
                        getMontantApayer();
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
                url: '../models/controllers/controller-commandes.php',
                type: 'POST',
                data: {
                    action: 'deleteDetail',
                    id: id
                },
                success: function(response) {
                    if (response == true){
                        object = "succes";
                        content = dp.successDeleteMsg;
                        dp.showMessage(object, content);
                        getData();
                        getMontantApayer();
                        getCount();
                        clearfields();
                    }  else if(response == false) {
                        object = "error";
                        content = dp.errorDeleteMsg;
                        dp.showMessage(object, content);
                        getData();
                        getMontantApayer();
                        getCount();
                    } else if(response == "info") {
                        object = "info";
                        content = dp.infoMsg;
                        dp.showMessage(object, content);
                        getData();
                        getMontantApayer();
                        getCount();
                    } else {
                        object = "error";
                        content = response;
                        dp.loaderUp.removeClass('loader');
                        dp.loaderUp.html(dp.btnUpdateLabel);
                        dp.loaderAdd.html(dp.btnSaveLabel);
                        dp.showMessage(object, content);
                        getData();
                        getMontantApayer();
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
            let quantity=$('#'+id).children('td[data-target=quantity]').text();
            let produit=$('#'+id).children('td[data-target=produit]').text();
            $('#idUp').val(id);
            $('#description').val(description);
            $('#quantity').val(quantity);
            $('#produit').val(produit);

            $.ajax({
                url: '../models/controllers/controller-commandes.php',
                type: "post",
                data: {
                    action: 'getProduit',
                    quantity: quantity,
                    id: produit
                },
                success: function(response) {
                    //  Je recupere l'id de produit pour le reaffecter un autre id en fait de lui envoyer la reponse de serveur(Nouvel sold pour le produit encours de la modification)
                    var produitUp = $('#produit');
                    produitUp.attr('id', 'produitUp');
                    $('#produitUp').html(response)
                    $('#produitUp').val(produit);// Ici je renvoit l'id de produit pour que cela selection l'option qui correspond à cette valeur
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    var object = "error";
                    var content = 'Erreur : ' + textStatus + ', ' + errorThrown;
                    dp.showMessage(object, content);
                }
            });
            showBtnUp();
            dp.btnNewClick();
        }
    }
});

// Recuperer les données
function getData() {
    let params = new URLSearchParams(window.location.search);
    var id = params.get('id'); // "valeur"

    $.ajax({
        url: '../models/controllers/controller-commandes.php',
        type: "post",
        data: {
            action: 'getDetail',
            id: id
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
    let params = new URLSearchParams(window.location.search);
    var id = params.get('id'); // "valeur"
    $.ajax({
        url: '../models/controllers/controller-commandes.php',
        type: "post",
        data: {
            action: 'getDetail',
            search: search,
            id: id
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
// Recuperer le montant à payer
function getMontantApayer() {
    let params = new URLSearchParams(window.location.search);
    var id = params.get('id'); // "valeur"
    $.ajax({
        url: '../models/controllers/controller-commandes.php',
        type: "post",
        data: {
            action: 'getTotal',
            id: id
        },
        success: function(response) {
            $("#montApeyer").html(response);
            $('#doit').html(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var object = "error";
            var content = 'Erreur : ' + textStatus + ', ' + errorThrown;
            dp.showMessage(object, content);
        }
    });
}

// Recuperer les données
function getEnTete() {
    let params = new URLSearchParams(window.location.search);
    var id = params.get('id'); // "valeur"
    $.ajax({
        url: '../models/controllers/controller-commandes.php',
        type: "post",
        data: {
            action: 'getTete',
            id: id
        },
        success: function(response) {
            $("#header").html(response);
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
    let params = new URLSearchParams(window.location.search);
    var id = params.get('id'); // "valeur"
    $.ajax({
        url: '../models/controllers/controller-commandes.php',
        type: "post",
        data: {
            action: 'countDetail',
            id: id
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

// La fonction compte les nombre des données
function getProduit() {
    $.ajax({
        url: '../models/controllers/controller-commandes.php',
        type: "post",
        data: {
            action: 'getProduit'
        },
        success: function(response) {
            $("#produit").html(response);
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
    $('#quantity').val("");
    getProduit();
}

// Sélectionnez la ligne de l'en-tête du tableau par sa classe
let headerRow = document.querySelector('.titles');

var lag = dp.getCookie("langue") ? dp.getCookie("langue") : 1;

for (let i = 0; i < headerRow.cells.length; i++) {
    headerRow.cells[i].textContent = lg.lang_det_com_header[lag][i];
}

$('form label').find('input, textarea').each(function(index) {
    // Vérifiez si l'index existe dans le tableau avant de l'assigner
    if (lg.lang_det_com_input[lag][index]) {
        $(this).attr('placeholder', lg.lang_det_com_input[lag][index]);
    }
});

$("form label span").each(function(index) {
    // Vérifiez si l'index existe dans le tableau avant de l'assigner
    if (lg.lang_det_com_label[lag][index]) {
        $(this).text(lg.lang_det_com_label[lag][index]);
    }
});