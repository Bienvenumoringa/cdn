// importer les fonctions, variables, et éléments

var object;
var content;

getProductSold();
// la fonction qui fait la recherche
function getProductSold() {
    let params = new URLSearchParams(window.location.search);
    var id = params.get('id');

    $.ajax({
        url: '../models/controllers/controllor-dashbord-product.php',
        type: "post",
        data: {
            action: 'getProductSold',
            id: id
        },
        success: function(response) {
            $("#data").html(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var object = "error";
            var content = 'Erreur : ' + textStatus + ', ' + errorThrown;
            showMessage(object, content);
        }
    });
}

getProductName();
// la fonction qui fait la recherche
function getProductName() {
    let params = new URLSearchParams(window.location.search);
    var id = params.get('id');

    $.ajax({
        url: '../models/controllers/controllor-dashbord-product.php',
        type: "post",
        data: {
            action: 'getProductName',
            id: id
        },
        success: function(response) {
            if(response != "") {
                $("#prouctName").html(response);
            } else {
                $("#prouctName").html("Aucun produit trouvé pour le numéro " + id)
            }

        },
        error: function(jqXHR, textStatus, errorThrown) {
            var object = "error";
            var content = 'Erreur : ' + textStatus + ', ' + errorThrown;
            showMessage(object, content);
        }
    });
}

getProductSoldT();
// la fonction qui fait la recherche
function getProductSoldT() {
    let params = new URLSearchParams(window.location.search);
    var id = params.get('id');

    $.ajax({
        url: '../models/controllers/controllor-dashbord-product-graphic1.php',
        type: "post",
        data: {
            action: 'getProductSold',
            id: id
        },
        success: function(response) {
            var datas = JSON.parse(response);
            const pieConfig = {
              type: 'doughnut',
              data: {
                datasets: [
                  {
                    data: [datas[0], datas[1], datas[2]],
                    backgroundColor: ['#1c64f2',   '#7e3af2', '#905944' ],
                    label: 'Dataset 1',
                  },
                ],
                labels: ['Totale de vente','Paiements cashes', 'Paiements dettes',],
              },
              options: {
                responsive: true,
                cutoutPercentage: 80,
                legend: {
                  display: false,
                },
              },
            }
            const pieCtx = document.getElementById('pie')
            window.myPie = new Chart(pieCtx, pieConfig)
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var object = "error";
            var content = 'Erreur : ' + textStatus + ', ' + errorThrown;
            showMessage(object, content);
        }
    });
}

getProductSockEvolution();
// la fonction qui fait la recherche
function getProductSockEvolution() {
    let params = new URLSearchParams(window.location.search);
    var id = params.get('id');

    $.ajax({
        url: '../models/controllers/controllor-dashbord-product-graphic1.php',
        type: "post",
        data: {
            action: 'getProductSold',
            id: id
        },
        success: function(response) {
            var datas = JSON.parse(response);
            const dataValues = [datas[0], datas[1], datas[2]]; // Vos valeurs de données
            const colors = ['#1c64f2',   '#7e3af2', '#905944']; // Vos couleurs

            const barConfig = {
            type: 'bar',
            data: {
                labels: ['Totale de vente','Paiements cashes', 'Paiements dettes', ],
                datasets: [
                    {
                        label: 'Shoes',
                        backgroundColor: dataValues.map((value, index) => colors[index % colors.length]),
                        borderWidth: 1,
                        data: dataValues,
                    },
                ],
            },
            options: {
                responsive: true,
                legend: {
                display: false,
                },
            },
            };

            const barsCtx = document.getElementById('bars');
            window.myBar = new Chart(barsCtx, barConfig);

        },
        error: function(jqXHR, textStatus, errorThrown) {
            var object = "error";
            var content = 'Erreur : ' + textStatus + ', ' + errorThrown;
            showMessage(object, content);
        }
    });
}

getAllReccette();
// la fonction qui fait la recherche
function getAllReccette(search) {
    let params = new URLSearchParams(window.location.search);
    var id = params.get('id');

    $.ajax({
        url: '../models/controllers/controllor-dashbord-product.php',
        type: "post",
        data: {
            action: 'getAllRecette',
            id: id
        },
        success: function(response) {
            console.log(response)
            $("#datas").html(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var object = "error";
            var content = 'Erreur : ' + textStatus + ', ' + errorThrown;
            showMessage(object, content);
        }
    });
}


