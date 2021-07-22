const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('departmentId');

$(window).on('load', function () {
    $.ajax({
        url: '/Admin/GetDepartment/' + id,
    }).done((result) => {
        $('#departmentId').val(result.departmentId);
        $('#departmentName').val(result.departmentName);
    });
});

window.addEventListener('load', () => {
    let forms = document.getElementsByClassName('needs-validation');
    for (let form of forms) {
        form.addEventListener('submit', (evt) => {
            if (!form.checkValidity()) {
                evt.preventDefault();
                evt.stopPropagation();
            } else {
                evt.preventDefault();
                Update();
            }
            form.classList.add('was-validated');
        });
    }
});

function Update() {
    let DepartmentId = $("#departmentId").val();
    let DepartmentName = $("#departmentName").val();

    let obj = {
        DepartmentId: DepartmentId,
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
                url: '/Admin/UpdateDepartment/' + id,
                type: 'put',
                data: obj,
                beforeSend: function () {
                    document.getElementById('btnUpdate').classList.add('disabled');
                }
            }).done((result) => {
                document.getElementById('btnUpdate').classList.remove('disabled');
                if (result.result > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: `${result.message}`
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $('.modal').hide();
                            $('.modal-backdrop').remove();
                            window.location = "/Admin/Department";
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