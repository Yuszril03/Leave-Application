window.addEventListener('load', () => {
    let forms = document.getElementsByClassName('needs-validation');
    for (let form of forms) {
        form.addEventListener('submit', (evt) => {
            if (!form.checkValidity()) {
                evt.preventDefault();
                evt.stopPropagation();
            } 
            form.classList.add('was-validated');
        });
    }
});

function nik(id) {
    id.value = formatAngka(id.value, "");
}
function formatAngka(angka, prefix) {
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
        split = number_string.split(','),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
        separator = sisa ? '' : '';
        rupiah += separator + ribuan.join('');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? '' + rupiah : '');
}

////function Auth() {
////    Swal.fire({
////        icon: 'success',
////        title: 'Success',
////        text: 'Success to Login.'
////    }).then((result) => {
////        if (result.isConfirmed) {
////            $('#loginModal').modal('hide');
////        }
////    });
////}
