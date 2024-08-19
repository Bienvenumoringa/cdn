  // importer les fonctions, variables, et éléments
  import {
    showMessage, network_msg, tabLoginMessage, tabLoginErrorPhoneMsg, infoMsg,  btnSaveLabel,loaderAdd, hideElement, showElement, loginBtnMsg, loader_login
} from '../js/dispay.js';

import * as dp from '../js/dispay.js';
import * as lg from '../js/api-langue.js';

var object;
var content;

// Login
$(document).ready(function() {
    $('#send').click(function(e) {
        if (! navigator.onLine) {
            e.preventDefault();
            object = "msg";
            content = network_msg;
            showMessage(object, content);
        } else {
            var email = $('#email').val();
            var pwd = $('#pwd').val();
            e.preventDefault();
            loader_login.addClass('loader');
            loader_login.html("");
            $.ajax({
                url: 'models/controllers/controller-utilisateurs.php',
                type: 'POST',
                data: {
                    action: 'login',
                    email: email,
                    pwd: pwd
                },
                success: function(response) {
                    if (response == true){
                        object = "succes";
                        content = tabLoginMessage;
                        loader_login.removeClass('loader');
                        loader_login.html(loginBtnMsg);
                        showMessage(object, content);
                        setTimeout(()=>{
                            clearfields();
                            location.href = "views/";
                        }, 2000);
                    } else if(response == false ) {
                        object = "error";
                        content = tabLoginErrorPhoneMsg;
                        loader_login.removeClass('loader');
                        loader_login.html(loginBtnMsg);
                        showMessage(object, content);
                    } else if(response == "info") {
                        object = "info";
                        content = infoMsg;
                        loader_login.removeClass('loader');
                        loader_login.html(loginBtnMsg);
                        showMessage(object, content);
                    } else {
                        object = "error";
                        content = response;
                        loader_login.removeClass('loader');
                        loader_login.html(loginBtnMsg);
                        showMessage(object, content);
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

    let hide = $('#hide');
    let view = $('#view');
    let pwd = $('#pwd');

    view.on("click", function() {
        pwd.attr('type', 'text');
        hideElement(view);
        showElement(hide);
    });

    hide.on("click", function() {
        pwd.attr('type', 'password');
        hideElement(hide);
        showElement(view);
    });
});

// vider les champs
function clearfields(){
    $('#email').val("");
    $('#pwd').val("");
}

// Recuperé la lange
var lag = dp.getCookie("langue") ? dp.getCookie("langue") : 1;


$(".w-full label span").each(function(index) {
    // Vérifiez si l'index existe dans le tableau avant de l'assigner
    if (lg.lang_login_label[lag][index]) {
        $(this).text(lg.lang_login_label[lag][index]);
    }
});

$(".forgot, p").find('a, span').each(function(index) {
    // Vérifiez si l'index existe dans le tableau avant de l'assigner
    if (lg.lang_forgot[lag][index]) {
        $(this).text(lg.lang_forgot[lag][index]);
    }
});