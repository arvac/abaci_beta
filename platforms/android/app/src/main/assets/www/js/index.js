$(document).ready(function(){
var hight = localStorage.getItem("hight");
$("#highScore").text(hight);

var myDB;
//abrir conexion database
document.addEventListener("deviceready",onDeviceReady,false);
 document.addEventListener("backbutton", onBackKeyDown, false);
  function onBackKeyDown() {
    window.location = "index.html";
    }
 


function onDeviceReady(){
myDB = window.sqlitePlugin.openDatabase({name: "mySQLite.db", location: 'default'});
$("#showTable").click();
}
//crear tabla
$("#createTable").click(function(){
    myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS phonegap_pro (id integer primary key, nombre text, title text, desc text)', [],
        function(tx, result) {


             alert("Cargando espere porfavor....");

             var boolee = localStorage.setItem('boolee',false);
             window.location="main.html";
        }, 
        function(error) {
              alert("Error .");
        });
    });
});

//Insertar data
$("#insert").click(function(){
  var nombre=$("#title").val();
  var title='0';  var desc ='0';
  console.log(title +""+ desc);
  myDB.transaction(function(transaction) {
        var executeQuery = "INSERT INTO phonegap_pro (nombre, title, desc) VALUES (?,?,?)";             
        transaction.executeSql(executeQuery, [nombre,title,desc]
            , function(tx, result) {
                 
                 $("#showTable").click();
                  //var jugar_boolean = localStorage.setItem('jugar_boolean',false);
                   
            },
            function(error){
                 alert('Error '); 
            });
    });
});

//mostrar Table Data
$("#showAdmin").click(function(){

  $("#TableData").html("");
  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM phonegap_pro', [], function (tx, results) {
       var len = results.rows.length, i;
       $("#rowCount").html(len);
       for (i = 0; i < len; i++){
          $("#TableData").append("<div class=' mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop'><div class='mdl-card__title mdl-card--expand mdl-color--teal-300 '><div class='chip'><img src='images/intro2.jpg' alt='Person' width='16' height='6'>"+results.rows.item(i).nombre+"</div>&nbsp;&nbsp;</div><div class='mdl-card__actions mdl-card--border'><a  class='delete'  id="+results.rows.item(i).id+">Eliminar</a></div></div>");
       }
    }, null);
  });
});

$("#showTable").click(function(){
 // alert('mosrtrar');
  $("#TableData").html("");
  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM phonegap_pro', [], function (tx, results) {
       var len = results.rows.length, i;
       $("#rowCount").html(len);
       for (i = 0; i < len; i++){
          $("#TableData").append("<div class=' mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop'><div class='mainsquare'><div class='item'>  <div class='menu-item'><h1 class='hvr-bob'><i class='fa fa-star'>&nbsp;&nbsp;&nbsp;&nbsp;<a  class='updat' onclick='relink();' data-transition='slide'  href='#perfil' id="+results.rows.item(i).id+">"+results.rows.item(i).nombre+"</a></i></h1></div></div>&nbsp;&nbsp;</div></div>");
       }
       //<div class=' mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop'><div class='mdl-card__title mdl-card--expand mdl-color--teal-300 '><div class='chip'><img src='images/intro2.jpg' alt='Person' width='16' height='6'>"+results.rows.item(i).nombre+"</div>&nbsp;&nbsp;<a  class='updat' onclick='relink();' data-transition='slide'  href='#perfil' id="+results.rows.item(i).id+">Jugar</a></div><div class='mdl-card__actions mdl-card--border'>Jugador</div></div>
      // <div class='demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop'><div class='mdl-card__title mdl-card--expand mdl-color--teal-300 '><div class='chip'><img src='images/intro2.jpg' alt='Person' width='16' height='6'>"+results.rows.item(i).title+"</div> <div id='clouds' ><div><img class='cloud x1' src='images/naverun.png'></div><div><img class='cloud x2' src='images/naverun.png'></div><div><img class='cloud x3' src='images/naverun.png'></div><div><img class='cloud x4' src='images/naverun.png'></div><div><img class='cloud x5' src='images/naverun.png'></div></div> </div><div class='mdl-card__actions mdl-card--border'><a class='updat'  href='#perfil' id="+results.rows.item(i).id+">Jugar</a></div></div>
    }, null);
  });
});

//mostrar Table Data
$("#showPuntajes").click(function(){
  $("#listas").html("");
  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM phonegap_pro', [], function (tx, results) {
       var len = results.rows.length, i;
       $("#rowCount").html(len);
       for (i = 0; i < len; i++){
          $("#listas").append("<div class='demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop'><div class='mdl-card__title mdl-card--expand mdl-color--teal-300 '><div class='chip'><img src='images/coin.png' alt='Person' width='96' height='96'>"+results.rows.item(i).nombre+"</div></div><div class='mdl-card__supporting-text mdl-color-text--grey-600'><span>Puntaje</span>&nbsp;&nbsp;<span  class='chip'>"+results.rows.item(i).desc+"</span><span>Nivel</span>&nbsp;&nbsp;<span  class='chip'>"+results.rows.item(i).title+"</span></div><div class='mdl-card__actions mdl-card--border'>"+results.rows.item(i).id+"</div></div>");
       }
    }, null);
  });
});

//eliminar Data from Database
$(document.body).on('click', '.updat' ,function(){
  id =this.id;
 $("#id").text(id);
    var ide = localStorage.setItem("ide",id);
 
});
//eliminar Data from Database
$(document.body).on('click', '.delete' ,function(){
  id =this.id;
 $("#id").text(id);
    var ide = localStorage.setItem("ide",id);
  myDB.transaction(function(transaction) {
    var executeQuery = "DELETE FROM phonegap_pro where id=?";
    transaction.executeSql(executeQuery, [id],
      //On Success
      function(tx, result) {alert('Eliminado correctamente');},
      //On Error
      function(error){alert('error algo paso');});
  });
});


//eliminar Tablesactualizar
$("#update").click(function(){
  var id=$("#id").text();
  var title=$("#title").val();
  var desc=$("#desc").val()
  myDB.transaction(function(transaction) {
    var executeQuery = "UPDATE phonegap_pro SET title=?, desc=? WHERE id=?";
    transaction.executeSql(executeQuery, [title,desc,id],
      //On Success
      function(tx, result) {//alert('actualizado');
      window.location.href = "indexx.html";
    },
      
      //On Error
      function(error){alert('algo paso');});
  });
});
//eliminar Tables

$("#updateFinal").click(function(){
  var id=$("#id").text();
  var title=$("#title").val();
  var desc=$("#desc").val()
  myDB.transaction(function(transaction) {
    var executeQuery = "UPDATE phonegap_pro SET title=?, desc=? WHERE id=?";
    transaction.executeSql(executeQuery, [title,desc,id],
      //On Success
      function(tx, result) {//alert('actualizado');
      window.location.href = "principal.html#aprender";
    },
      
      //On Error
      function(error){alert('algo paso');});
  });
});


});


