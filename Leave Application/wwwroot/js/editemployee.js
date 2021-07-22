const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const nik = urlParams.get('nik');

$.ajax({
    url: '/Admin/GetDepartments'
}).done((result) => {
    let text = '<option selected disabled value="">-Choose Department-</option>';
    $.each(result, function (key, val) {
        text += `<option value="${val.departmentId}">${val.departmentName}</option>`;
    });
    $('#department').html(text);
});

$.ajax({
    url: '/Admin/GetManagers'
}).done((result) => {
    let text = '<option selected disabled value="">-Choose Managers-</option>';
    $.each(result, function (key, val) {
        text += `<option value="${val.nik}" data-subtext="${val.nik}">${val.firstName} ${val.lastName}</option>`;
    });
    $('#manager').html(text);
    $('#manager').selectpicker('refresh');
});

$(window).on('load', function () {
    $.ajax({
        url: '/Admin/GetEmployee/' + nik,
    }).done((result) => {
        $('#nik').val(result[0].nik);
        $('#firstName').val(result[0].firstName);
        $('#lastName').val(result[0].lastName);
        if (result[0].gender === 0) {
            document.getElementById('male').checked = true;
        }
        else {
            document.getElementById('female').checked = true;
        }
        $('#email').val(result[0].email);
        $('#phoneNumber').val(result[0].phoneNumber);
        $('#manager').selectpicker('val', `${result[0].managerId}`);
        $('#department').prop('selectedIndex', result[0].departmentId);
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
    let NIK = $("#nik").val();
    let FirstName = $("#firstName").val();
    let LastName = $("#lastName").val();
    let Email = $("#email").val();
    let Gender = parseInt($("input[name=gender]:checked").val());
    let PhoneNumber = $("#phoneNumber").val();
    let ManagerId = $("#manager").val();
    let DepartmentId = parseInt($("#department").val());

    let obj = {
        Nik: NIK,
        FirstName: FirstName,
        LastName: LastName,
        Email: Email,
        Gender: Gender,
        PhoneNumber: PhoneNumber,
        ManagerId: ManagerId,
        DepartmentId: DepartmentId
    };
    console.log(obj)
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
                url: '/Admin/UpdateEmployee/',
                type: 'put',
                data: obj,
                beforeSend: function () {
                    document.getElementById('btnUpdate').classList.add('disabled');
                }
            }).done((result) => {
                console.log(result)
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
                            window.location = "/Admin/Employee";
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