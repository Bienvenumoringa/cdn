    import { lang_menu, btn_save, btn_update, cancel_btn, lag_search_placeholder, tabNetwork_msg, tabInfoMsg, tabSuccessAddMsg, tabSuccessDeleteMsg, tabErrorAddMsg, tabErrorUpdateMsg, tabErrorDeleteMsg, tabBtnSaveLabel, tabBtnUpdateLabel, tabTuccessUpdateMsg, tabBtnNew, tabBtnClose, tabModalMsg, tabLogin, tabLoginErrorPhone, loginBtn, lang_gende } from './api-langue.js';
    // Recupere les éléments
    var btnNew = document.getElementById('btn-new');
    var btnClose = document.getElementById('btn-close');
    var form = document.getElementById('form');
    var msg = document.getElementById('msg');
    var network = document.querySelectorAll('.network');

    var loaderAdd = $('#loader-add');
    var loaderUp = $('#loader-up')
    var loader_login = $('#loader-login');

    var network_msg; var infoMsg; var successAddMsg; var successUpdateMsg; var successDeleteMsg; var errorAddMsg; var errorUpdateMsg; var errorDeleteMsg; var btnSaveLabel; var btnUpdateLabel; var tabLoginMessage; var tabLoginErrorPhoneMsg; var loginBtnMsg;

    var lag = getCookie("langue") ? getCookie("langue") : 1;

    var object;
    var content;

    let select = $('#gender');

    select.append($('<option>', {
        value: 'Masculin',
        text: lang_gende['Masculin'][lag]
    }));
    select.append($('<option>', {
        value: 'Féminin',
        text: lang_gende['Féminin'][lag]
    }));
    select.append($('<option>', {
        value: 'Autre',
        text: lang_gende['Autre'][lag]
    }));



    // The event which allows the registration form to be displayed
    btnNew.addEventListener('click', ()=>{
        if (! navigator.onLine) {
            e.preventDefault();
            object = "msg";
            content = network_msg;
            showMessage(object, content);
        }
        else{
            btnNewClick();
        }
    });

    // The event which allows you to close the registration form
    btnClose.addEventListener('click', ()=>{
        if (!navigator.onLine) {
            e.preventDefault();
            object = "msg";
            content = network_msg;
            showMessage(object, content);
        } else {
            btnCloseClick();
        }
    });

    function btnNewClick(){
        hideElement(btnNew);
        showElement(btnClose);
        showElement(form);
    }

    function btnCloseClick(){
        showElement(btnNew);
        hideElement(btnClose);
        hideElement(form);
    }
    // The instruction that allows you to test if there is internet connectivity
    network.forEach(function(lien) {
        lien.addEventListener('click', function(e) {
            if (! navigator.onLine) {
                e.preventDefault();
                object = "msg";
                content = network_msg;
                showMessage(object, content);
            }
        });
    });

    // The function that displays the message to the user
    function showMessage(object, content) {
        msg.classList.add(object);
        msg.innerHTML = content;
        var lang;
        var langue = 1;

        // Créer une nouvelle instance de SpeechSynthesisUtterance
        var message = new SpeechSynthesisUtterance();

        if(langue == 1) {
            lang = 'fr-FR'
        } else if(langue == 2) {
            lang = 'en-US'
        } else if(langue == 3) {
            message.rate = 0.7;
            lang = 'ln'
        } else if(langue == 4) {
            message.rate = 0.7;
            lang = 'sw'
        } else {
            lang = 'fr-FR'
        }

        // Définir le texte du message à partir du contenu
        message.text = content;

        // Définir la langue du message
        message.lang = lang;

        var speak = getCookie("speak");
        // Utiliser l'API Web Speech pour parler le texte
        if(speak==="true"){
            window.speechSynthesis.speak(message);
        }

        setTimeout(()=>{
            msg.classList.remove(object);
            msg.innerHTML="";
        }, 6500);
    }


    function getCookie(nom) {
        var nomEQ = nom + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nomEQ) == 0) return c.substring(nomEQ.length,c.length);
        }
        return null;
    }


    function hideElement(selector) {
        $(selector).css("display", "none");
    }

    function showElement(selector) {
        $(selector).css("display", "block");
    }

    $('.menu').find('span').each(function(index) {
        // Vérifiez si l'index existe dans le tableau avant de l'assigner
        if (lang_menu[lag][index]) {
            $(this).text(lang_menu[lag][index]);
        }
    });

    $('.menu-2').find('span').each(function(index) {
        // Vérifiez si l'index existe dans le tableau avant de l'assigner
        if (lang_menu[lag][index]) {
            $(this).text(lang_menu[lag][index]);
        }
    });

    // Placeholde serach
    $('.search').find('input').each(function(index){
        // Vérifiez si l'index existe dans le tableau avant de l'assigner
        if (lag_search_placeholder[lag]) {
            $(this).attr('placeholder', lag_search_placeholder[lag]);
        }
    });

    btnNew.innerHTML = tabBtnNew[lag];
    btnClose.innerHTML = tabBtnClose[lag];
    $('#loader-add').text(btn_save[lag]);
    $('#loader-up').text(btn_update[lag]);
    $('#yes').text(btn_update[lag]);
    $('#loader-login').text(loginBtn[lag]);
    $('#cancel-load').text(cancel_btn[lag]);
    $('#modal-msg').html(tabModalMsg[lag]);

    network_msg =  tabNetwork_msg[lag];
    infoMsg = tabInfoMsg[lag];
    successAddMsg = tabSuccessAddMsg[lag];
    successUpdateMsg = tabTuccessUpdateMsg[lag];
    successDeleteMsg = tabSuccessDeleteMsg[lag];
    errorAddMsg = tabErrorAddMsg[lag];
    errorUpdateMsg = tabErrorUpdateMsg[lag];
    errorDeleteMsg = tabErrorDeleteMsg[lag];
    btnSaveLabel = tabBtnSaveLabel[lag];
    btnUpdateLabel = tabBtnUpdateLabel[lag];
    tabLoginMessage = tabLogin[lag];
    tabLoginErrorPhoneMsg = tabLoginErrorPhone[lag];
    loginBtnMsg = loginBtn[lag];

    // Exporting my variables, functions or elements
    export {
        showMessage, btnNewClick, btnCloseClick, hideElement, showElement, getCookie,
        msg, network_msg, infoMsg, successAddMsg, successUpdateMsg, successDeleteMsg, btnSaveLabel, btnUpdateLabel, loaderAdd, loaderUp, errorAddMsg, errorUpdateMsg, errorDeleteMsg, tabLoginMessage, tabLoginErrorPhoneMsg, loginBtnMsg, loader_login
    };



