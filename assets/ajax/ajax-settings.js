import {
    showMessage, network_msg, getCookie,  hideElement, showElement, infoMsg, successAddMsg, successUpdateMsg, successDeleteMsg, btnSaveLabel, btnUpdateLabel, loaderAdd, loaderUp, errorAddMsg, errorUpdateMsg, errorDeleteMsg
} from '../js/dispay.js';

import {settings_title, lag_setting_label, lang_lang } from '../js/api-langue.js';

getMonnaies();
getPages();
getPgesGernerales();

var object;
var content;

// Sauvegarder les données de settings
$(document).ready(function() {
    $('#send').click(function(e) {
        if (! navigator.onLine) {
            e.preventDefault();
            object = "msg";
            content = network_msg;
            showMessage(object, content);
        } else {
            var monnaie = $('#monnaie').val();
            var generete_page = $('#generete-page').val();
            var generete_page = $('#generete-page').prop('checked') ? $('#generete-page').prop('checked') : '';
            var confirm_mails = $('#confirm_mails').prop('checked') ? $('#confirm_mails').prop('checked') : '';
            var permission = $('#permission').prop('checked') ? $('#permission').prop('checked') : '';
            var send_mails = $('#send_mails').prop('checked') ? $('#send_mails').prop('checked') : '';
            var reset_password = $('#reset_password').prop('checked') ? $('#reset_password').prop('checked') : '';

            e.preventDefault();
            loaderAdd.addClass('loader');
            loaderAdd.html("");
            $.ajax({
                url: '../models/controllers/cotroller-paramettres.php',
                type: 'POST',
                data: {
                    action: 'save',
                    monnaie: monnaie,
                    generete_page: generete_page,
                    confirm_mails: confirm_mails,
                    permission: permission,
                    send_mails: send_mails,
                    reset_password: reset_password
                },
                success: function(response) {
                    if (response[0] == true){
                        object = "succes";
                        content = successAddMsg;

                        loaderAdd.removeClass('loader');
                        loaderAdd.html(btnSaveLabel);
                        getMonnaies();
                        showMessage(object, content);
                        setTimeout(()=>{
                            location.href = "settings";
                        }, 5000);

                    } else if(response[0] == false) {
                        object = "error";
                        content = errorAddMsg;

                        loaderAdd.removeClass('loader');
                        loaderAdd.html(btnSaveLabel);

                        showMessage(object, content);
                        getMonnaies();
                    } else if(response[0] == 'info') {
                        object = "info";
                        content = infoMsg;

                        loaderAdd.removeClass('loader');
                        loaderAdd.html(btnSaveLabel);

                        showMessage(object, content);
                        getMonnaies();
                    }else {
                        object = "error";
                        content = response;

                        loaderAdd.removeClass('loader');
                        loaderAdd.html(btnUpdateLabel);
                        loaderAdd.html(btnSaveLabel);

                        showMessage(object, content);
                        getMonnaies();
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    object = "error";
                    content = 'Erreur : ' + textStatus + ', ' + errorThrown;
                    showMessage(object, content);
                }
            });
        }
    });
});

document.getElementById("sendPerm").addEventListener("click", ()=> {
    // alert('ok')
})
// Gerer les langues
 $(document).ready(function() {
        $('#langue').change(function(e) {
            if (! navigator.onLine) {
                e.preventDefault();
                object = "msg";
                content = network_msg;
                showMessage(object, content);
            } else {
                var langue = $("#langue").val();
                e.preventDefault();
                $.ajax({
                    url: '../models/controllers/cotroller-paramettres.php',
                    type: 'POST',
                    data: {
                        action: 'langue',
                        langue: langue
                    },
                    success: function(response) {
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        object = "error";
                        content = 'Erreur : ' + textStatus + ', ' + errorThrown;
                        showMessage(object, content);
                    }
                });
            }
        });
    });

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
                showMessage(object, content);
            }
        });
    }



    // Recuperer les pages
    function getPages() {
        $.ajax({
            url: '../models/controllers/cotroller-paramettres.php',
            type: "post",
            data: {
                action: 'getPges'
            },
            success: function(response) {
                $("#pages").html(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var object = "error";
                var content = 'Erreur : ' + textStatus + ', ' + errorThrown;
                showMessage(object, content);
            }
        });
    }

    // Recuperer les pages
    function getPgesGernerales() {
        $.ajax({
            url: '../models/controllers/cotroller-paramettres.php',
            type: "post",
            data: {
                action: 'getPgesGernerales'
            },
            success: function(response) {
                $("#getPgesGernerales").html(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var object = "error";
                var content = 'Erreur : ' + textStatus + ', ' + errorThrown;
                showMessage(object, content);
            }
        });
    }


    $("#speak").change(function() {
        let indicator =  ($(this).is(":checked")) ? true : false;
        $.ajax({
            url: '../models/controllers/cotroller-paramettres.php',
            method: 'POST',
            data: {
                action: 'cortana',
                indicator: indicator
            },
            success: function(response) {
            },
            error: function(xhr, status, error) {
                console.error('Erreur AJAX :', error);
            }
        });
    });




var lag = getCookie("langue") ? getCookie("langue") : 1;

let select = $('#langue');

select.append($('<option>', {
    value: '1',
    text: lang_lang['fr'][lag]
}));
select.append($('<option>', {
    value: '2',
    text: lang_lang['en'][lag]
}));
select.append($('<option>', {
    value: '3',
    text: lang_lang['lg'][lag]
}));

select.val(lag);

$('#setting-title').text(settings_title[lag]);

$(".label label span").each(function(index) {
    // Vérifiez si l'index existe dans le tableau avant de l'assigner
    if (lag_setting_label[lag][index]) {
        $(this).text(lag_setting_label[lag][index]);
    }
});
