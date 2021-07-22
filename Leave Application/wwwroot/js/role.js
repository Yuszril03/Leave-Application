//Datatable
$(document).ready(function () {
    let table = $('#dataTable').DataTable({
        responsive: true,
        'ajax': {
            url: '/Admin/GetAccounts',
            dataSrc: ''
        },
        'columns': [
            { 'data': 'nik' },
            {
                'data': null,
                'render': function (data, type, row) {
                    let roles = "";
                    for (var i = 0; i < row['roles'].length; i++) {
                        roles += `<span class="badge badge-secondary mr-1">${row['roles'][i].roleName}</span>`;
                    }
                    return roles;
                }
            },
            {
                'bSortable': false,
                'data': null,
                'render': function (data, type, row) {
                    return `<button class='btn btn-outline-secondary open' data-id='${row['nik']}' data-toggle='modal' data-target='#updateModal'>Edit</button>`;
                }
            }
        ]
    });

    $(document).on('click', '.open', function () {
        var NIK = $(this).data('id');
        $('#nik').val(NIK);
        $.ajax({
            url: '/Admin/GetAccounts/' + NIK
        }).done((result) => {
            $.each(result.roles, function (key, val) {
                if (val.roleId == 2) {
                    $('#manager').prop('checked', true);
                }
                else if (val.roleId == 3) {
                    $('#admin').prop('checked', true);
                }
            });
        });
    });

    $(document).on('click', '.close', function () {
        $('#manager').prop('checked', false);
        $('#admin').prop('checked', false);
    });

    $('#btnUpdate').click(function () {
        let Nik = $("#nik").val();
        let Condition = 0;
        if ($('#manager').is(':checked')) {
            Condition = 1;
        }
        if ($('#admin').is(':checked')) {
            Condition = 2;
        }
        if ($('#manager').is(':checked') && $('#admin').is(':checked')) {
            Condition = 3;
        }

        let obj = {
            Nik: Nik,
            Condition: Condition
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
                    url: '/Admin/Updateroles',
                    data: obj,
                    beforeSend: function () {
                        document.getElementById('btnUpdate').classList.add('disabled');
                        document.getElementById('btnUpdate').innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
                    }
                }).done((result) => {
                    $('#manager').prop('checked', false);
                    $('#admin').prop('checked', false);
                    document.getElementById('btnUpdate').innerHTML = 'Save';
                    $('.modal').hide();
                    $('.modal-backdrop').remove();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your changes has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
            }
        });
    });

    setInterval(function () {
        table.ajax.reload(null, false);
    }, 3000);
});