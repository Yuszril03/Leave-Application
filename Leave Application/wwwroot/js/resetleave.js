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
    let LeaveQuota = $("#quota").val();

    let obj = {
        LeaveQuota: LeaveQuota
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
                url: '/Admin/ResetLeave',
                type: 'put',
                data: obj,
                beforeSend: function () {
                    document.getElementById('btnUpdate').classList.add('disabled');
                    document.getElementById('btnUpdate').innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
                }
            }).done((result) => {
                document.getElementById('btnUpdate').innerHTML = 'Reset';
                document.getElementById('btnUpdate').classList.remove('disabled');
                if (result.result > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: `${result.message}`
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location = "/Admin/Index";
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