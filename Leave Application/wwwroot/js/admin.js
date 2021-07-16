//Script Today Date
const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];
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
        title: 'Anda yakin?',
        text: 'Anda akan butuh untuk login lagi',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, keluar',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '/Home/Logout';
        }
    });
}