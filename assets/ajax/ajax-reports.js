    import * as dp from '../js/dispay.js';
    import * as lg from '../js/api-langue.js';

    var content;
    let object;

    getEtatDepot();
    getEtatDepotTotal();
    getEtatStock();
    getEtatStockTotal();
    getBoutique();
    getPaiment();
    getDette();
    getBoutiqueFilter();
    getDetailVenterToatl();

    // Filtrer l'etat de stock par boutique
    $(document).ready(function() {
        $('#boutique').change(function(e) {
            if (! navigator.onLine) {
                e.preventDefault();
                object = "msg";
                content = dp.network_msg;
                dp.showMessage(object, content);
            } else {
                var boutique
                = $("#boutique").val();
                e.preventDefault();
                $.ajax({
                    url: '../models/controllers/controllor-report.php',
                    type: 'POST',
                    data: {
                        action: 'filterByBoutique',
                        boutique: boutique
                    },
                    success: function(response) {
                        getEtatStock();
                        getEtatStockTotal();
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

    // Recuperer l'etat de depot
    function getEtatDepot() {
        $.ajax({
            url: '../models/controllers/controllor-report.php',
            type: "post",
            data: {
                action: 'getEtatDepot'
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

    // Recuperer me total de l'etait de depot
    function getEtatDepotTotal() {
        $.ajax({
            url: '../models/controllers/controllor-report.php',
            type: "post",
            data: {
                action: 'getEtatDepotTotal'
            },
            success: function(response) {
                $("#dataTotal").html(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var object = "error";
                var content = 'Erreur : ' + textStatus + ', ' + errorThrown;
                dp.showMessage(object, content);
            }
        });
    }

    // Recuperer l'etat de stock
    function getEtatStock() {
        $.ajax({
            url: '../models/controllers/controllor-report.php',
            type: "post",
            data: {
                action: 'getEtatStock'
            },
            success: function(response) {
                $("#datas").html(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var object = "error";
                var content = 'Erreur : ' + textStatus + ', ' + errorThrown;
                dp.showMessage(object, content);
            }
        });
    }

    // Recuperer l'etat de stock total
    function getEtatStockTotal() {
        $.ajax({
            url: '../models/controllers/controllor-report.php',
            type: "post",
            data: {
                action: 'getEtatStockTotal'
            },
            success: function(response) {
                $("#dataTotals").html(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var object = "error";
                var content = 'Erreur : ' + textStatus + ', ' + errorThrown;
                dp.showMessage(object, content);
            }
        });
    }

    // Recuperer la boutique
    function getBoutique() {
        $.ajax({
            url: '../models/controllers/controllor-report.php',
            type: "post",
            data: {
                action: 'getBoutique'
            },
            success: function(response) {
                $("#boutique").html(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var object = "error";
                var content = 'Erreur : ' + textStatus + ', ' + errorThrown;
                dp.showMessage(object, content);
            }
        });
    }

    // Recuperer les boutiques pour filtrer les rapport de vente
    function getBoutiqueFilter() {
        $.ajax({
            url: '../models/controllers/controller-detail-ventes.php',
            type: "post",
            data: {
                action: 'getBoutiqueFilter'
            },
            success: function(response) {
                $("#boutique-filter").html(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var object = "error";
                var content = 'Erreur : ' + textStatus + ', ' + errorThrown;
                dp.showMessage(object, content);
            }
        });
    }

    // Recuperer les infos de la vente en cashe
    function getPaiment() {
        $.ajax({
            url: '../models/controllers/controller-detail-ventes.php',
            type: "post",
            data: {
                action: 'getPaiment'
            },
            success: function(response) {
                $("#dataPaiement").html(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var object = "error";
                var content = 'Erreur : ' + textStatus + ', ' + errorThrown;
                dp.showMessage(object, content);
            }
        });
    }

    // Recuperer les infos de vente en dette
    function getDette() {
        $.ajax({
            url: '../models/controllers/controller-detail-ventes.php',
            type: "post",
            data: {
                action: 'getDette'
            },
            success: function(response) {
                $("#dataDette").html(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var object = "error";
                var content = 'Erreur : ' + textStatus + ', ' + errorThrown;
                dp.showMessage(object, content);
            }
        });
    }

    // Recuperer la date du jour
    let dates = new Date();
    $('#date-debut').val(dates.toISOString().split('T')[0]);
    $('#date-fin').val(dates.toISOString().split('T')[0]);

    // Filter les infos de vente
    $(document).ready(function() {
        $('#filter').on('click', function(e) {
            if (! navigator.onLine) {
                e.preventDefault();
                object = "msg";
                content = dp.network_msg;
                dp.showMessage(object, content);
            } else {
                var dateDebut = $("#date-debut").val();
                var dateFin = $("#date-fin").val();
                var boutique = $('#boutique-filter').val();
                e.preventDefault();
                dp.loaderAdd.addClass('loader');
                dp.loaderAdd.html("");
                $.ajax({
                    url: '../models/controllers/controller-detail-ventes.php',
                    type: 'POST',
                    data: {
                        action: 'filterRecette',
                        dateDebut: dateDebut,
                        dateFin: dateFin,
                        boutique: boutique,
                    },
                    success: function(response) {
                        dp.loaderAdd.removeClass('loader');
                        dp.loaderAdd.html("Filter");
                        getPaiment();
                        getDette();
                        getDetailVenterToatl();
                        location.href = "salesDetails";
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

    // Annuler le filtrage
    $(document).ready(function() {
        $('#cancel').on('click', function(e) {
            if (! navigator.onLine) {
                e.preventDefault();
                object = "msg";
                content = dp.network_msg;
                dp.showMessage(object, content);
            } else {
                e.preventDefault();
                dp.loaderUp.addClass('loader');
                dp.loaderUp.html("");
                $.ajax({
                    url: '../models/controllers/controller-detail-ventes.php',
                    type: 'POST',
                    data: {
                        action: 'annulerFilter',
                    },
                    success: function(response) {
                        dp.loaderUp.removeClass('loader');
                        dp.loaderUp.html("Annuler");
                        getPaiment();
                        getDette();
                        getDetailVenterToatl();
                        location.href = "salesDetails";
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


     // Recuperer me total de l'etait de depot
     function getDetailVenterToatl() {
        $.ajax({
            url: '../models/controllers/controller-detail-ventes.php',
            type: "post",
            data: {
                action: 'getDetailVenterToatl'
            },
            success: function(response) {
                $("#dataTot").html(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var object = "error";
                var content = 'Erreur : ' + textStatus + ', ' + errorThrown;
                dp.showMessage(object, content);
            }
        });
    }

    // Sélectionnez la ligne de l'en-tête du tableau par sa classe
    let headerRow = document.querySelector('.titles');

    var lag = dp.getCookie("langue") ? dp.getCookie("langue") : 1;

    for (let i = 0; i < headerRow.cells.length; i++) {
        headerRow.cells[i].textContent = lg.lang_paie_header[lag][i];
    }

    let headerRow2 = document.querySelector('.titles-2');

    for (let i = 0; i < headerRow2.cells.length; i++) {
        headerRow2.cells[i].textContent = lg.lang_paie_header[lag][i];
    }

    $(".label span").each(function(index) {
        // Vérifiez si l'index existe dans le tableau avant de l'assigner
        if (lg.lang_det_vente_label[lag][index]) {
            $(this).text(lg.lang_det_vente_label[lag][index]);
        }
    });