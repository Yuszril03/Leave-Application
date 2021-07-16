//Datatable
$(document).ready(function () {
    let table = $('#dataTable').DataTable({
        responsive: true,
        'ajax': {
            url: '/Admin/GetEmployees',
            dataSrc: ''
        },
        'columns': [
            { 'data': 'nik' },
            {
                'data': null,
                'render': function (data, type, row) {
                    let name = `${row['firstName']} ${row['lastName']}`;
                    return name;
                }
            },
            { 'data': 'gender' },
            { 'data': 'email' },
            {
                'data': null,
                'render': function (data, type, row) {
                    let phone = row['phoneNumber'].substring(0, 1);
                    if (phone === '0') {
                        let number = row['phoneNumber'].slice(1);
                        return `+62${number}`;
                    }
                    else {
                        return `${row['phoneNumber']}`;
                    }
                }
            },
            { 'data': 'departmentName' },
            {
                'bSortable': false,
                'data': null,
                'render': function (data, type, row) {
                    return `<button type='button' class='btn btn-outline-secondary'>Sunting</button>`;
                }
            }
        ]
    });

    setInterval(function () {
        table.ajax.reload(null, false);
    }, 3000);
});

window.addEventListener('load', () => {
    let forms = document.getElementsByClassName('needs-validation');
    for (let form of forms) {
        form.addEventListener('submit', (evt) => {
            var failed = false;

            if ($("[name='select']:checked").length == 0) {
                $("[name='select']").attr('required', true);
                failed = true;
            }
            else {
                $("[name='select']").attr('required', false);
            }

            if (form.checkValidity() === false) {
                failed = true;
            }

            if (failed == true) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                evt.preventDefault();
                Insert();
            }
            form.classList.add('was-validated');
        });
    }
});

function Insert() {
    let NIK = $("#nik").val();
    let FirstName = $("#firstName").val();
    let LastName = $("#lastName").val();
    let Email = $("#email").val();
    let Gender = parseInt($("input[name=gender]:checked").val());
    let PhoneNumber = $("#phoneNumber").val();
    let DepartmentId = parseInt($("#department").val());
    let Password = $("#password").val();
    let LeaveQuota = 12;
    let LeaveStatus = 1;

    let obj = {
        Nik: NIK,
        FirstName: FirstName,
        LastName: LastName,
        Email: Email,
        Gender: Gender,
        PhoneNumber: PhoneNumber,
        DepartmentId: DepartmentId,
        Password: Password,
        LeaveQuota: LeaveQuota,
        LeaveStatus: LeaveStatus
    };

    Swal.fire({
        title: 'Anda yakin?',
        text: 'Pastikan kembali data yang di isi sudah sesuai.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: '/Admin/Register',
                type: 'post',
                data: obj,
                beforeSend: function () {
                    document.getElementById('btnRegist').classList.add('disabled');
                    document.getElementById('btnRegist').innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
                }
            }).done((result) => {
                document.getElementById('btnRegist').innerHTML = 'Regist';
                document.getElementById('btnRegist').classList.remove('disabled');
                if (result.result > 1) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil!',
                        text: `${result.message}`
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $('.modal').hide();
                            $('.modal-backdrop').remove();
                            document.getElementById('formRegist').reset();
                        }
                    });
                }
                else if (result.result === 1) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal!',
                        text: `${result.message}`
                    });
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal!',
                        text: `${result.message}`
                    });
                }
            });
        }
    });
}