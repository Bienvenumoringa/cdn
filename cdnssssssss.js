import*as e from"./assets/js/dispay.js";import*as t from"./assets/js/api-langue.js";let object,content;function getData(){$.ajax({url:"../models/controllers/controller-boutique.php",type:"post",data:{action:"get"},success:function(e){$("#data").html(e)},error:function(t,o,a){e.showMessage("error","Erreur : "+o+", "+a)}})}function searchData(t){$.ajax({url:"../models/controllers/controller-boutique.php",type:"post",data:{action:"get",search:t},success:function(e){$("#data").html(e)},error:function(t,o,a){e.showMessage("error","Erreur : "+o+", "+a)}})}function getCount(){$.ajax({url:"../models/controllers/controller-boutique.php",type:"post",data:{action:"count"},success:function(e){$("#total").html(e)},error:function(t,o,a){e.showMessage("error","Erreur : "+o+", "+a)}})}function showBtnUp(){e.showElement("#update"),e.hideElement("#send")}function hideBtnUp(){e.hideElement("#update"),e.showElement("#send")}function clearfields(){$("#name").val(""),$("#description").val(""),$("#adress").val("")}getData(),getCount(),$(document).ready(function(){$("#send").click(function(t){if(navigator.onLine){var o=$("#name").val(),a=$("#description").val(),n=$("#adress").val();t.preventDefault(),e.loaderAdd.addClass("loader"),e.loaderAdd.html(""),$.ajax({url:"../models/controllers/controller-boutique.php",type:"POST",data:{action:"add",name:o,description:a,adress:n},success:function(t){!0==t?(object="succes",content=e.successAddMsg,e.loaderAdd.removeClass("loader"),e.loaderAdd.html(e.btnSaveLabel),e.showMessage(object,content),getData(),getCount(),clearfields()):!1==t?(object="error",content=e.errorAddMsg,e.loaderAdd.removeClass("loader"),e.loaderAdd.html(e.btnSaveLabel),e.showMessage(object,content),getData(),getCount()):"info"==t?(object="info",content=e.infoMsg,e.loaderAdd.removeClass("loader"),e.loaderAdd.html(e.btnSaveLabel),e.showMessage(object,content),getData(),getCount()):(object="error",content=t,e.loaderAdd.removeClass("loader"),e.loaderAdd.html(e.btnUpdateLabel),e.loaderAdd.html(e.btnSaveLabel),e.showMessage(object,content),getData(),getCount())},error:function(t,o,a){object="error",content="Erreur : "+o+", "+a,e.showMessage(object,content)}})}else t.preventDefault(),object="msg",content=e.network_msg,e.showMessage(object,content)})}),$(document).ready(function(){$("#update").click(function(t){if(navigator.onLine){var o=$("#idUp").val(),a=$("#name").val(),n=$("#description").val(),r=$("#adress").val();t.preventDefault(),e.loaderUp.addClass("loader"),e.loaderUp.html(""),$.ajax({url:"../models/controllers/controller-boutique.php",type:"POST",data:{action:"update",id:o,name:a,description:n,adress:r},success:function(t){!0==t?(object="succes",content=e.successUpdateMsg,e.loaderUp.removeClass("loader"),e.loaderUp.html(e.btnUpdateLabel),e.loaderAdd.html(e.btnSaveLabel),e.showMessage(object,content),e.btnNewClick(),hideBtnUp(),getData(),getCount(),clearfields()):!1==t?(object="error",content=e.errorUpdateMsg,e.loaderUp.removeClass("loader"),e.loaderUp.html(e.btnUpdateLabel),e.loaderAdd.html(e.btnSaveLabel),e.showMessage(object,content),getData(),getCount()):"info"==t?(object="info",content=e.infoMsg,e.loaderUp.removeClass("loader"),e.loaderUp.html(e.btnUpdateLabel),e.loaderAdd.html(e.btnSaveLabel),e.showMessage(object,content),getData(),getCount()):(object="error",content=t,e.loaderUp.removeClass("loader"),e.loaderUp.html(e.btnUpdateLabel),e.loaderAdd.html(e.btnSaveLabel),e.showMessage(object,content),getData(),getCount())},error:function(t,o,a){object="error",content="Erreur : "+o+", "+a,e.showMessage(object,content)}})}else t.preventDefault(),object="msg",content=e.network_msg,e.showMessage(object,content)})}),$(document).ready(function(){$("#yes").click(function(t){if(navigator.onLine){var o=$("#idSup").val();t.preventDefault(),$.ajax({url:"../models/controllers/controller-boutique.php",type:"POST",data:{action:"delete",id:o},success:function(t){!0==t?(object="succes",content=e.successDeleteMsg,e.showMessage(object,content),getData(),getCount(),clearfields()):!1==t?(object="error",content=e.errorDeleteMsg,e.showMessage(object,content),getData(),getCount()):(object="error",content=t,e.showMessage(object,content),getData(),getCount())},error:function(t,o,a){object="error",content="Erreur : "+o+", "+a,e.showMessage(object,content)}})}else t.preventDefault(),object="msg",content=e.network_msg,e.showMessage(object,content)})}),$(document).ready(function(){$("#search").on("input",function(){navigator.onLine?searchData($(this).val()):(content=e.network_msg,object="msg",$("#search").val(""),e.showMessage(object,content))})}),$(document).on("click","a[data-role=update]",function(){if(navigator.onLine){let t=$(this).data("id");if(""!=t.value){let o=$("#"+t).children("td[data-target=name]").text(),a=$("#"+t).children("td[data-target=description]").text(),n=$("#"+t).children("td[data-target=adress]").text();$("#idUp").val(t),$("#name").val(o),$("#description").val(a),$("#adress").val(n),showBtnUp(),e.btnNewClick()}}else content=e.network_msg,object="msg",e.showMessage(object,content)});let headerRow=document.querySelector(".titles");var lag=e.getCookie("langue")?e.getCookie("langue"):1;for(let i=0;i<headerRow.cells.length;i++)headerRow.cells[i].textContent=t.lang_bout_header[lag][i];$("form label").find("input, textarea").each(function(e){t.lang_bout_input[lag][e]&&$(this).attr("placeholder",t.lang_bout_input[lag][e])}),$("form label span").each(function(e){t.lang_bout_label[lag][e]&&$(this).text(t.lang_bout_label[lag][e])});