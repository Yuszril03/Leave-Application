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