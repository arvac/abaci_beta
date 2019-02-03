var db;
var dbCreated = false;


document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady(){
 db = window.openDatabase("RegistrationDB", "1.0", "Registration", 200000);
 if (dbCreated)
  {
      // creado
  }
 
 else{
 db.transaction(getregistdata, transaction_error);
 }
}

function getregistdata(tx){
 
  var sql = "select username, password from Registration";
  tx.executeSql(sql, [], getlogin_success);
}

function transaction_error(tx, error) {
// alert("Database Error: " + error);
}

function getlogin_success(tx, results){
   var len = results.rows.length;
   for (var i=0; i< len; i++) {  
    var employee = results.rows.item(i);
    var username=document. getElementById("username").value;
    var password=document. getElementById("psw").value;
    var uname=employee.username;
    var pasw=employee.password;
   // alert(username);
   // alert(password);
    if(username==uname && password==pasw){
    // alert("Login Success");
     window.location = "principal.html";
     break;
    }
    else{
        var status=1;
     }
   }
   
   if(status==1)
    {
     //alert("error iniciar cuenta");
    }
}
