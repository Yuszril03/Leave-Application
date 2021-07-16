$(document).ready(function () {

    $('#tableBeranda').DataTable({
        "ordering": false,
        "info": false,
        "pageLength": 5,
        "lengthChange": false,
        "searching": false
    });

    $.ajax({
        url:"/Employee/GetSessionNIK"
    }).done((result) => {
        console.log(result)
    })
});
