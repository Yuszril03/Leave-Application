//Script Employee
$(window).on('load', function () {
    $.ajax({
        url: '/Admin/GetEmployees',
    }).done((result) => {
        let count = 0;
        $.each(result, function (key, val) {
            ++count;
        });
        document.getElementById('employeesNumber').innerHTML = count;
    });
});

//Script OnLeave
$(window).on('load', function () {
    $.ajax({
        url: '/Admin/GetEmployeesOnLeave',
    }).done((result) => {
        let count = 0;
        $.each(result, function (key, val) {
            ++count;
        });
        document.getElementById('onleave').innerHTML = count;
    });
});

//Script Employee
$(window).on('load', function () {
    $.ajax({
        url: '/Admin/GetEmployees',
    }).done((result) => {
        let count = 0;
        $.each(result, function (key, val) {
            ++count;
        });
        document.getElementById('employeesNumber').innerHTML = count;
    });
});

//Script Today Date
let monthNames = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = monthNames[today.getMonth()];
let yyyy = today.getFullYear();
let date = `${dd} ${mm} ${yyyy}`;
document.getElementById('todayDate').innerHTML = date;

//Script Today Time
var span = document.getElementById('todayTime');

function time() {
    var d = new Date();
    var s = d.getSeconds();
    var m = d.getMinutes();
    var h = d.getHours();
    span.textContent =
        ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2);
}
setInterval(time, 1000);

var d = new Date();
$.ajax({
    url: '/Admin/GetLeaveDataYearly/' + d.getFullYear(),
}).done((result) => {
    let dataLeave = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    $.each(result, function (key, val) {
        if (val.month == 0) {
            dataLeave[0] = val.count
        }
        else if (val.month == 1) {
            dataLeave[1] = val.count
        }
        else if (val.month == 2) {
            dataLeave[2] = val.count
        }
        else if (val.month == 3) {
            dataLeave[3] = val.count
        }
        else if (val.month == 4) {
            dataLeave[4] = val.count
        }
        else if (val.month == 5) {
            dataLeave[5] = val.count
        }
        else if (val.month == 6) {
            dataLeave[6] = val.count
        }
        else if (val.month == 7) {
            dataLeave[7] = val.count
        }
        else if (val.month == 8) {
            dataLeave[8] = val.count
        }
        else if (val.month == 9) {
            dataLeave[9] = val.count
        }
        else if (val.month == 10) {
            dataLeave[10] = val.count
        }
        else if (val.month == 11) {
            dataLeave[11] = val.count
        }
    });
    var options = {
        chart: {
            height: 300,
            type: 'line'
        },
        series: [{
            name: 'Person',
            data: dataLeave
        }],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
    }

    var chart = new ApexCharts(document.querySelector("#chart"), options);

    chart.render();
});

$.ajax({
    url: '/Admin/GetDepartmentData',
}).done((result) => {
    let name = [];
    let count = [];
    $.each(result, function (key, val) {
        name[key] = val.departmentName;
        count[key] = val.count
    });
    var options = {
        chart: {
            width: '100%',
            type: 'donut'
        },
        series: count,
        labels: name,
        legend: {
            position: 'bottom'
        }
    };

    var chart = new ApexCharts(document.querySelector("#chartPie"), options);
    chart.render();
});

//Logout Modal
function ShowModal()
{
    Swal.fire({
        title: 'Are you sure?',
        text: 'You need to login again.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '/Home/Logout';
        }
    });
}