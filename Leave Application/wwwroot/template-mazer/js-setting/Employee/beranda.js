$(document).ready(function () {
  
   var table= $('#tableBeranda').DataTable({
        "ordering": false,
        "info": false,
        "pageLength": 5,
        "lengthChange": false,
        "searching": false,
        'ajax': {
            url: "/User/GetAccountLEaveEmployee/" + $("#nikHidden").val(),
            dataType: "json",
            dataSrc: ""
        },
        "columns": [
            {
                data: null,
                render: function (data, type, row, meta) {
                    return row['leaveName'] + " - " + row['leaveType']
                }
            },
            {
                data: null,
                render: function (data, type, row, meta) {

                    let startDate = new Date(splitTGL(row['startDate']))
                    let endDate = new Date(splitTGL(row['endDate']))
                    return startDate.toDateString() + " - " + endDate.toDateString()
                }
            },
            {
                data: null,
                render: function (data, type, row, meta) {

                    if (row['status'] == 0) {
                        return '<span class="badge bg-success">Accepted</span>'
                    } else if (row['status'] == 1) {
                        return '<span class="badge bg-danger">Rejected</span>'
                    } else {
                        return '<span class="badge bg-warning">Process</span>'
                    }
                }
            }
        ]
    });

    checkLeaveInformation()
    LeaveStaticSet()
    function LeaveStaticSet() {
        var dateDefault = new Date();

        $.ajax({
            url: "/User/GetDataYearLeave/" + $("#nikHidden").val()
        }).done((result) => {
            var tolak = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var acc = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            console.log(result)
            $.each(result, function (key, val) {
                var dateStart = new Date(val.startDate)
                if (dateDefault.getFullYear() == dateStart.getFullYear()) {
                    if (dateStart.getMonth() == 0) {
                        if (val.status == 0) {
                            acc[0]++;
                        } else if (val.status == 1) {
                            tolak[0]++;
                        }
                    }
                    else if (dateStart.getMonth() == 1) {
                        if (val.status == 0) {
                            acc[1]++;
                        } else if (val.status == 1) {
                            tolak[1]++;
                        }
                    } else if (dateStart.getMonth() == 2) {
                        if (val.status == 0) {
                            acc[2]++;
                        } else if (val.status == 1){
                            tolak[2]++;
                        }
                    } else if (dateStart.getMonth() == 3) {
                        if (val.status == 0) {
                            acc[3]++;
                        } else if (val.status == 1) {
                            tolak[3]++;
                        }
                    } else if (dateStart.getMonth() == 4) {
                        if (val.status == 0) {
                            acc[4]++;
                        } else if (val.status == 1) {
                            tolak[4]++;
                        }
                    } else if (dateStart.getMonth() == 5) {
                        if (val.status == 0) {
                            acc[5]++;
                        } else if (val.status == 1) {
                            tolak[5]++;
                        }
                    } else if (dateStart.getMonth() == 6) {
                        if (val.status == 0) {
                            acc[6]++;
                        } else if (val.status == 1) {
                            tolak[6]++;
                        }
                    } else if (dateStart.getMonth() == 7) {
                        if (val.status == 0) {
                            acc[7]++;
                        } else if (val.status == 1) {
                            tolak[7]++;
                        }
                    } else if (dateStart.getMonth() == 8) {
                        if (val.status == 0) {
                            acc[8]++;
                        } else if (val.status == 1) {
                            tolak[8]++;
                        }
                    } else if (dateStart.getMonth() == 9) {
                        if (val.status == 0) {
                            acc[9]++;
                        } else if (val.status == 1) {
                            tolak[9]++;
                        }
                    } else if (dateStart.getMonth() == 10) {
                        if (val.status == 0) {
                            acc[10]++;
                        } else if (val.status == 1) {
                            tolak[10]++;
                        }
                    } else if (dateStart.getMonth() == 11) {
                        if (val.status == 0) {
                            acc[11]++;
                        } else if (val.status == 1) {
                            tolak[11]++;
                        }
                    }
                }
            })


            console.log(tolak)

            var options = {
                series: [{
                    name: 'Accepted',
                    data: acc
                }, {
                    name: 'Reject',
                    data: tolak
                }],
                chart: {
                    type: 'bar',
                    height: 350
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dec'],
                },
                yaxis: {
                    title: {
                        text: '%'
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val + "%"
                        }
                    }
                }
            };


            var chart = new ApexCharts(document.querySelector("#leavesss"), options);
            chart.render();
            
        })
      
    }
    PieChart()
    function PieChart() {
        $.ajax({
            url: "/User/GetDataStatusLeave/" + $("#nikHidden").val()
        }).done((result) => {
            var cuti = 0;
            var kerja = 0;
            $.each(result, function (key, val) {
                if (val.leaveStatus == 0) {
                    cuti++;
                } else {
                    kerja++;
                }
            })

            var options = {
                series: [cuti, kerja],
                labels: ['Leave', 'Work'],
                chart: {
                    type: 'donut',
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            };

            var chart = new ApexCharts(document.querySelector("#chart"), options);
            chart.render();

        })
       

    }
    function checkLeaveInformation() {
        $.ajax({
            url: "/User/GetAccountLEaveEmployee/" + $("#nikHidden").val(),
        }).done((result) => {
            console.log(result)
            var dateNow = new Date()
            $.each(result, function (key, val) {
                if (val.status == 2) {
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
                }
            })
        })
    }
    function random_rgba() {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return "#"+randomColor
    }

    function splitTGL(data) {
        let splitt = data.split("T");
        return splitt[0];
    }

    $.ajax({
        url: "/User/CheckLeave"
    }).done((result) => {
        console.log(result)
        var no = 0;
        var dateNow = new Date()
        var dateStart = 0;
        var dateEnd = 0;
        var status = 0;
        var length = result.length;
        for (t in result) {
            var dateCustomStart = new Date(result[t].startDate)
            var dateCustomEnd = new Date(result[t].endDate)
            if (no == 0) {
                var selisih = parseInt((dateNow - dateCustomEnd) / 86400000)
                if (dateNow <= dateCustomStart && dateNow <= dateCustomEnd && selisih <= 0) {
                    dateStart = 1;// Belum Mulai
                } else if (dateNow >= dateCustomStart && dateNow <= dateCustomEnd && selisih <= 0) {
                    dateStart = 2;// Mulai
                } else if (dateNow >= dateCustomStart && dateNow >= dateCustomEnd && selisih > 0) {
                    dateStart = 3;// Selesai
                }
            }
        }
        if (dateStart == 0) {
            $.ajax({
                url: "Account/Get/" + $("#nikHidden").val()
            }).done((hasil) => {
                console.log(hasil)
                if (hasil.leaveStatus == 1) {
                    $("#statusHome").html('<h6 class="text-success mb-0 ">Work</h6>');
                } else {
                    obj = new Object();
                    obj.NIK = hasil.nik;
                    obj.Password = hasil.password;
                    obj.LeaveStatus = 1;
                    obj.LeaveQuota = hasil.leaveQuota;
                    $.ajax({
                        url: "/Account/Put",
                        type: "PUT",
                        data: obj
                    }).done((hasilUpdate) => {
                        $("#statusHome").html('<h6 class="text-success mb-0 ">Work</h6>');
                    })
                }
            })
        }
        else if (dateStart == 1) {
               $.ajax({
                url: "Account/Get/" + $("#nikHidden").val()
            }).done((hasil) => {
                console.log(hasil)
                if (hasil.leaveStatus == 1) {
                    $("#statusHome").html('<h6 class="text-success mb-0 ">Work</h6>');
                } else {
                    obj = new Object();
                    obj.NIK = hasil.nik;
                    obj.Password = hasil.password;
                    obj.LeaveStatus = 1;
                    obj.LeaveQuota = hasil.leaveQuota;
                    $.ajax({
                        url: "/Account/Put",
                        type: "PUT",
                        data: obj
                    }).done((hasilUpdate) => {
                        $("#statusHome").html('<h6 class="text-success mb-0 ">Work</h6>');
                    })
                }
            })
        } else if (dateStart == 2) {
            $.ajax({
                url: "Account/Get/" + $("#nikHidden").val()
            }).done((hasil) => {
                console.log(hasil)
                if (hasil.leaveStatus == 0) {
                    $("#statusHome").html('<h6 class="text-success mb-0 ">Leave</h6>');
                } else {
                    obj = new Object();
                    obj.NIK = hasil.nik;
                    obj.Password = hasil.password;
                    obj.LeaveStatus = 0;
                    obj.LeaveQuota = hasil.leaveQuota;
                    $.ajax({
                        url: "/Account/Put",
                        type: "PUT",
                        data: obj
                    }).done((hasilUpdate) => {
                        $("#statusHome").html('<h6 class="text-success mb-0 ">Leave</h6>');
                    })
                }
            })
        } else if (dateStart == 3) {
            $.ajax({
                url: "Account/Get/" + $("#nikHidden").val()
            }).done((hasil) => {
                console.log(hasil)
                if (hasil.leaveStatus == 1) {
                    $("#statusHome").html('<h6 class="text-success mb-0 ">Work</h6>');
                } else {
                    obj = new Object();
                    obj.NIK = hasil.nik;
                    obj.Password = hasil.password;
                    obj.LeaveStatus = 1;
                    obj.LeaveQuota = hasil.leaveQuota;
                    $.ajax({
                        url: "/Account/Put",
                        type: "PUT",
                        data: obj
                    }).done((hasilUpdate) => {
                        $("#statusHome").html('<h6 class="text-success mb-0 ">Work</h6>');
                    })
                }
            })
        }
       
        //if (result.leaveStatus == 1) {
        //    $("#statusHome").html('<h6 class="text-success mb-0 ">Work</h6>');
        //} else {
        //    $("#statusHome").html('<h6 class="text-secondary mb-0 ">Leave</h6>');
        //}
    })

    setInterval(function () {  table.ajax.reload(null, false); }, 10000);
    
});
