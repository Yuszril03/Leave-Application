const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('leaveId');

$.ajax({
    url: '/Admin/GetLeaveEmployees/' + id
}).done((result) => {
    console.log(result);
});

//Datatable
$(document).ready(function () {
    let table = $('#dataTable').DataTable({
        responsive: true,
        'ajax': {
            url: '/Admin/GetLeaveEmployees/' + id,
            dataSrc: ''
        },
        'columns': [
            { 'data': 'noLeave' },
            { 'data': 'nik' },
            {
                'data': null,
                'render': function (data, type, row) {
                    let date = formatDate(`${row['startDate']}`);
                    return date;
                }
            },
            {
                'data': null,
                'render': function (data, type, row) {
                    let date = formatDate(`${row['endDate']}`);
                    return date;
                }
            },
            { 'data': 'totalDays' },
            {
                'data': null,
                'render': function (data, type, row) {
                    let att = "";
                    if (row['attachment'] != null) {
                        att = `Yes`;
                    }
                    else {
                        att = `No`;
                    }
                    return att;
                }
            },
            {
                'data': null,
                'render': function (data, type, row) {
                    let status = "";
                    if (row['status'] == 0) {
                        status = `<span class="badge badge-success">Approved</span>`;
                    }
                    else if (row['status'] == 1) {
                        status = `<span class="badge badge-danger">Rejected</span>`;
                    }
                    else {
                        status = `<span class="badge badge-warning">On Progress</span>`;
                    }
                    return status;
                }
            }
        ]
    });

    setInterval(function () {
        table.ajax.reload(null, false);
    }, 3000);
});

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('-');
}