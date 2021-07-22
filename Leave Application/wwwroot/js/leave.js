//Datatable
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
                        return 'Ditentukan Requester'
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
                    return `<button type='button' class='btn btn-outline-secondary'>Lihat</button>`;
                }
            }
        ]
    });

    setInterval(function () {
        table.ajax.reload(null, false);
    }, 3000);
});