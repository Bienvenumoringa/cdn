// importer les fonctions, variables, et éléments
import * as dp from '../js/dispay.js';
import * as lg from '../js/api-langue.js';

var object;
var content;

getDettes();
getData();
getCount();
getMonnaies();

// InseGrer les données
$(document).ready(function() {
    $('#send').click(function(e) {
        if (! navigator.onLine) {
            e.preventDefault();
            object = "msg";
            content = dp.network_msg;
            dp.showMessage(object, content);
        } else {
            var description = $('#description').val();
            var montant = $('#montant').val();
            var dettes = $('#dettes').val();
            var monnaie = $('#monnaie').val();
            e.preventDefault();
            dp.loaderAdd.addClass('loader');
            dp.loaderAdd.html("");
            $.ajax({
                url: '../models/controllers/controller-paiements-dettes.php',
                type: 'POST',
                data: {
                    action: 'add',
                    description: description,
                    montant: montant,
                    dettes: dettes,
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
            var dettes  = $('#dettesUp').val();
            var monnaie = $('#monnaie').val();
            e.preventDefault();
            dp.loaderUp.addClass('loader');
            dp.loaderUp.html("");
            $.ajax({
                url: '../models/controllers/controller-paiements-dettes.php',
                type: 'POST',
                data: {
                    action: 'update',
                    id: id,
                    description: description,
                    montant: montant,
                    dettes: dettes,
                    monnaie: monnaie
                },
                success: function(response) {
                    if (response == true){
                        object = "succes";
                        content = dp.successUpdateMsg;
                        dp.loaderUp.removeClass('loader');
                        dp.loaderUp.html(dp.btnUpdateLabel);
                        dp.loaderAdd.html(dp.btnSaveLabel);
                        var dettes = $('#dettesUp');
                        dettes.attr('id', 'dettes');
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
                url: '../models/controllers/controller-paiements-dettes.php',
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
            let montant=$('#'+id).children('td[data-target=montant]').text();
            let dettes=$('#'+id).children('td[data-target=dettes]').text();

            $('#idUp').val(id);
            $('#description').val(description);
            $('#montant').val(montant);
            $('#dettes').val(dettes);

            $.ajax({
                url: '../models/controllers/controller-paiements-dettes.php',
                type: "post",
                data: {
                    action: 'getDette',
                    montant: montant,
                    id: dettes
                },
                success: function(response) {
                    // //  Je recupere l'id de la commande pour le reaffecter un autre id en fait de lui envoyer la reponse de serveur(Nouvel sold pour le produit encours de la modification)
                    var dettesUp = $('#dettes');
                    dettesUp.attr('id', 'dettesUp');
                    $('#dettesUp').html(response)
                    $('#dettesUp').val(dettes);// Ici je renvoit l'id de la commande pour que cela selection l'option qui correspond à cette valeur
                    console.log(response);
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
    $.ajax({
        url: '../models/controllers/controller-paiements-dettes.php',
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
        url: '../models/controllers/controller-paiements-dettes.php',
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
        url: '../models/controllers/controller-paiements-dettes.php',
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
function getDettes() {
    $.ajax({
        url: '../models/controllers/controller-paiements-dettes.php',
        type: "post",
        data: {
            action: 'getDette'
        },
        success: function(response) {
            $("#dettes").html(response);
            console.log(response);
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
    getDettes();
}

// Sélectionnez la ligne de l'en-tête du tableau par sa classe
let headerRow = document.querySelector('.titles');

var lag = dp.getCookie("langue") ? dp.getCookie("langue") : 1;

for (let i = 0; i < headerRow.cells.length; i++) {
    headerRow.cells[i].textContent = lg.lang_paie_dettes_header[lag][i];
}

$('form label').find('input, textarea').each(function(index) {
    // Vérifiez si l'index existe dans le tableau avant de l'assigner
    if (lg.lang_paie_dettes_input[lag][index]) {
        $(this).attr('placeholder', lg.lang_paie_dettes_input[lag][index]);
    }
});

$("form label span").each(function(index) {
    // Vérifiez si l'index existe dans le tableau avant de l'assigner
    if (lg.lang_paie_dettes_label[lag][index]) {
        $(this).text(lg.lang_paie_dettes_label[lag][index]);
    }
});