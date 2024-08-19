// importer les fonctions, variables, et éléments
import * as dp from '../js/dispay.js';
import * as lg from '../js/api-langue.js';

let object;
let content;

getBoutique();
getDepot();
getData();
getCount();
getMonnaies();
/**
 * Creation of events for processing
 */

// Add data
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
            var depotId = $('#depotId').val();
            var boutiqueId = $('#boutiqueId').val();
            var monnaie = $('#monnaie').val();

            e.preventDefault();
            dp.loaderAdd.addClass('loader');
            dp.loaderAdd.html("");
            $.ajax({
                url: '../models/controllers/controller-stock.php',
                type: 'POST',
                data: {
                    action: 'add',
                    description: description,
                    quantity: quantity,
                    price: price,
                    depotId: depotId,
                    boutiqueId: boutiqueId,
                    monnaie: monnaie
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
            var description  = $('#description').val();
            var quantity  = $('#quantity').val();
            var price  = $('#price').val();
            var depotId  = $('#depotUp').val();
            var boutiqueId = $('#boutiqueId').val();
            var monnaie = $('#monnaie').val();

            e.preventDefault();
            dp.loaderUp.addClass('loader');
            dp.loaderUp.html("");
            $.ajax({
                url: '../models/controllers/controller-stock.php',
                type: 'POST',
                data: {
                    action: 'update',
                    id: id,
                    description: description,
                    quantity: quantity,
                    price: price,
                    depotId: depotId,
                    boutiqueId: boutiqueId,
                    monnaie: monnaie
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

                        // Je remet le nom de l'id a sa place pour que cela fonctionne normalement
                        var depotId = $('#depotUp');
                        depotId.attr('id', 'depotId');
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
                url: '../models/controllers/controller-stock.php',
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
$(document).on('click', 'a[data-role=update]', function() {
    if (!navigator.onLine) {
        let content = dp.network_msg;
        let object = "msg";
        dp.showMessage(object, content);
    } else {
        let id = $(this).data('id');
        if (id.value !== "") {

            let description = $('#' + id).children('td[data-target=description]').text();
            let quantity = $('#' + id).children('td[data-target=quantity]').text();
            let price = $('#' + id).children('td[data-target=price]').text();
            let depotId = $('#' + id).children('td[data-target=product]').text();
            let boutiqueId = $('#' + id).children('td[data-target=boutique]').text();
            $('#idUp').val(id);
            $('#description').val(description);
            $('#quantity').val(quantity);
            $('#price').val(price);
            $('#depotId').val(depotId);
            $('#boutiqueId').val(boutiqueId);

            $.ajax({
                url: '../models/controllers/controller-stock.php',
                type: "post",
                data: {
                    action: 'getDepot',
                    quantity: quantity,
                    id: depotId
                },
                success: function(response) {
                    //  Je recupere l'id de produit pour le reaffecter un autre id en fait de lui envoyer la reponse de serveur(Nouvel sold pour le produit encours de la modification)
                    var depotUp = $('#depotId');
                    depotUp.attr('id', 'depotUp');
                    $('#depotUp').html(response)
                    $('#depotUp').val(depotId);// Ici je renvoit l'id de produit pour que cela selection l'option qui correspond à cette valeur
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


/**
 * Creation of functions
 */
// get data boutique
function getBoutique() {
    $.ajax({
        url: '../models/controllers/controller-stock.php',
        type: "post",
        data: {
            action: 'getBoutique'
        },
        success: function(response) {
            $("#boutiqueId").html(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var object = "error";
            var content = 'Erreur : ' + textStatus + ', ' + errorThrown;
            dp.showMessage(object, content);
        }
    });
}

// get data product
function getDepot() {
    $.ajax({
        url: '../models/controllers/controller-stock.php',
        type: "post",
        data: {
            action: 'getDepot'
        },
        success: function(response) {
            $("#depotId").html(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var object = "error";
            var content = 'Erreur : ' + textStatus + ', ' + errorThrown;
            dp.showMessage(object, content);
        }
    });
}

// get data function
function getData() {
    $.ajax({
        url: '../models/controllers/controller-stock.php',
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
        url: '../models/controllers/controller-stock.php',
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
        url: '../models/controllers/controller-stock.php',
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

// show update btn function
function showBtnUp(){
    dp.showElement('#viewSold');
    dp.showElement('#update');
    dp.hideElement('#send');
}

// Hide update function
function hideBtnUp(){
    dp.hideElement('#update');
    dp.hideElement('#viewSold');
    dp.showElement('#send');

}

// clear fieldes
function clearfields(){
    $('#description').val("");
    $('#quantity').val("");
    $('#price').val("");
    getBoutique();
    getDepot();
}

// Sélectionnez la ligne de l'en-tête du tableau par sa classe
let headerRow = document.querySelector('.titles');

var lag = dp.getCookie("langue") ? dp.getCookie("langue") : 1;

for (let i = 0; i < headerRow.cells.length; i++) {
    headerRow.cells[i].textContent = lg.lang_stock_header[lag][i];
}

$('form label').find('input, textarea').each(function(index){
    // Vérifiez si l'index existe dans le tableau avant de l'assigner
    if (lg.lang_stock_input[lag][index]) {
        $(this).attr('placeholder', lg.lang_stock_input[lag][index]);
    }
});

$("form label span").each(function(index) {
    // Vérifiez si l'index existe dans le tableau avant de l'assigner
    if (lg.lang_stock_label[lag][index]) {
        $(this).text(lg.lang_stock_label[lag][index]);
    }
});
