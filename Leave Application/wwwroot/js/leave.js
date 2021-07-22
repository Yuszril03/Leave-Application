﻿//Datatable
$(document).ready(function () {
    let table = $('#dataTable').DataTable({
        responsive: true,
        'ajax': {
            url: '/Admin/GetLeaves',
            dataSrc: ''
        },
        'columns': [
            { 'data': 'leaveName' },
            { 'data': 'leaveType' },
            {
                'data': null,
                'render': function (data, type, row) {
                    if (row['leaveRange'] === 0) {
                        return 'Determined by Requester'
                    }
                    else {
                        return `${row['leaveRange']}`;
                    }
                }
            },
            {
                'bSortable': false,
                'data': null,
                'render': function (data, type, row) {
                    return `<a class='btn btn-outline-secondary' href='LeavesData/?leaveId=${row['leaveId']}'>Look</a>`;
                }
            },
            {
                'bSortable': false,
                'data': null,
                'render': function (data, type, row) {
                    return `<a class='btn btn-outline-secondary' href='EditLeave/?leaveId=${row['leaveId']}'>Edit</a>`;
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

function Insert() {
    let LeaveName = $("#leaveName").val();
    let LeaveType = $("#type").val();
    let LeaveRange = parseInt($("#range").val());

    let obj = {
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
                url: '/Admin/AddLeaves',
                type: 'post',
                data: obj,
                beforeSend: function () {
                    document.getElementById('btnLeave').classList.add('disabled');
                    document.getElementById('btnLeave').innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
                }
            }).done((result) => {
                document.getElementById('btnLeave').innerHTML = 'Add Leave';
                document.getElementById('btnLeave').classList.remove('disabled');
                if (result.result > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: `${result.message}`
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $('.modal').hide();
                            $('.modal-backdrop').remove();
                            document.getElementById('formLeave').reset();
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