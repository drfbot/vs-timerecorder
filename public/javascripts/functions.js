/**
 * Created by zoosle on 13.01.17.
 */




window.onload=function(){

    function action(){
        //$("#resulttablediv").append('<p> klasse! <p>')
    }

};



//=======================================
// Graphs
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
