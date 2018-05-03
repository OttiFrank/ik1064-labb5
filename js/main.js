/**
 * Created by willi on 2018-05-02.
 */
var LQ, Ls, Ws, Wq, P, Po;


var mychart = new Highcharts.chart('mychart', {
    title: {
        text: 'Queue Calculations'
    },
    subtitle: {
        text: 'Source: Computation on fictive data'
    },
    yAxis: {
        title: {
            text: 'Number of customers in queue'
        }
    },
    xAxis: {
        title: {
            text: 'Arrivalrates: number of customers per time unit'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    plotOptions: {
        series: {
            pointStart: 5,
            pointInterval: 5
        }
    },
    series: [{
        name: 'Average number of customers in queue',
        data: [3.1, 4.12, 4.35, 12, 11.12, 6.23, 6.123]
    }, {
        name: 'Average number of customers in the system',
        data: [4.1, 5.12, 5.35, 13, 12.12, 7.23, 7.123]
    }]
});

//        mychart.series[0].addPoint(14.2);
//        mychart.series[1].addPoint(16.2);

function addToChart() {
    mychart.series[0].addPoint(parseInt($('#arrival-rate').val()) + 1);
    mychart.series[1].addPoint(parseInt($('#service-rate').val()));
    customersInQue();
}
function customersInQue() {
    var ar = $('#arrival-rate').val();
    var sr = $('#service-rate').val();

    //Medel antal kunder i kön
    LQ = (Math.pow(ar, 2)/(sr*(sr-ar))).toFixed(2);
    console.log('LQ: '+LQ);

    //Medel antal kunder i system
    Ls = (ar/(sr-ar)).toFixed(2);
    console.log('LS: '+ Ls);

    //Väntetid i system
    Ws = (((1/(sr-ar))*60)*60).toFixed(2);
    var Ws_minutes = Math.floor(Ws / 60);
    var Ws_seconds = (Ws % 60).toFixed(0);
    if(Ws_seconds == 0 ) {
        Ws = Ws_minutes+"min";
    } else {
        Ws = Ws_minutes + "min "+Ws_seconds+"sek";
    }


    //Väntetid i kön
    Wq = (((ar/(sr*(sr-ar)))*60)*60).toFixed(2);
    var Wq_minutes = Math.floor(Wq / 60);
    var Wq_seconds = (Wq % 60).toFixed(0);
    if(Wq_seconds == 0) {
        Wq = Wq_minutes+"min";
    } else {
        Wq = Wq_minutes + "min "+ Wq_seconds+"sek";
    }
    //Upptagen att betjäna
    P = ((ar/sr)*100);
    if(P % 1 == 0) {
        P.toFixed(0);
    } else {
        P.toFixed(2);
    }
    console.log('P: '+ P+"%");

    //Chans att kön är tom
    Po = ((1-(ar/sr))*100);
    if(Po % 1 == 0) {
        Po.toFixed(0)
    } else {
        Po.toFixed(2);
    }
    console.log('Po: '+ Po+"%");

    var table_data = $('#table-data');
    table_data.empty();
    var html = '<td>'+LQ+'st</td>';
    html += '<td>'+Ls+'st</td>';
    html += '<td>'+Ws+'</td>';
    html += '<td>'+Wq+'</td>';
    html += '<td>'+P+'%</td>';
    html += '<td>'+Po+'%</td>';
    table_data.append(html);
}

function saveToCSV() {

    var ar = $('#arrival-rate').val();
    var sr = $('#service-rate').val();
    $.ajax({
        type: 'POST',
        url: './php/route.php',
        data: {'controller' : 'Controller', 'function' : 'saveToCSV',
            'ar' : ar, 'sr' : sr, 'LQ': LQ, 'Ls': Ls, 'Ws' : Ws, 'Wq' : Wq, 'P' : P, 'Po' : Po},
        dataType: 'json',
        success: function(data) {
            console.log(data);
        },
        error: function(data) {
            console.log('ERROR: '+ JSON.stringify(data));
        }
    })
}
