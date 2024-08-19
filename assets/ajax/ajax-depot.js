// importer les fonctions, variables, et éléments
import * as dp from '../js/dispay.js';
import * as lg from '../js/api-langue.js';

var object;
var content;

getProduct();
getfourrnisseur();
getData();
getCount();
getMonnaies();

// Inserer les donnees
$(document).ready(function() {
    $('#send').click(function(e) {
        if (! navigator.onLine) {
            e.preventDefault();
            object = "msg";
            content = dp.network_msg;
            dp.showMessage(object, content);
        } else {
            var description = $('#description').val();
            var quantity = $('#quantity').val();
            var price = $('#price').val();
            var product = $('#product').val();
            var fournisseurId = $('#fournisseurId').val();
            var monnaie = $('#monnaie').val();

            e.preventDefault();
            dp.loaderAdd.addClass('loader');
            dp.loaderAdd.html("");
            $.ajax({
                url: '../models/controllers/controller-depot.php',
                type: 'POST',
                data: {
                    action: 'add',
                    description: description,
                    quantity: quantity,
                    price: price,
                    product: product,
                    fournisseurId: fournisseurId,
                    monnaie: monnaie
                },
                success: function(response) {
                    if (response == true) {
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

// Modifier les donnees
$(document).ready(function() {
    $('#update').click(function(e) {
        if (! navigator.onLine) {
            e.preventDefault();
            object = "msg";
            content = dp.network_msg;
            dp.showMessage(object, content);
        } else {
            var id = $('#idUp').val();
            var description = $('#description').val();
            var quantity = $('#quantity').val();
            var price = $('#price').val();
            var product = $('#product').val();
            var fournisseurId = $('#fournisseurId').val();
            var monnaie = $('#monnaie').val();

            e.preventDefault();
            dp.loaderUp.addClass('loader');
            dp.loaderUp.html("");
            $.ajax({
                url: '../models/controllers/controller-depot.php',
                type: 'POST',
                data: {
                    action: 'update',
                    id: id,
                    description: description,
                    quantity: quantity,
                    price: price,
                    product: product,
                    fournisseurId: fournisseurId,
                    monnaie: monnaie
                },
                success: function(response) {
                    if (response == true ){
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

// Supprimer les données
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
                url: '../models/controllers/controller-depot.php',
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

// recherche des donnees
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

// complete form lors de la modification
$(document).on('click', 'a[data-role=update]', function(){
    if(! navigator.onLine){
        content = dp.network_msg;
        object = "msg";
        dp.showMessage(object, content);
    } else {
        var id = $(this).data('id');
        if(id.value!="") {
            var description=$('#'+id).children('td[data-target=description]').text();
            var quantity=$('#'+id).children('td[data-target=quantity]').text();
            var price=$('#'+id).children('td[data-target=price]').text();
            var product=$('#'+id).children('td[data-target=productId]').text();
            var fournisseurId=$('#'+id).children('td[data-target=fournisseurId]').text();

            $('#idUp').val(id);
            $('#description').val(description);
            $('#quantity').val(quantity);
            $('#price').val(price);
            $('#product').val(product);
            $('#fournisseurId').val(fournisseurId);
            showBtnUp();
            dp.btnNewClick();
        }
    }
});

// afficher les données
function getData() {
    $.ajax({
        url: '../models/controllers/controller-depot.php',
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

// La methode qui permet de faire la recherche
function searchData(search) {
    $.ajax({
        url: '../models/controllers/controller-depot.php',
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

// La methode qui compte les donnees
function getCount() {
    $.ajax({
        url: '../models/controllers/controller-depot.php',
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

// La methode qui recupere les produit (clé étrangère)
function getProduct() {
    $.ajax({
        url: '../models/controllers/controller-depot.php',
        type: "post",
        data: {
            action: 'getPro'
        },
        success: function(response) {
            $("#product").html(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var object = "error";
            var content = 'Erreur : ' + textStatus + ', ' + errorThrown;
            dp.showMessage(object, content);
        }
    });
}

// la methode qui recupere les fornisseurs (clé étrangère)
function getfourrnisseur() {
    $.ajax({
        url: '../models/controllers/controller-depot.php',
        type: "post",
        data: {
            action: 'getSupp'
        },
        success: function(response) {
            $("#fournisseurId").html(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var object = "error";
            var content = 'Erreur : ' + textStatus + ', ' + errorThrown;
            dp.showMessage(object, content);
        }
    });
}

// Recuperer les monnaies
function getMonnaies() {
    $.ajax({
        url: '../models/controllers/controller-monnaies.php',
        type: "post",
        data: {
            action: 'getMonnaie'
        },
        success: function(response) {
            $("#monnaie").html(response);
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

// masquer le bouton de la modification
function hideBtnUp(){
    dp.hideElement('#update');
    dp.showElement('#send');
}

// vider les champs
function clearfields(){
    $('#description').val('');
    $('#quantity').val('');
    $("#price").val('');
    getProduct();
    getfourrnisseur();
    getMonnaies();
}

// Sélectionnez la ligne de l'en-tête du tableau par sa classe
let headerRow = document.querySelector('.titles');

var lag = dp.getCookie("langue") ? dp.getCookie("langue") : 1;

for (let i = 0; i < headerRow.cells.length; i++) {
    headerRow.cells[i].textContent = lg.lang_dep_header[lag][i];
}

$('form label').find('input, textarea').each(function(index) {
    // Vérifiez si l'index existe dans le tableau avant de l'assigner
    if (lg.lang_dep_input[lag][index]) {
        $(this).attr('placeholder', lg.lang_dep_input[lag][index]);
    }
});

$("form label span").each(function(index) {
    // Vérifiez si l'index existe dans le tableau avant de l'assigner
    if (lg.lang_dep_label[lag][index]) {
        $(this).text(lg.lang_dep_label[lag][index]);
    }
});
