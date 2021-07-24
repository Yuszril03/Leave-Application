$(document).ready(function () {
    var myModal = new bootstrap.Modal(document.getElementById('details'), {
        keyboard: false
    })
    var no = 1;
    var table = $('#tableLeaveEmployee').DataTable({
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
            url: "/User/GetAllLeaveEmployee/" + $("#nikHidden").val(),
            dataType: "json",
            dataSrc: ""
        },
        "columns": [
            
            {
                data: null,
                render: function (data, type, row, meta) {
                    return row['firstName'] + " " + row['lastName']
                }
            },
            {
                data: "leaveName"
            }, {
                data: null,
                render: function (data, type, row, meta) {
                    return formatDate(splitTGL(row['startDate'])) + " - " + formatDate(splitTGL(row['endDate']))
                }
            },
            {
                data: null,
                render: function (data, type, row, meta) {
                    return '<button class="btn btn-info btn-sm m-2 open"  data-id="' + row['noLeave'] + '" data-bs-toggle="modal" data-bs-target="#details"><i class="bi bi-info-circle-fill"></i> Details</button>';
                    
                },
                searchable: false,
                orderable: false
            }
        ]
    });
    checkLeaveInformation()
    function checkLeaveInformation() {
        $.ajax({
            url: "/User/GetAllLeaveEmployee/" + $("#nikHidden").val(),
        }).done((result) => {
            var dateNow = new Date()
            $.each(result, function (key, val) {
                var dateStart = new Date(val.startDate);
                if (dateNow >= dateStart) {
                    if (val.leaveType == "Special Leave") {
                        $.ajax({
                            url: "/LeaveEmployee/Get/" + val.noLeave
                        }).done((hasilOne) => {
                            var obj = new Object();
                            obj.NoLeave = hasilOne.noLeave
                            obj.StartDate = hasilOne.startDate
                            obj.EndDate = hasilOne.endDate
                            obj.TotalDays = hasilOne.totalDays
                            obj.Attachment = hasilOne.attachment
                            obj.Status = 1
                            obj.NIK = hasilOne.nik
                            obj.LeaveId = hasilOne.leaveId
                            $.ajax({
                                url: "/LeaveEmployee/Put",
                                type: "PUT",
                                data: obj
                            }).done((resultDATA) => {
                                table.ajax.reload(null, false);
                            })
                        })
                    } else {
                        $.ajax({
                            url: "/LeaveEmployee/Get/" + val.noLeave
                        }).done((hasilOne) => {
                            var obj = new Object();
                            obj.NoLeave = hasilOne.noLeave
                            obj.StartDate = hasilOne.startDate
                            obj.EndDate = hasilOne.endDate
                            obj.TotalDays = hasilOne.totalDays
                            obj.Attachment = hasilOne.attachment
                            obj.Status = 1
                            obj.NIK = hasilOne.nik
                            obj.LeaveId = hasilOne.leaveId
                            $.ajax({
                                url: "/LeaveEmployee/Put",
                                type: "PUT",
                                data: obj
                            }).done((resultDATA) => {
                                $.ajax({
                                    url: "/Account/Get/" + $("#nikHidden").val()
                                }).done((hasilAwal) => {
                                    var objAc = new Object();
                                    objAc.NIK = hasilAwal.nik
                                    objAc.Password = hasilAwal.password
                                    objAc.LeaveQuota = (hasilAwal.leaveQuota + val.totalDays)
                                    objAc.LeaveStatus = hasilAwal.leaveStatus
                                    $.ajax({
                                        url: "/Account/Put",
                                        type: "PUT",
                                        data: objAc
                                    }).done((hasilUPAc) => {
                                        table.ajax.reload(null, false);
                                    })
                                })

                            })
                        })
                    }
                }
            })
           
        })
    }

    $(document).on('click', '.open', function () {
        var id = $(this).data('id');

        $.ajax({
            url: "/User/GetOneLeaveEmployee/"+id
        }).done((result) => {
            $("#idRespon").val(result[0].noLeave);
            $("#nameEmploy").html(result[0].firstName + " " + result[0].lastName);
            $("#email").html(result[0].email);
            $("#phone").html("+62" + parseInt(result[0].phoneNumber));
            $("#Dept").html(result[0].departmentName);
            $("#leaveName").html(result[0].leaveName);
            $("#type").html(result[0].leaveType);
            $("#nikUSer").val(result[0].nik);
            $("#totalHIDE").val(result[0].totalDays);
            $("#period").html(formatDate(splitTGL(result[0].startDate)) + " - " + formatDate(splitTGL(result[0].endDate)));
            if (result[0].attachment == null) {
                $("#attch").html('<span class="badge bg-danger">No Attachment</span>');
            } else {

            $("#attch").html('<a href="/User/DownloadFile/' + result[0].attachment + '" target="_blank" class="btn btn-primary btn-sm"> <i class="bi bi-cloud-arrow-down-fill"></i> Download</button>');
            }
        })
    })

    function splitTGL(data) {
        let splitt = data.split("T");
        return splitt[0];
    }
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

    $(".accept").click(function () {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes agree!'
        }).then((result) => {
            if (result.isConfirmed) {
                if ($("#type").html() == "Normal Leave") {
                    $.ajax({
                        url: "/LeaveEmployee/Get/" + $("#idRespon").val()
                    }).done((result) => {
                        var obj = new Object()
                        obj.NoLeave = result.noLeave;
                        obj.StartDate = result.startDate;
                        obj.EndDate = result.endDate;
                        obj.TotalDays = result.totalDays;
                        obj.Attachment = result.attachment;
                        obj.Status = 0;
                        obj.NIK = result.nik;
                        obj.LeaveId = result.leaveId;
                        $.ajax({
                            url: "/LeaveEmployee/Put",
                            type: "PUT",
                            data: obj
                        }).done((resultUpdate)=>{
                            $.ajax({
                                url: "/Account/Get/" + result.nik
                            }).done((resultGetAc) => {
                                var updateEmploy = new Object();
                                updateEmploy.NIK = resultGetAc.nik;
                                updateEmploy.Password = resultGetAc.password;
                                updateEmploy.LeaveQuota = resultGetAc.leaveQuota;
                                updateEmploy.LeaveStatus = 0;
                                $.ajax({
                                    url: "/Account/Put",
                                    type: "PUT",
                                    data: updateEmploy
                                }).done((doneUp) => {
                                    $.ajax({
                                        url: "/User/GetAllLeaveEmployee/" + $("#nikHidden").val(),
                                    }).done((GetALL) => {
                                        $.each(GetALL, function (key1, val1) {
                                            if (val1.nik == result.nik && val1.status == 2 && val1.noLeave != $("#idRespon").val()) {
                                                $.ajax({
                                                    url: "/LeaveEmployee/Get/" + val1.noLeave
                                                }).done((hasilGETT) => {
                                                    var obj3 = new Object()
                                                    obj3.NoLeave = hasilGETT.noLeave;
                                                    obj3.StartDate = hasilGETT.startDate;
                                                    obj3.EndDate = hasilGETT.endDate;
                                                    obj3.TotalDays = hasilGETT.totalDays;
                                                    obj3.Attachment = hasilGETT.attachment;
                                                    obj3.Status = 1;
                                                    obj3.NIK = hasilGETT.nik;
                                                    obj3.LeaveId = hasilGETT.leaveId;
                                                   
                                                    if (val1.leaveType == "Special Leave") {
                                                        $.ajax({
                                                            url: "/LeaveEmployee/Put/",
                                                            type: "PUT",
                                                            data: obj3
                                                        }).done((hasilUP3) => {
                                                            
                                                        })
                                                    } else {
                                                        $.ajax({
                                                            url: "/LeaveEmployee/Put/",
                                                            type: "PUT",
                                                            data: obj3
                                                        }).done((hasilUP3) => {
                                                           
                                                            $.ajax({
                                                                url: "/Account/Get/" + hasilGETT.nik
                                                            }).done((hasilAC4) => {
                                                                console.log(hasilAC4)
                                                                var updateEmploy4 = new Object();
                                                                updateEmploy4.NIK = hasilAC4.nik;
                                                                updateEmploy4.Password = hasilAC4.password;
                                                                updateEmploy4.LeaveQuota = (hasilAC4.leaveQuota + hasilGETT.totalDays);
                                                                updateEmploy4.LeaveStatus = hasilAC4.leaveStatus;
                                                                $.ajax({
                                                                    url: "/Account/Put",
                                                                    type: "PUT",
                                                                    data: updateEmploy4
                                                                }).done((hasilUP44) => {

                                                                })

                                                            })
                                                        })
                                                    }
                                                })




                                            }
                                        })
                                        table.ajax.reload(null, false)
                                        myModal.hide()
                                        loadNotif()
                                        Swal.fire(
                                            'Approved!',
                                            'Leave request has been received.',
                                            'success'
                                        )
                                    })
                                   
                                }).fail((failUp) => {
                                    table.ajax.reload(null, false)
                                    myModal.hide()
                                    loadNotif()
                                    Swal.fire(
                                        'Approved!',
                                        'Leave request failed to send.',
                                        'error'
                                    )
                                })
                            })
                            
                        })
                    })
                } else {
                    $.ajax({
                        url: "/LeaveEmployee/Get/" + $("#idRespon").val()
                    }).done((result) => {
                        var obj = new Object()
                        obj.NoLeave = result.noLeave;
                        obj.StartDate = result.startDate;
                        obj.EndDate = result.endDate;
                        obj.TotalDays = result.totalDays;
                        obj.Attachment = result.attachment;
                        obj.Status = 0;
                        obj.NIK = result.nik;
                        obj.LeaveId = result.leaveId;
                        $.ajax({
                            url: "/LeaveEmployee/Put",
                            type: "PUT",
                            data: obj
                        }).done((resultUpdate) => {
                            $.ajax({
                                url: "/Account/Get/" + result.nik
                            }).done((resultGetAc) => {
                                var updateEmploy = new Object();
                                updateEmploy.NIK = resultGetAc.nik;
                                updateEmploy.Password = resultGetAc.password;
                                updateEmploy.LeaveQuota = resultGetAc.leaveQuota;
                                updateEmploy.LeaveStatus = 0;
                                $.ajax({
                                    url: "/Account/Put",
                                    type: "PUT",
                                    data: updateEmploy
                                }).done((doneUp) => {
                                    $.ajax({
                                        url: "/User/GetAllLeaveEmployee/" + $("#nikHidden").val(),
                                    }).done((GetALL) => {
                                        $.each(GetALL, function (key1, val1) {
                                            if (val1.nik == result.nik && val1.status == 2 && val1.noLeave != $("#idRespon").val()) {
                                                $.ajax({
                                                    url: "/LeaveEmployee/Get/" + val1.noLeave
                                                }).done((hasilGETT) => {
                                                    var obj3 = new Object()
                                                    obj3.NoLeave = hasilGETT.noLeave;
                                                    obj3.StartDate = hasilGETT.startDate;
                                                    obj3.EndDate = hasilGETT.endDate;
                                                    obj3.TotalDays = hasilGETT.totalDays;
                                                    obj3.Attachment = hasilGETT.attachment;
                                                    obj3.Status = 1;
                                                    obj3.NIK = hasilGETT.nik;
                                                    obj3.LeaveId = hasilGETT.leaveId;
                                                    if (val1.leaveType == "Special Leave") {
                                                        $.ajax({
                                                            url: "/LeaveEmployee/Put/",
                                                            type: "PUT",
                                                            data: obj3
                                                        }).done((hasilUP3) => {
                                                            $.ajax({
                                                                url: "/Account/Get/" + val1.nik
                                                            }).done((hasilAC4) => {

                                                            })
                                                        })
                                                    } else {
                                                        $.ajax({
                                                            url: "/LeaveEmployee/Put/",
                                                            type: "PUT",
                                                            data: obj3
                                                        }).done((hasilUP3) => {
                                                            $.ajax({
                                                                url: "/Account/Get/" + val1.nik
                                                            }).done((hasilAC4) => {
                                                                var updateEmploy4 = new Object();
                                                                updateEmploy4.NIK = hasilAC4.nik;
                                                                updateEmploy4.Password = hasilAC4.password;
                                                                updateEmploy4.LeaveQuota = (hasilAC4.leaveQuota + hasilGETT.totalDays);
                                                                updateEmploy4.LeaveStatus = hasilAC4.leaveStatus;
                                                                $.ajax({
                                                                    url: "/Account/Put",
                                                                    type: "PUT",
                                                                    data: updateEmploy4
                                                                }).done((hasilUP44) => {

                                                                })

                                                            })
                                                        })
                                                    }
                                                })
                                               
                                                


                                            }
                                        })
                                        table.ajax.reload(null, false)
                                        myModal.hide()
                                        loadNotif()
                                        Swal.fire(
                                            'Approved!',
                                            'Leave request has been received.',
                                            'success'
                                        )
                                    })
                                   
                                }).fail((failUp) => {
                                    table.ajax.reload(null, false)
                                    myModal.hide()
                                    loadNotif()
                                    Swal.fire(
                                        'Approved!',
                                        'Leave request failed to send.',
                                        'error'
                                    )
                                })
                            })

                        })
                    })
                }
                
            }
        })
    })
    $(".rejected").click(function () {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes refuse!'
        }).then((result) => {
            if (result.isConfirmed) {

                if ($("#type").html() == "Normal Leave") {
                    $.ajax({
                        url: "/LeaveEmployee/Get/" + $("#idRespon").val()
                    }).done((result) => {
                        var obj = new Object()
                        obj.NoLeave = result.noLeave;
                        obj.StartDate = result.startDate;
                        obj.EndDate = result.endDate;
                        obj.TotalDays = result.totalDays;
                        obj.Attachment = result.attachment;
                        obj.Status = 1;
                        obj.NIK = result.nik;
                        obj.LeaveId = result.leaveId;
                        $.ajax({
                            url: "/LeaveEmployee/Put",
                            type: "PUT",
                            data: obj
                        }).done((resultUpdate) => {
                            $.ajax({
                                url: "/Account/Get/" + result.nik
                            }).done((resultGetAc) => {
                                var updateEmploy = new Object();
                                updateEmploy.NIK = resultGetAc.nik;
                                updateEmploy.Password = resultGetAc.password;
                                updateEmploy.LeaveQuota = (resultGetAc.leaveQuota + result.totalDays);
                                updateEmploy.LeaveStatus = 1;
                                $.ajax({
                                    url: "/Account/Put",
                                    type: "PUT",
                                    data: updateEmploy
                                }).done((doneUp) => {
                                    table.ajax.reload(null, false)
                                    myModal.hide()
                                    loadNotif()
                                    Swal.fire(
                                        'Rejected!',
                                        'Leave request has been rejected.',
                                        'success'
                                    )
                                }).fail((failUp) => {
                                    table.ajax.reload(null, false)
                                    myModal.hide()
                                    loadNotif()
                                    Swal.fire(
                                        'Rejected!',
                                        'Leave request failed to send.',
                                        'error'
                                    )
                                })
                            })

                        })
                    })
                } else {
                    $.ajax({
                        url: "/LeaveEmployee/Get/" + $("#idRespon").val()
                    }).done((result) => {
                        var obj = new Object()
                        obj.NoLeave = result.noLeave;
                        obj.StartDate = result.startDate;
                        obj.EndDate = result.endDate;
                        obj.TotalDays = result.totalDays;
                        obj.Attachment = result.attachment;
                        obj.Status = 1;
                        obj.NIK = result.nik;
                        obj.LeaveId = result.leaveId;
                        $.ajax({
                            url: "/LeaveEmployee/Put",
                            type: "PUT",
                            data: obj
                        }).done((resultUpdate) => {
                            $.ajax({
                                url: "/Account/Get/" + result.nik
                            }).done((resultGetAc) => {
                                var updateEmploy = new Object();
                                updateEmploy.NIK = resultGetAc.nik;
                                updateEmploy.Password = resultGetAc.password;
                                updateEmploy.LeaveQuota = resultGetAc.leaveQuota;
                                updateEmploy.LeaveStatus = 1;
                                $.ajax({
                                    url: "/Account/Put",
                                    type: "PUT",
                                    data: updateEmploy
                                }).done((doneUp) => {
                                    table.ajax.reload(null, false)
                                    myModal.hide()
                                    loadNotif()
                                    Swal.fire(
                                        'Rejected!',
                                        'Leave request has been rejected.',
                                        'success'
                                    )
                                }).fail((failUp) => {
                                    table.ajax.reload(null, false)
                                    myModal.hide()
                                    loadNotif()
                                    Swal.fire(
                                        'Rejected!',
                                        'Leave request failed to send.',
                                        'error'
                                    )
                                })
                            })

                        })
                    })
                }

                
            }
        })
    })
    setInterval(function () { table.ajax.reload(null, false); }, 10000);
});


