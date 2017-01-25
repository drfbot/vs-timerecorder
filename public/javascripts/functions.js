
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

function logout() {
    //DB interaktion Session stop.
}

function login(){
    //DB interaktion Session start + timestamp
}


//=======================================
// Charts
//=======================================

function somethingtoChartContainer() {
    $("#chart-container").insertFusionCharts({
        type: "column2d",
        width: "400",
        height: "350",
        dataFormat: "JSONURL",
        dataSource: "../data/data.json" //später dynamische JSON-Abfrage
    });
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
