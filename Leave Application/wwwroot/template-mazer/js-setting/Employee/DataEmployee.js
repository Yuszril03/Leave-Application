$(document).ready(function(){
    var table = $('#tableEmployee').DataTable({
         "ordering": true,
        "info": false,
        "pageLength": 5,
       "lengthChange": false,
        "searching": true,
        "language": {
            search: '',
            searchPlaceholder: "Search..."
        },
        'ajax': {
            url: "/User/GetEmployeesEachManager/" ,
            dataType: "json",
            dataSrc: ""
        },
        "columns": [
            
            {
                data : "nik"
            },
            {
                data: null,
                render: function (data, type, row, meta) {
                    return row['firstName'] + " " + row['lastName']
                }
            },
            {
                data: "gender"
            },
            {
                data: "departmentName"
            },
            {
                data: null,
                render: function (data, type, row, meta) {
                    return (row['leaveStatus'] == 1) ? '<span class="badge bg-success">Work</span>' :'<span class="badge bg-secondary">Leave</span>'
                }
            },
            {
                data: null,
                render: function (data, type, row, meta) {
                    return '<button class="btn btn-info btn-sm m-2 open"  data-id="' + row['nik'] + '" data-bs-toggle="modal" data-bs-target="#details"><i class="bi bi-info-circle-fill"></i> Details</button>';

                },
                searchable: false,
                orderable: false
            },
        ]
    });

  var tableDetail = $('#tableDetail').dataTable({
        "ordering": true,
        "info": false,
        "pageLength": 5,
        "lengthChange": false,
        "searching": false
        //'ajax': {
        //    url: "/User/GetAccountLEaveEmployee/" + id,
        //    dataType: "json",
        //    dataSrc: ""
        //},
        //"columns": [
        //    {
        //        data: null,
        //        render: function (data, type, row, meta) {
        //            return no++;

        //        },
        //        searchable: false,
        //        orderable: false
        //    },
        //    {
        //        data: 'leaveName'
        //    },
        //    {
        //        data: 'leaveType'
        //    }, {
        //        data: null,
        //        render: function (data, type, row, meta) {
        //            let startDate = new Date(row['startDate'])
        //            let endDate = new Date(row['endDate'])
        //            return startDate.toDateString() + " - " + endDate.toDateString()

        //        },
        //    },
        //    {
        //        data: null,
        //        render: function (data, type, row, meta) {
        //            if (row['status'] == 0) {
        //                return '<span class="badge bg-success">Accepted </span>'
        //            } else if (row['status'] == 1) {
        //                return '<span class="badge bg-danger">Rejected </span>'
        //            }
        //            else if (row['status'] == 2) {
        //                return '<span class="badge bg-warning">Processed </span>'
        //            }

        //        },
        //    }
        //]
  })
    var z = 0;
    $(document).on('click', '.open', function () {
        var id = $(this).data('id');
        $.ajax({
            url: "/User/GetOneEmployeesEachManager/" + id
        }).done((result) => {
            console.log(result)
            $("#nik").html(result[0].nik)
            $("#nameEmploy").html(result[0].firstName + " " + result[0].lastName)
            $("#gender").html(result[0].gender)
            $("#email").html(result[0].email)
            $("#dept").html(result[0].departmentName)
            $("#quota").html(result[0].leaveQuota)
            if (result[0].leaveStatus == 0) {
                $("#status").html('<span class="badge bg-secondary">Leave</span>')
            } else {
                $("#status").html('<span class="badge bg-success">Work</span>')
            }
            $("#phone").html("+62" + parseInt(result[0].phoneNumber))
        })

        $.ajax({
            url: "/User/GetAccountLEaveEmployee/" + id,
        }).done((result) => {
            var noo = 1;
            var status = '';
            tableDetail.fnClearTable()
            $.each(result, function (key, val) {
                let startDate = new Date(val.startDate)
                let endDate = new Date(val.endDate)

                if (val.status == 0) {
                    status = '<span class="badge bg-success">Accepted </span>'
                } else if (val.status== 1) {
                    status = '<span class="badge bg-danger">Rejected </span>'
                }
                else if (val.status == 2) {
                    status = '<span class="badge bg-warning">Processed </span>'
                }
               
                tableDetail.fnAddData([
                    noo++,
                    val.leaveName,
                    val.leaveType,
                    startDate.toDateString() + " - " + endDate.toDateString(),
                    status
                ])
            })
        })
       
       
    })
    setInterval(function () { table.ajax.reload(null, false); }, 10000);
})