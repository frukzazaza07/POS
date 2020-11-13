var firstDate, endDate;
var template, mainTopic, choiceMonthFirst, choiceMonthEnd, yearFirst, yearEnd;
var mainTopic = document.querySelector("#mainTopic");
var leftContent = document.querySelector("#leftContent");
var rightContent = document.querySelector("#rightContent");
var test = document.querySelector("#test");
var checkRadioChoice = false;
var searchReport = document.querySelector("#searchReport");
var monthChoice = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
var radioDateChoice = document.querySelectorAll("#radioDateChoice");
//var radioDateChoice = document.querySelectorAll('input[name="exampleRadios"]');
var checkTemplate = false;
var overText = true;
var valid = true;
var empty = false;
/*if (checkTemplate == true) {
    test.addEventListener("click", function() {
        alert("test");
    });
}*/

/*async function search() {
    await createTemplateCustom();
    await createTemplateMonth()();
    await createTemplateYear();
    searchReport.addEventListener("click", function() {
        alert("test");
    });
}*/

function checkValid(choice) {
    let errorFirst = document.querySelector("#errorFirst");
    let errorEnd = document.querySelector("#errorEnd");


    //errorFirst.style.color = "red";
    //errorEnd.style.color = "red";


    if (choice == 2) {
        /* let choiceMonthFirstInt = parseInt(choiceMonthFirst.value);
        let choiceMonthEndInt = parseInt(choiceMonthEnd.value);
        if (choiceMonthFirstInt > choiceMonthEndInt) {
            errorFirst.innerHTML = "ข้อมูลในการค้นหาไม่ถูกต้อง";
            errorEnd.innerHTML = "ข้อมูลในการค้นหาไม่ถูกต้อง";
            valid = false;
            // console.log(valid);
            // console.log(choiceMonthFirstInt + ">");
            // console.log(choiceMonthEndInt);
        } else if (choiceMonthFirstInt <= choiceMonthEndInt) {
            // console.log(choiceMonthFirstInt + "<=");
            //console.log(choiceMonthEndInt);
            errorFirst.innerHTML = "";
            errorEnd.innerHTML = "";
            valid = true;

            // console.log(valid);
        }*/
    } else if (choice == 3) {
        /* let yearFirstInt = parseInt(yearFirst.value);
        let yearEndInt = parseInt(yearEnd.value);
         if (yearFirstInt > yearEndInt) {

             errorFirst.innerHTML = "ข้อมูลในการค้นหาไม่ถูกต้อง";
             errorEnd.innerHTML = "ข้อมูลในการค้นหาไม่ถูกต้อง";
             valid = false;
         } else if (yearFirstInt <= yearEndInt) {
             errorFirst.innerHTML = "";
             errorEnd.innerHTML = "";
             valid = true;
         }*/


    }
}

/*function finishCheck(choice) {
    let errorFirst = document.querySelector("#errorFirst");
    let errorEnd = document.querySelector("#errorEnd");
    if (choice == 1) {
        if (firstDate.value != "" && endDate.value != "") {
            errorFirst.innerHTML = "";
            errorEnd.innerHTML = "";
            return valid = true;
        }
    } else if (choice == 2) {
        if (choiceMonthFirst.value < choiceMonthEnd.value && choiceMonthFirst.value != "" && choiceMonthEnd.value != "") {
            console.log(choiceMonthEnd.value);
            errorFirst.innerHTML = "";
            errorEnd.innerHTML = "";
            return valid = true;
        }
    } else if (choice == 3) {
        if (yearFirst.value < yearEnd.value && yearFirst.value != "" && yearEnd.value != "") {
            errorFirst.innerHTML = "";
            errorEnd.innerHTML = "";
            return valid = true;
        }


    }

}*/

function checkEmpty(choice) {
    let errorFirst = document.querySelector("#errorFirst");
    let errorEnd = document.querySelector("#errorEnd");
    //errorFirst.style.color = "red";
    //errorEnd.style.color = "red";
    //console.log(choice);
    if (choice == 1) {
        if (firstDate.value == "") {
            errorFirst.innerHTML = "ระบุวันเริ่มต้น";
            empty = false;
        }

        if (endDate.value == "") {
            errorEnd.innerHTML = "ระบุวันสิ้นสุด";
            empty = false;
        }
    } else if (choice == 2) {
        if (choiceMonthFirst.value == "") {
            errorFirst.innerHTML = "ระบุเดือนเริ่มต้น";
            empty = false;
        }

        if (yearFirst.value == "") {
            errorEnd.innerHTML = "ระบุปี";
            empty = false;
        }
    } else {
        if (yearFirst.value == "") {
            errorFirst.innerHTML = "ระบุปีเริ่มต้น";
            empty = false;
        }


    }

    if (choice == 1) {
        if (firstDate.value != "") {
            errorFirst.innerHTML = "";

        }

        if (endDate.value != "") {
            errorEnd.innerHTML = "";
        }
        if (firstDate.value != "" && endDate.value != "") {
            empty = true;
        }
    } else if (choice == 2) {
        if (choiceMonthFirst.value != "") {
            errorFirst.innerHTML = "";
        }

        if (yearFirst.value != "") {
            errorEnd.innerHTML = "";

        }
        if (choiceMonthFirst.value != "") {
            empty = true;
        }
    } else {
        if (yearFirst.value != "") {
            errorFirst.innerHTML = "";

        }

        if (yearFirst.value != "") {
            empty = true;
        }
    }
}

function search(choice) {
    checkEmpty(choice);

    let loading = document.querySelector("#loading");
    //checkValid(choice);
    if (empty == true) {
        //console.log("test");
        //console.log(empty);
        checkValid(choice);
        if (valid == true) {
            //console.log("final");
            var xmlhttp = new XMLHttpRequest();
            let parameter;

            if (choice == 1) {
                let firstData, endData;
                let errorFirst = document.querySelector("#errorFirst");
                let errorEnd = document.querySelector("#errorEnd");
                firstData = firstDate.value;
                endData = endDate.value;
                /*console.log(firstData);
                console.log(endData);*/

                console.log(checkOverText(firstData, endData));
                if (overText == false) {
                    errorFirst.innerHTML = "โปรดระบุวันที่ให้ถูกต้อง";
                    errorEnd.innerHTML = "โปรดระบุวันที่ให้ถูกต้อง";
                } else {
                    errorFirst.innerHTML = "";
                    errorEnd.innerHTML = "";
                    $.ajax({
                        url: "php/report.php",
                        type: "POST",
                        data: {
                            fDate: firstData,
                            eDate: endData,
                            type: "day"
                        },
                        cache: false,
                        beforeSend: function(data) {
                            loading.innerHTML = "Loading...";
                            //console.log(firstDate);

                        },
                        success: function(dataResult) {
                            //var data = JSON.parse(dataResult);
                            setTimeout(function() {
                                loading.innerHTML = "";
                                showDataOfDay(dataResult);
                                //console.log(dataResult);
                            }, 1000);
                        }
                    });
                }
            } else if (choice == 2) {
                firstDate = choiceMonthFirst.value;
                yearData = yearFirst.value;
                $.ajax({
                    url: "php/report.php",
                    type: "POST",
                    data: {
                        fDate: firstDate,
                        yearData: yearData,
                        type: "month"
                    },
                    cache: false,
                    beforeSend: function(data) {
                        loading.innerHTML = "Loading...";
                        console.log(firstDate);

                    },
                    success: function(dataResult) {
                        //var data = JSON.parse(dataResult);
                        setTimeout(function() {
                            loading.innerHTML = "";
                            showDataOfMonth(dataResult)
                            showGraphMonth(dataResult)
                                //console.log(data);
                        }, 1000);
                    }
                });
            } else {
                firstDate = parseInt(yearFirst.value);
                /*endDate = parseInt(yearEnd.value);*/
                $.ajax({
                    url: "php/report.php",
                    type: "POST",
                    data: {
                        fDate: firstDate,
                        type: "year"
                    },
                    cache: false,
                    beforeSend: function(data) {
                        loading.innerHTML = "Loading...";

                    },
                    success: function(dataResult) {
                        // var data = JSON.parse(dataResult);
                        setTimeout(function() {
                            loading.innerHTML = "";
                            showDataOfYear(dataResult);
                            showGraphYear(dataResult);
                        }, 1000);
                    }
                });
            }
        }
    }

    //checkValid(choice);
    // finishCheck(choice);

    /* if (valid == true) {
         alert("เงื่อนไขถูก");
     }*/
}

function showGraphMonth(dataResult) {

    var data = JSON.parse(dataResult);
    if (data["statusCode" == 201]) {

    } else {
        var date = [];
        var sales = [];
        let NO = 0;
        let color1 = 0;
        let color2 = 0;
        let color3 = 0;
        let arrcolor1 = [];
        let arrcolor2 = [];
        let arrcolor3 = [];
        //color = color.toString();
        //console.log(color);
        for (let i = 0; i < data['dayDetail'].length; i++) {
            NO = i + 1;
            color1 = Math.floor(Math.random() * 256);
            color2 = Math.floor(Math.random() * 256);
            color3 = Math.floor(Math.random() * 256);
            // month.push(monthChoice[i]);
            sales.push(data['netPrice']["day" + NO]);
            date.push(data['dayDetail'][i]);
            arrcolor1.push(color1);
            arrcolor2.push(color2);
            arrcolor3.push(color3);
        }
        var chartdata = {
            labels: date,
            datasets: [{
                label: 'ยอดขายสุทธิ',
                backgroundColor: [
                    'rgba(' + arrcolor1[0] + ',' + arrcolor2[0] + ',' + arrcolor3[0] + ', 0.2)', //red
                    'rgba(' + arrcolor1[1] + ',' + arrcolor2[1] + ',' + arrcolor3[1] + ', 0.2)', //red
                    'rgba(' + arrcolor1[2] + ',' + arrcolor2[2] + ',' + arrcolor3[2] + ', 0.2)', //red
                    'rgba(' + arrcolor1[3] + ',' + arrcolor2[3] + ',' + arrcolor3[3] + ', 0.2)', //red
                    'rgba(' + arrcolor1[4] + ',' + arrcolor2[4] + ',' + arrcolor3[4] + ', 0.2)', //red
                    'rgba(' + arrcolor1[5] + ',' + arrcolor2[5] + ',' + arrcolor3[5] + ', 0.2)', //red
                    'rgba(' + arrcolor1[6] + ',' + arrcolor2[6] + ',' + arrcolor3[6] + ', 0.2)', //red
                    'rgba(' + arrcolor1[7] + ',' + arrcolor2[7] + ',' + arrcolor3[7] + ', 0.2)', //red
                    'rgba(' + arrcolor1[8] + ',' + arrcolor2[8] + ',' + arrcolor3[8] + ', 0.2)', //red
                    'rgba(' + arrcolor1[9] + ',' + arrcolor2[9] + ',' + arrcolor3[9] + ', 0.2)', //red
                    'rgba(' + arrcolor1[10] + ',' + arrcolor2[10] + ',' + arrcolor3[10] + ', 0.2)', //red
                    'rgba(' + arrcolor1[11] + ',' + arrcolor2[11] + ',' + arrcolor3[11] + ', 0.2)', //red
                    'rgba(' + arrcolor1[12] + ',' + arrcolor2[12] + ',' + arrcolor3[12] + ', 0.2)', //red
                    'rgba(' + arrcolor1[13] + ',' + arrcolor2[13] + ',' + arrcolor3[13] + ', 0.2)', //red
                    'rgba(' + arrcolor1[14] + ',' + arrcolor2[14] + ',' + arrcolor3[14] + ', 0.2)', //red
                    'rgba(' + arrcolor1[15] + ',' + arrcolor2[15] + ',' + arrcolor3[15] + ', 0.2)', //red
                    'rgba(' + arrcolor1[16] + ',' + arrcolor2[16] + ',' + arrcolor3[16] + ', 0.2)', //red
                    'rgba(' + arrcolor1[17] + ',' + arrcolor2[17] + ',' + arrcolor3[17] + ', 0.2)', //red
                    'rgba(' + arrcolor1[18] + ',' + arrcolor2[18] + ',' + arrcolor3[18] + ', 0.2)', //red
                    'rgba(' + arrcolor1[19] + ',' + arrcolor2[19] + ',' + arrcolor3[19] + ', 0.2)', //red
                    'rgba(' + arrcolor1[20] + ',' + arrcolor2[20] + ',' + arrcolor3[20] + ', 0.2)', //red
                    'rgba(' + arrcolor1[21] + ',' + arrcolor2[21] + ',' + arrcolor3[21] + ', 0.2)', //red
                    'rgba(' + arrcolor1[22] + ',' + arrcolor2[22] + ',' + arrcolor3[22] + ', 0.2)', //red
                    'rgba(' + arrcolor1[23] + ',' + arrcolor2[23] + ',' + arrcolor3[23] + ', 0.2)', //red
                    'rgba(' + arrcolor1[24] + ',' + arrcolor2[24] + ',' + arrcolor3[24] + ', 0.2)', //red
                    'rgba(' + arrcolor1[25] + ',' + arrcolor2[25] + ',' + arrcolor3[25] + ', 0.2)', //red
                    'rgba(' + arrcolor1[26] + ',' + arrcolor2[26] + ',' + arrcolor3[26] + ', 0.2)', //red
                    'rgba(' + arrcolor1[27] + ',' + arrcolor2[27] + ',' + arrcolor3[27] + ', 0.2)', //red
                    'rgba(' + arrcolor1[28] + ',' + arrcolor2[28] + ',' + arrcolor3[28] + ', 0.2)', //red
                    'rgba(' + arrcolor1[29] + ',' + arrcolor2[29] + ',' + arrcolor3[29] + ', 0.2)', //red
                    'rgba(' + arrcolor1[30] + ',' + arrcolor2[30] + ',' + arrcolor3[30] + ', 0.2)' //red
                ],
                borderColor: [
                    'rgba(' + arrcolor1[0] + ',' + arrcolor2[0] + ',' + arrcolor3[0] + ', 1)', //red
                    'rgba(' + arrcolor1[1] + ',' + arrcolor2[1] + ',' + arrcolor3[1] + ', 1)', //red
                    'rgba(' + arrcolor1[2] + ',' + arrcolor2[2] + ',' + arrcolor3[2] + ', 1)', //red
                    'rgba(' + arrcolor1[3] + ',' + arrcolor2[3] + ',' + arrcolor3[3] + ', 1)', //red
                    'rgba(' + arrcolor1[4] + ',' + arrcolor2[4] + ',' + arrcolor3[4] + ', 1)', //red
                    'rgba(' + arrcolor1[5] + ',' + arrcolor2[5] + ',' + arrcolor3[5] + ', 1)', //red
                    'rgba(' + arrcolor1[6] + ',' + arrcolor2[6] + ',' + arrcolor3[6] + ', 1)', //red
                    'rgba(' + arrcolor1[7] + ',' + arrcolor2[7] + ',' + arrcolor3[7] + ', 1)', //red
                    'rgba(' + arrcolor1[8] + ',' + arrcolor2[8] + ',' + arrcolor3[8] + ', 1)', //red
                    'rgba(' + arrcolor1[9] + ',' + arrcolor2[9] + ',' + arrcolor3[9] + ', 1)', //red
                    'rgba(' + arrcolor1[10] + ',' + arrcolor2[10] + ',' + arrcolor3[10] + ', 1)', //red
                    'rgba(' + arrcolor1[11] + ',' + arrcolor2[11] + ',' + arrcolor3[11] + ', 1)', //red
                    'rgba(' + arrcolor1[12] + ',' + arrcolor2[12] + ',' + arrcolor3[12] + ', 1)', //red
                    'rgba(' + arrcolor1[13] + ',' + arrcolor2[13] + ',' + arrcolor3[13] + ', 1)', //red
                    'rgba(' + arrcolor1[14] + ',' + arrcolor2[14] + ',' + arrcolor3[14] + ', 1)', //red
                    'rgba(' + arrcolor1[15] + ',' + arrcolor2[15] + ',' + arrcolor3[15] + ', 1)', //red
                    'rgba(' + arrcolor1[16] + ',' + arrcolor2[16] + ',' + arrcolor3[16] + ', 1)', //red
                    'rgba(' + arrcolor1[17] + ',' + arrcolor2[17] + ',' + arrcolor3[17] + ', 1)', //red
                    'rgba(' + arrcolor1[18] + ',' + arrcolor2[18] + ',' + arrcolor3[18] + ', 1)', //red
                    'rgba(' + arrcolor1[19] + ',' + arrcolor2[19] + ',' + arrcolor3[19] + ', 1)', //red
                    'rgba(' + arrcolor1[20] + ',' + arrcolor2[20] + ',' + arrcolor3[20] + ', 1)', //red
                    'rgba(' + arrcolor1[21] + ',' + arrcolor2[21] + ',' + arrcolor3[21] + ', 1)', //red
                    'rgba(' + arrcolor1[22] + ',' + arrcolor2[22] + ',' + arrcolor3[22] + ', 1)', //red
                    'rgba(' + arrcolor1[23] + ',' + arrcolor2[23] + ',' + arrcolor3[23] + ', 1)', //red
                    'rgba(' + arrcolor1[24] + ',' + arrcolor2[24] + ',' + arrcolor3[24] + ', 1)', //red
                    'rgba(' + arrcolor1[25] + ',' + arrcolor2[25] + ',' + arrcolor3[25] + ', 1)', //red
                    'rgba(' + arrcolor1[26] + ',' + arrcolor2[26] + ',' + arrcolor3[26] + ', 1)', //red
                    'rgba(' + arrcolor1[27] + ',' + arrcolor2[27] + ',' + arrcolor3[27] + ', 1)', //red
                    'rgba(' + arrcolor1[28] + ',' + arrcolor2[28] + ',' + arrcolor3[28] + ', 1)', //red
                    'rgba(' + arrcolor1[29] + ',' + arrcolor2[29] + ',' + arrcolor3[29] + ', 1)', //red
                    'rgba(' + arrcolor1[30] + ',' + arrcolor2[30] + ',' + arrcolor3[30] + ', 1)' //red
                ],
                borderWidth: 1,
                //backgroundColor: (0,0,0,0.1),
                //animationEnabled: true,
                // exportEnabled: true,
                // theme: "dark1", // "light1", "light2", "dark1", "dark2"
                // borderColor: '#46d5f1',
                // hoverBackgroundColor: '#CCCCCC',
                // hoverBorderColor: '#666666',
                data: sales
            }]
        };

        var graphTarget = $("#graphCanvas");
        var pieTarget = $("#graphCanvasPie");
        var barGraph = new Chart(graphTarget, {
            type: 'bar',
            data: chartdata,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
}

function showGraphYear(dataResult) {

    var data = JSON.parse(dataResult);
    console.log(data);
    if (data["statusCode" === 200]) {
        var month = [];
        var sales = [];
        let NO = 0;

        for (let i = 0; i < monthChoice.length; i++) {
            NO = i + 1;
            // month.push(monthChoice[i]);
            sales.push(data['netPrice']["month" + NO]);

        }

        var chartdata = {
            labels: monthChoice,
            datasets: [{
                label: 'ยอดขายสุทธิ',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)', //red
                    'rgba(54, 162, 235, 0.2)', //blue
                    'rgba(255, 206, 86, 0.2)', //yellow
                    'rgba(75, 192, 192, 0.2)', //green
                    'rgba(153, 102, 255, 0.2)', //purple
                    'rgba(255, 159, 64, 0.2)', //orange
                    'rgba(255, 99, 132, 0.2)', //red
                    'rgba(54, 162, 235, 0.2)', //blue
                    'rgba(255, 206, 86, 0.2)', //yellow
                    'rgba(75, 192, 192, 0.2)', //green
                    'rgba(153, 102, 255, 0.2)', //purple
                    'rgba(500, 102, 255, 0.2)',
                    'rgba(30, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(500, 102, 255, 1)',
                    'rgba(200, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,


                //backgroundColor: (0,0,0,0.1),
                //animationEnabled: true,
                // exportEnabled: true,
                // theme: "dark1", // "light1", "light2", "dark1", "dark2"
                // borderColor: '#46d5f1',
                // hoverBackgroundColor: '#CCCCCC',
                // hoverBorderColor: '#666666',
                data: sales
            }]
        };

        var graphTarget = $("#graphCanvas");
        var pieTarget = $("#graphCanvasPie");
        var barGraph = new Chart(graphTarget, {
            type: 'bar',
            data: chartdata,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    } else {

    }

}


function showDataOfDay(dataResult) {
    $("tbody").remove();
    $(".table").append("<tbody></tbody>");
    document.querySelector("#choiceData").innerHTML = "เลขที่บิล";
    let info = document.querySelector(".info");
    var data = JSON.parse(dataResult);
    console.log(data);
    if (data["statusCode"] === 200) {
        info.innerHTML = "";
        let NO = 0;
        let beforeTotal = 0;
        let discount = 0;
        let netPrice = 0;
        let showDiscount = 0;
        let showNetPrice = 0;
        for (i = 0; i < data['data'].length; i++) {
            NO = i + 1;

            if (data['data'][i][5] > 0) {
                discount += parseInt(data['data'][i][5]);
                showDiscount = parseInt(data['data'][i][5]);
            } else if (data['data'][i][6] > 0) {
                discount += (parseInt(data['data'][i][2]) - parseInt(data['data'][i][7]));
                showDiscount = (parseInt(data['data'][i][2]) - parseInt(data['data'][i][7]))
            }

            if (data['data'][i][5] > 0 || data['data'][i][6] > 0) {
                netPrice += parseInt(data['data'][i][7]);
            } else {
                netPrice += parseInt(data['data'][i][2]);
            }
            showNetPrice = parseInt(data['data'][i][2]) - showDiscount;

            let templateTable = " <tr><th style='text-align:center'>" + NO + "</th><td style='text-align:center'><a href='#'  onclick='billDetail(this.text)'>" + data['data'][i][0] + "</a></td><td style='text-align:right;'> " + data['data'][i][2] + " </td><td style='text-align:right;' class='text-danger'>" + showDiscount + "</td><td style='text-align:right;'> " + showNetPrice + " </td></tr> ";
            $("tbody").append(templateTable);
            beforeTotal += parseInt(data['data'][i][2]);
            showDiscount = 0;
            showNetPrice = 0;
        }
        let templateTable = " <tr><th style='text-align:center'></th><td style='text-align:center'><b>รวมทั้งสิ้น</b></td><td style='text-align:right;'><u>" + beforeTotal + " </u></td><td style='text-align:right;' class='text-danger'><u>" + discount + "</u></td><td style='text-align:right;'><u><u>" + netPrice + "</u></u></td></tr> ";
        $("tbody").append(templateTable);
    } else {


    }
}
//2020-08-18
function checkOverText(txt1, txt2) {
    let newTxt1, newTxt2;
    newTxt1 = txt1.substr(0, 4);
    newTxt1 = newTxt1 + txt1.substr(5, 2);
    newTxt1 = newTxt1 + txt1.substr(8, 2);
    newTxt2 = txt2.substr(0, 4);
    newTxt2 = newTxt2 + txt2.substr(5, 2);
    newTxt2 = newTxt2 + txt2.substr(8, 2);
    newTxt1 = parseInt(newTxt1);
    newTxt2 = parseInt(newTxt2);
    if (newTxt1 > newTxt2) {
        // console.log(newTxt1 + ">" + newTxt2);
        return overText = false;
    } else {
        //console.log(newTxt1 + "<=" + newTxt2);
        return overText = true;
    }
}

function showDataOfMonth(dataResult) {
    $("tbody").remove();
    $(".table").append("<tbody></tbody>");
    let info = document.querySelector(".info");
    var data = JSON.parse(dataResult);
    console.log(data);
    if (data["statusCode"] == 201) {
        info.innerHTML = "ไม่พบข้อมูลยอดขาย... โปรดตรวจสอบความถูกต้อง!!!"
    } else {
        info.innerHTML = "";
        let NO = 0;
        let beforeTotal = 0;
        let discount = 0;
        let netPrice = 0;
        for (i = 0; i < data['dayDetail'].length; i++) {
            NO = i + 1;
            let templateTable = " <tr><th style='text-align:center'>" + NO + "</th><td style='text-align:center'>" + data['dayDetail'][NO - 1] + "</td><td style='text-align:right;'> " + data['beforNet']["day" + NO] + " </td><td style='text-align:right;' class='text-danger'>" + data['discount']["day" + NO] + "</td><td style='text-align:right;'> " + data['netPrice']["day" + NO] + " </td></tr> ";
            $("tbody").append(templateTable);
            netPrice += parseInt(data['netPrice']["day" + NO]);
            discount += parseInt(data['discount']["day" + NO]);
            beforeTotal += parseInt(data['beforNet']["day" + NO]);
        }
        let templateTable = " <tr><th style='text-align:center'></th><td style='text-align:center'><b>รวมทั้งสิ้น</b></td><td style='text-align:right;'><u>" + beforeTotal + " </u></td><td style='text-align:right;' class='text-danger'><u>" + discount + "</u></td><td style='text-align:right;'><u><u>" + netPrice + "</u></u></td></tr> ";
        $("tbody").append(templateTable);
    }
}

function showDataOfYear(dataResult) {
    $("tbody").remove();
    $(".table").append("<tbody></tbody>");
    let info = document.querySelector(".info");
    var data = JSON.parse(dataResult);
    console.log(data);
    if (data["statusCode"] == 201) {

        info.innerHTML = "ไม่พบข้อมูลยอดขาย... โปรดตรวจสอบความถูกต้อง!!!"
    } else {
        info.innerHTML = "";
        let NO = 0;
        let beforeTotal = 0;
        let discount = 0;
        let netPrice = 0;
        for (i = 0; i < monthChoice.length; i++) {
            NO = i + 1;
            let templateTable = " <tr><th style='text-align:center'>" + NO + "</th><td style='text-align:center'>" + monthChoice[i] + "</td><td style='text-align:right;'> " + data['beforNet']["month" + NO] + " </td><td style='text-align:right;' class='text-danger'>" + data['discount']["month" + NO] + "</td><td style='text-align:right;'> " + data['netPrice']["month" + NO] + " </td></tr> ";
            $("tbody").append(templateTable);
            netPrice += data['netPrice']["month" + NO];
            discount += data['discount']["month" + NO];
            beforeTotal += data['beforNet']["month" + NO];
        }
        let templateTable = " <tr><th style='text-align:center'></th><td style='text-align:center'><b>รวมทั้งสิ้น</b></td><td style='text-align:right;'><u>" + beforeTotal + " </u></td><td style='text-align:right;' class='text-danger'><u>" + discount + "</u></td><td style='text-align:right;'><u><u>" + netPrice + "</u></u></td></tr> ";
        $("tbody").append(templateTable);
    }
}

function billDetail(billId) {
    console.log(billId);
    //alert(getInput);
    localStorage.setItem("billId", billId);
    //location.href = "bill.html";
    window.open("bill.html");
}

function ChoiceYear(minYear, maxYear, id1, id2) {
    if (minYear >= maxYear) {
        return alert("minYear >= maxYear");
    } else {
        /*  for (let i = minYear; i < maxYear; i++) {
              var elem = document.createElement("OPTION");
              elem.innerHTML = i;
              elem.value = i;
              $("#" + id1).append(elem);
              $("#" + id2).append(elem); //ไม่เข้าใจเพิ่ม 2 อันไม่ได้
              //document.getElementById(id1).appendChild(elem);
              // document.getElementById(id2).appendChild(elem);
          }*/
        for (let i = minYear; i < maxYear; i++) {
            var elem = document.createElement("OPTION");
            elem.innerHTML = i;
            elem.value = i;
            $("#" + id1).append(elem);
            //document.getElementById(id1).appendChild(elem);
            // document.getElementById(id2).appendChild(elem);
        }
    }
}

function ChoiceMonth(data, id1, id2) {
    console.log(id1);
    console.log(id2);

    for (let i = 2010; i < 2100; i++) {
        var elem = document.createElement("OPTION");
        elem.innerHTML = i;
        elem.value = i;
        $("#" + id2).append(elem);
        //document.getElementById(id1).appendChild(elem);
        // document.getElementById(id2).appendChild(elem);
    }
    for (let i = 0; i < data.length; i++) {
        var elem = document.createElement("OPTION");
        elem.innerHTML = data[i];
        let valueInt = i + 1;
        if (valueInt < 10) {
            elem.value = "0" + valueInt;
        } else {
            elem.value = valueInt;
        }
        // console.log(elem.value);
        //$("#" + id1).append(elem);
        $("#" + id1).append(elem); //ไม่เข้าใจเพิ่ม 2 อันไม่ได้
        //document.getElementById(id1).appendChild(elem);
        // document.getElementById(id2).appendChild(elem);
    }
    /*for (let i = 0; i < data.length; i++) {
        var elem = document.createElement("OPTION");
        elem.innerHTML = data[i];
        elem.value = i + 1;
        $("#" + id1).append(elem);

        //document.getElementById(id1).appendChild(elem);
        // document.getElementById(id2).appendChild(elem);
    }*/
}

function createTemplateCustom() {
    let template = " <div class='main-right-content' id='rightContent'>\
    <h6><b>เลือกวันที่ต้องการค้นหา</b></h6>\
        <div class='form-group'>\
            <label for='exampleInputEmail1'>วันเริ่มต้น</label>\
            <input type='date' class='form-control' id='firstDate' aria-describedby='emailHelp' placeholder=''>\
            <small id='errorFirst' class='form-text text-danger'></small>\
        </div>\
        <div class='form-group'>\
            <label for='exampleInputPassword1'>วันสิ้นสุด</label>\
            <input type='date' class='form-control' id='endDate' placeholder=''>\
            <small id='errorEnd' class='form-text text-danger'></small>\
        </div>\
        <button  class='btn btn-primary btn-lg btn-block' onclick='search(1)' id='searchReport'>ค้นหา</button>\
        <p class='form-text text-danger' id='loading'></p>\
    </div>";
    $(".main-content-head").append(template);

    let templateHeadTable = "<tr>\
    <th scope='col' style='text-align:center'>ลำดับ</th>\
    <th scope='col' style='text-align:center' id='choiceData'>เลขที่บิล</th>\
    <th scope='col' style='text-align:right'>ยอดขายก่อนหักส่วนลด</th>\
    <th scope='col' style='text-align:right'>ส่วนลด</th>\
    <th scope='col' style='text-align:right'>ยอดสุทธิ</th>\
</tr>";
    $("thead").append(templateHeadTable);
}

function createTemplateMonth() {
    let templateHeadTable = "<tr>\
    <th scope='col' style='text-align:center'>ลำดับ</th>\
    <th scope='col' style='text-align:center' id='choiceData'>วันที่</th>\
    <th scope='col' style='text-align:right'>ยอดขายก่อนหักส่วนลด</th>\
    <th scope='col' style='text-align:right'>ส่วนลด</th>\
    <th scope='col' style='text-align:right'>ยอดสุทธิ</th>\
</tr>";
    $("thead").append(templateHeadTable);
    let template = " <div class='main-right-content' id='rightContent'>\
    <h6><b>เลือกเดือนที่ต้องการค้นหา</b></h6>\
    <div class='form-group'>\
            <label for='exampleInputEmail1'>ระบุปี(พ.ศ.)</label>\
            <select class='form-control' id='yearFirst'>\
            <option value=''>ปีเริ่มต้น</option>\
            </select>\
            <small id='errorEnd' class='form-text text-danger'></small>\
        </div>\
        <div class='form-group'>\
            <label for='exampleInputEmail1'>เดือนเริ่มต้น</label>\
            <select class='form-control' id='choiceMonthFirst'>\
            <option value=''>เดือนเริ่มต้น</option>\
            </select>\
            <small id='errorFirst' class='form-text text-danger'></small>\
        </div>\
        <button  class='btn btn-primary btn-lg btn-block' onclick='search(2)' id='searchReport'>ค้นหา</button>\
        <p class='form-text text-danger' id='loading'></p>\
    </div>";
    $(".main-content-head").append(template);
    ChoiceMonth(monthChoice, "choiceMonthFirst", "yearFirst");
}

function createTemplateYear() {
    let templateHeadTable = "<tr>\
    <th scope='col' style='text-align:center'>ลำดับ</th>\
    <th scope='col' style='text-align:center' id='choiceData'>เดือน</th>\
    <th scope='col' style='text-align:right'>ยอดขายก่อนหักส่วนลด</th>\
    <th scope='col' style='text-align:right'>ส่วนลด</th>\
    <th scope='col' style='text-align:right'>ยอดสุทธิ</th>\
</tr>";
    $("thead").append(templateHeadTable);
    let template = " <div class='main-right-content' id='rightContent'>\
    <h6><b>เลือกปีที่ต้องการค้นหา</b></h6>\
        <div class='form-group'>\
            <label for='exampleInputEmail1'>ระบุปี(พ.ศ.)</label>\
            <select class='form-control' id='yearFirst'>\
            <option value=''>ปีเริ่มต้น</option>\
            </select>\
            <small id='errorFirst' class='form-text text-danger'></small>\
        </div>\
        <button  class='btn btn-primary btn-lg btn-block' onclick='search(3)' id='searchReport'>ค้นหา</button>\
        <p class='form-text text-danger' id='loading'></p>\
    </div>";
    $(".main-content-head").append(template);
    ChoiceYear(2010, 2100, "yearFirst", "yearEnd");

}

function radioCheck(value) {
    if (checkRadioChoice == true) {
        $("#rightContent").remove();
    }

    if (value == "custom") {
        $("tbody").remove();
        $("thead").remove();
        $(".table").append("<thead class='thead-dark head-table'></thead>");
        checkRadioChoice = true;
        createTemplateCustom();
        firstDate = document.querySelector("#firstDate");
        endDate = document.querySelector("#endDate");

    } else if (value == "month") {
        $("tbody").remove();
        $("canvas").remove();
        $("thead").remove();
        $("#chart-container").append("<canvas id='graphCanvas'></canvas>");
        $(".table").append("<thead class='thead-dark head-table'></thead>");
        checkRadioChoice = true;
        createTemplateMonth();
        choiceMonthFirst = document.querySelector("#choiceMonthFirst");
        yearFirst = document.querySelector("#yearFirst");
        //await 

    } else if (value == "year") {
        $("tbody").remove();
        $("thead").remove();
        $("canvas").remove();
        $("#chart-container").append("<canvas id='graphCanvas'></canvas>");
        $(".table").append("<thead class='thead-dark head-table'></thead>");
        checkRadioChoice = true;
        createTemplateYear();
        yearFirst = document.querySelector("#yearFirst");
        yearEnd = document.querySelector("#yearEnd");
    }
}

function reportMenu(menu) {
    if (checkTemplate == true) {
        $("#leftContent").remove();
        $("#rightContent").remove();
    } else {
        console.log(checkTemplate);
    }

    if (menu == 1) {

        /*myobj.remove();
        myobj1.remove();*/

        template = "<div class='main-left-content' id='leftContent'>\
<h6><b>ตัวช่วยในการเลือก</b></h6>\
<div class='form-check'>\
    <input class='form-check-input' onclick='radioCheck(this.value)' type='radio' name='exampleRadios' id='radioDateChoice' value='custom' >\
    <label class='form-check-label' for='exampleRadios1'>\
      กำหนดเอง\
    </label>\
</div>\
<div class='form-check'>\
    <input class='form-check-input' onclick='radioCheck(this.value)' type='radio' name='exampleRadios' id='radioDateChoice' value='month'>\
    <label class='form-check-label' for='exampleRadios2'>\
      รายเดือน\
    </label>\
</div>\
<div class='form-check'>\
    <input class='form-check-input' onclick='radioCheck(this.value)' type='radio' name='exampleRadios' id='radioDateChoice' value='year'>\
    <label class='form-check-label' for='exampleRadios2'>\
      รายปี\
    </label>\
</div>\
<div class='form-check'>\
    <input class='form-check-input' onclick='radioCheck(this.value)' type='radio' name='exampleRadios' id='radioDateChoice' value='option2'>\
    <label class='form-check-label' for='exampleRadios2'>\
      Second default radio\
    </label>\
</div>\
<div class='form-check disabled'>\
    <input class='form-check-input' onclick='radioCheck(this.value)' type='radio' name='exampleRadios' id='radioDateChoice' value='option3' disabled>\
    <label class='form-check-label' for='exampleRadios3'>\
      Disabled radio\
    </label>\
</div>\
</div>\
";
        //console.log(leftContent);
        // alert(menu);
        mainTopic.innerHTML = "รายงานยอดขาย";
        $(".main-content-head").append(template);
        checkTemplate = true;
    } else if (menu == 2) {

        checkTemplate = true;
        template = "<div class='main-left-content' id='leftContent'>\
        <h6><b>ตัวช่วยในการเลือก</b></h6>\
        <div class='form-check'>\
            <input class='form-check-input' onclick='radioCheck(this.value)' type='radio' name='exampleRadios' id='radioDateChoice' value='custom' >\
            <label class='form-check-label' for='exampleRadios1'>\
              กำหนดเอง\
            </label>\
        </div>\
        <div class='form-check'>\
            <input class='form-check-input' onclick='radioCheck(this.value)' type='radio' name='exampleRadios' id='radioDateChoice' value='month'>\
            <label class='form-check-label' for='exampleRadios2'>\
              รายเดือน\
            </label>\
        </div>\
        <div class='form-check'>\
            <input class='form-check-input' onclick='radioCheck(this.value)' type='radio' name='exampleRadios' id='radioDateChoice' value='year'>\
            <label class='form-check-label' for='exampleRadios2'>\
              รายปี\
            </label>\
        </div>\
        <div class='form-check'>\
            <input class='form-check-input' onclick='radioCheck(this.value)' type='radio' name='exampleRadios' id='radioDateChoice' value='option2'>\
            <label class='form-check-label' for='exampleRadios2'>\
              Second default radio\
            </label>\
        </div>\
        <div class='form-check disabled'>\
            <input class='form-check-input' onclick='radioCheck(this.value)' type='radio' name='exampleRadios' id='radioDateChoice' value='option3' disabled>\
            <label class='form-check-label' for='exampleRadios3'>\
              Disabled radio\
            </label>\
        </div>\
        </div>\
        ";
        // alert(menu);
        mainTopic.innerHTML = "รายงานโปรโมชั่น";
        $(".main-content-head").append(template);
        //alert(menu);
    } else if (menu == 3) {

        checkTemplate = true;
        template = "<div class='main-left-content' id='leftContent'>\
        <h6><b>ตัวช่วยในการเลือก</b></h6>\
        <div class='form-check'>\
            <input class='form-check-input' onclick='radioCheck(this.value)' type='radio' name='exampleRadios' id='radioDateChoice' value='custom' >\
            <label class='form-check-label' for='exampleRadios1'>\
              กำหนดเอง\
            </label>\
        </div>\
        <div class='form-check'>\
            <input class='form-check-input' onclick='radioCheck(this.value)' type='radio' name='exampleRadios' id='radioDateChoice' value='month'>\
            <label class='form-check-label' for='exampleRadios2'>\
              รายเดือน\
            </label>\
        </div>\
        <div class='form-check'>\
            <input class='form-check-input' onclick='radioCheck(this.value)' type='radio' name='exampleRadios' id='radioDateChoice' value='year'>\
            <label class='form-check-label' for='exampleRadios2'>\
              รายปี\
            </label>\
        </div>\
        <div class='form-check'>\
            <input class='form-check-input' onclick='radioCheck(this.value)' type='radio' name='exampleRadios' id='radioDateChoice' value='option2'>\
            <label class='form-check-label' for='exampleRadios2'>\
              Second default radio\
            </label>\
        </div>\
        <div class='form-check disabled'>\
            <input class='form-check-input' onclick='radioCheck(this.value)' type='radio' name='exampleRadios' id='radioDateChoice' value='option3' disabled>\
            <label class='form-check-label' for='exampleRadios3'>\
              Disabled radio\
            </label>\
        </div>\
        </div>\
        ";
        // alert(menu);
        mainTopic.innerHTML = "รายงานการยกเลิกบิลใบเสร็จ";
        /*leftContent.classList.remove("mystyle");
        leftContent.classList.remove("mystyle");*/
        $(".main-content-head").append(template);
        //alert(menu);
    } else {

        checkTemplate = true;
        template = "<div class='main-left-content' id='leftContent'>\
        <h6><b>ตัวช่วยในการเลือก</b></h6>\
        <div class='form-check'>\
            <input class='form-check-input' onclick='radioCheck(this.value)' type='radio' name='exampleRadios' id='radioDateChoice' value='custom' >\
            <label class='form-check-label' for='exampleRadios1'>\
              กำหนดเอง\
            </label>\
        </div>\
        <div class='form-check'>\
            <input class='form-check-input' onclick='radioCheck(this.value)' type='radio' name='exampleRadios' id='radioDateChoice' value='month'>\
            <label class='form-check-label' for='exampleRadios2'>\
              รายเดือน\
            </label>\
        </div>\
        <div class='form-check'>\
            <input class='form-check-input' onclick='radioCheck(this.value)' type='radio' name='exampleRadios' id='radioDateChoice' value='year'>\
            <label class='form-check-label' for='exampleRadios2'>\
              รายปี\
            </label>\
        </div>\
        <div class='form-check'>\
            <input class='form-check-input' onclick='radioCheck(this.value)' type='radio' name='exampleRadios' id='radioDateChoice' value='option2'>\
            <label class='form-check-label' for='exampleRadios2'>\
              Second default radio\
            </label>\
        </div>\
        <div class='form-check disabled'>\
            <input class='form-check-input' onclick='radioCheck(this.value)' type='radio' name='exampleRadios' id='radioDateChoice' value='option3' disabled>\
            <label class='form-check-label' for='exampleRadios3'>\
              Disabled radio\
            </label>\
        </div>\
        </div>\
        ";
        // alert(menu);
        mainTopic.innerHTML = "รายงานสินค้า";
        $(".main-content-head").append(template);
        //alert(menu);
    }
}