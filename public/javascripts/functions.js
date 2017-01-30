//var Worker = require('../routes/mongooseSchema');
var btnclick =null;
window.onload=function(){

    function action(){
        //$("#resulttablediv").append('<p> klasse! <p>')
    }

};



//===========================
// Forms
//=============================
$("body").find(".btn").each(function(){
    $(this).bind('click', function(){
        $("input[name=view-opt-bt-group-value]").val(this.value);
    });
}); 

//=======================================
// REST interaction
//=======================================
function changeButton(){
    if(btnclick==null){
        btnclick=document.getElementById("stamp");
    }
    document.getElementById("stamp").innerHTML=" -- ";
    $("#stamp").removeClass("btn-success").addClass("btn-info");
}

function getCurrentStatus(name){
    Worker.findOne({username:name},function (err,res) {
       if (err) throw err;
        return res.loginstate;
    });
}

//=======================================
// Charts
//=======================================

function drawCharts() {
		console.log("DRAWING CHARTS.....")
		$.ajax({
        type: 'GET',
        url: 'http://localhost:3000/genstats'
    });
    var hourGroupChart = new FusionCharts({
        type: 'column3d',
        renderAt: 'chart-container',
        width: '600',
        height: '400',
        dataFormat: 'jsonurl',
        dataSource: 'hoursJsonfile.json'
    });
		
	hourGroupChart.render();
	
	    var illnessGroupChart = new FusionCharts({
        type: 'pie3d',
        renderAt: 'chart-container2',
        width: '600',
        height: '400',
        dataFormat: 'jsonurl',
        dataSource: 'illnessJsonfile.json'
    });
	
	illnessGroupChart.render();
}


//=======================================
// Frontend Designkrams
//=======================================


function date_time(id)
{
    date = new Date;
    year = date.getFullYear();
    month = date.getMonth();
    months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December');
    d = date.getDate();
    day = date.getDay();
    days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    h = date.getHours();
    if(h<10)
    {
        h = "0"+h;
    }
    m = date.getMinutes();
    if(m<10)
    {
        m = "0"+m;
    }
    s = date.getSeconds();
    if(s<10)
    {
        s = "0"+s;
    }
    result = ''+days[day]+' '+months[month]+' '+d+' '+year+' '+h+':'+m+':'+s;
    document.getElementById(id).innerHTML = result;
    setTimeout('date_time("'+id+'");','1000');
    return true;
}

/* FUNKTION ZUM AUSLESEN DER PARAMETER IN DER URL
*/
function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


//=======================================
// Frontend FileChooser
//=======================================

function pickApicture(evt){
var dateien = evt.target.files; // FileList objekt
 
    // erste Datei auswählen (wichtig, weil IMMER ein FileList Objekt generiert wird)
    var uploadDatei = dateien[0];
 
    // Ein Objekt um Dateien einzulesen
    var reader = new FileReader();
 
    var senddata = new Object();
    // Auslesen der Datei-Metadaten
    senddata.name = uploadDatei.name;
    senddata.date = uploadDatei.lastModified;
    senddata.size = uploadDatei.size;
    senddata.type = uploadDatei.type;
 
    // Wenn der Dateiinhalt ausgelesen wurde...
    reader.onload = function(theFileData) {
      senddata.fileData = theFileData.target.result; // Ergebnis vom FileReader auslesen
 
      /*
      Code für AJAX-Request hier einfügen
      */
    }
 
    // Die Datei einlesen und in eine Data-URL konvertieren
    reader.readAsDataURL(uploadDatei);
  }
  
  
  //=========================================
  // Frontend Time Display
  //=========================================
  
  function getReadableHours(data){
	date = new Date (data);
  var hours = date.getHours();
  var minutes = 0 + date.getMinutes();
	  minutes =  minutes/60
	  
	  return parseFloat(hours+minutes , 3);
  }
  
  function getReadableDate(data){
	var date = new Date(parseInt(data));
	console.log("DATUM:" + date)
    var year = date.getFullYear();
    var month = date.getMonth()+1;
	console.log("MONAT" + month)
    var day = date.getDate();
	console.log("TAG" + day)
    

    return (day + "." + month + "." + year);
	  
  }
  
  
  function changeButtonText(){
	  
	  if (document.getElementById("befUnbef").innerHTML === "unbefristet"){
	  document.getElementById("befUnbef").innerHTML = "befristet";}
	  else{
	  document.getElementById("befUnbef").innerHTML = "unbefristet";
	  document.getElementById("endDate").value = "0001-01-01"};
  }
  
  
  function changeDates(){
	 changeStartDate();
	 changeEndDate();
	 
	    
  }
  
  function changeEndDate(){
	  console.log("Ändere ENDE");
	  var unixtime = Date.parse(document.getElementById("endDate").value+" 00:00:00").getTime()/1000;
	  document.getElementById("endDate").value = unixtime;
  }
  
  function changeStartDate(){
	  console.log("Ändere Start");
	  var unixtime = Date.parse(document.getElementById("startDate").value+" 00:00:00").getTime()/1000;
	  document.getElementById("startDate").value = unixtime;
  }
  
  