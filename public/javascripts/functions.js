/**
 * Created by zoosle on 13.01.17.
 */
window.onload=function(){

    function action(){
        //$("#resulttablediv").append('<p> klasse! <p>')
    }

}



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
};
