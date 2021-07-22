//Datatable
$(document).ready(function () {
    let table = $('#dataTable').DataTable({
        responsive: true,
        'ajax': {
            url: '/Admin/GetDepartments',
            dataSrc: ''
        },
        'columns': [
            { 'data': 'departmentId' },
            { 'data': 'departmentName' },
            {
                'bSortable': false,
                'data': null,
                'render': function (data, type, row) {
                    return `<a class='btn btn-outline-secondary' href='EditDepartment/?departmentId=${row['departmentId']}'>Edit</a>`;
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
            if (!form.checkValidity()) {
                evt.preventDefault();
                evt.stopPropagation();
            }
            else {
                evt.preventDefault();
                Insert();
            }
            form.classList.add('was-validated');
        });
    }
});

function Insert() {
    let DepartmentName = $("#departmentName").val();

    let obj = {
        DepartmentName: DepartmentName
    };

    Swal.fire({
        title: 'Are you sure?',
        text: 'Make sure you fill the right data.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: '/Admin/AddDepartments',
                type: 'post',
                data: obj,
                beforeSend: function () {
                    document.getElementById('btnDepartment').classList.add('disabled');
                    document.getElementById('btnDepartment').innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
                }
            }).done((result) => {
                document.getElementById('btnDepartment').innerHTML = 'Add Department';
                document.getElementById('btnDepartment').classList.remove('disabled');
                if (result.result > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: `${result.message}`
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $('.modal').hide();
                            $('.modal-backdrop').remove();
                            document.getElementById('formDepartment').reset();
                        }
                    });
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Fail!',
                        text: `${result.message}`
                    });
                }
            });
        }
    });
}