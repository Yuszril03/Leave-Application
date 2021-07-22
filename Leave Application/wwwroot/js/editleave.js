const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('leaveId');

$(window).on('load', function () {
    $.ajax({
        url: '/Admin/GetLeave/' + id,
    }).done((result) => {
        $('#leaveId').val(result.leaveId);
        $('#leaveName').val(result.leaveName);
        $('#type').val(result.leaveType).trigger('change');
        $('#range').val(result.leaveRange);
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

function selectedType(that) {
    if (that.value == 'Normal Leave') {
        document.getElementById('leaveRange').innerHTML =
            `<label for="range" class="col-form-label">Leave Range</label>
            <input type="number" class="form-control" id="range" value="0" placeholder="Days" required disabled>
            <div class="valid-feedback">
                Looks good!
            </div>
            <div class="invalid-feedback">
                Please fill the field!
            </div>`;
    } else {
        document.getElementById('leaveRange').innerHTML =
            `<label for="range" class="col-form-label">Leave Range</label>
            <input type="number" class="form-control" id="range" placeholder="Days" required>
            <div class="valid-feedback">
                Looks good!
            </div>
            <div class="invalid-feedback">
                Please fill the field!
            </div>`;
    }
}

function Update() {
    let LeaveId = $("#leaveId").val();
    let LeaveName = $("#leaveName").val();
    let LeaveType = $("#type").val();
    let LeaveRange = parseInt($("#range").val());

    let obj = {
        LeaveId: LeaveId,
        LeaveName: LeaveName,
        LeaveType: LeaveType,
        LeaveRange: LeaveRange
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
                url: '/Admin/UpdateLeave',
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
                            window.location = "/Admin/Leave";
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