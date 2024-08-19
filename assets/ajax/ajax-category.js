    // importer les fonctions, variables, et éléments
    import * as dp from '../js/dispay.js';
    import * as lg from '../js/api-langue.js';

    var object;
    var content;

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
                e.preventDefault();
                dp.loaderAdd.addClass('loader');
                dp.loaderAdd.html("");
                $.ajax({
                    url: '../models/controllers/controller-category.php',
                    type: 'POST',
                    data: {
                        action: 'add',
                        name: name
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
                var name  = $('#name').val();
                e.preventDefault();
                dp.loaderUp.addClass('loader');
                dp.loaderUp.html("");
                $.ajax({
                    url: '../models/controllers/controller-category.php',
                    type: 'POST',
                    data: {
                        action: 'update',
                        id: id,
                        name: name
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
                    url: '../models/controllers/controller-category.php',
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
                let Nom=$('#'+id).children('td[data-target=name]').text();
                $('#idUp').val(id);
                $('#name').val(Nom);
                showBtnUp();
                dp.btnNewClick();
            }
        }
    });

    // Recuperer les données
    function getData() {
        $.ajax({
            url: '../models/controllers/controller-category.php',
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
            url: '../models/controllers/controller-category.php',
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
            url: '../models/controllers/controller-category.php',
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
        $('#name').val("");
    }

    // Sélectionnez la ligne de l'en-tête du tableau par sa classe
    let headerRow = document.querySelector('.titles');

    var lag = dp.getCookie("langue") ? dp.getCookie("langue") : 1;

    for (let i = 0; i < headerRow.cells.length; i++) {
        headerRow.cells[i].textContent = lg.lang_cat_header[lag][i];
    }

    $('#name').attr('placeholder', lg.lang_cat_input[lag]);

    $("form label span").eq(0).text(lg.lang_cat_label[lag]);
