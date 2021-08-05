//alertDOC
$("#alertDoc").hide()
$("#alertLeaveSuccess").hide()
//Submit
$("#submit").click(function () {
    if ($("#typeLeaveTemp").val() == "Normal Leave") {
        //let tempIdNormal = ["typeLeave", "tglawal", "tglakhir", "uploadFilee"]
        let tempIdNormal = ["typeLeave", "tglawal", "tglakhir"]
        console.log($("#tglakhir").val())
        countNOrmaly = 0;
        for (n in tempIdNormal) {
            //if (tempIdNormal[n] == "uploadFilee") {
            //    if ($("#uploadFilee").val() == "") {
            //        $("#alertDoc").show()
            //        countNOrmaly++;
            //    } else {
            //        $("#alertDoc").hide()
            //    }
            //} else
            if ($("#" + tempIdNormal[n]).val() == "") {
                $("#" + tempIdNormal[n]).addClass("is-invalid")
                countNOrmaly++;
            } else {
                $("#" + tempIdNormal[n]).removeClass("is-invalid")
            }
        }

            if (countNOrmaly == 0) {

                if ($("#uploadFilee").val() != "") {
                    var hddd = 0;
                    var fileUpload = $("#uploadFilee").get(0);

                    var files = document.getElementById("uploadFilee").files[0];

                    var data2 = new FormData();

                    data2.append("FileUpload", files);

                    $.ajax({
                        url: "/User/UploadFile",
                        type: "POST",
                        data: data2,
                        dataType: 'json',
                        contentType: false,
                        processData: false,
                    }).done((result) => {
                        if (result != null) {
                            $.ajax({
                                url: "/User/GetCalendar"
                            }).done((hasil2) => {
                                var tgl = new Date($("#tglawal").val());
                                var tgl2 = new Date($("#tglakhir").val());
                                var selisih = Math.abs(tgl - tgl2) / 86400000;
                                var d = tgl.getDate();
                                var m = tgl.getMonth() + 1;
                                console.log(m)
                                var y = tgl.getFullYear();
                                var count = 0;
                                var hariLibur = 0;
                                var z = 1;
                                for (var i = 0; i <= selisih; i++) {
                                    console.log(i + " PER " + selisih)
                                    if (m == 1) {
                                        var feb = hasil2.data.monthly.januari;
                                        if (d <= feb.daysCount) {
                                            var tgl3 = "";
                                            if (m < 10) {
                                                if (d < 10) {
                                                    tgl3 = y + "-0" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-0" + m + "-" + (d++);
                                                }
                                            } else {
                                                if (d < 10) {
                                                    tgl3 = y + "-" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-" + m + "-" + (d++);
                                                }
                                            }
                                            //var tgl3 = y + "-" + m + "-" + (d++);
                                            var date3 = new Date(tgl3);
                                            if (date3.getDay() != 6 && date3.getDay() != 0) {
                                                var holiday = hasil2.data.monthly.januari.holiday.data;
                                                var countHariLibur = 0;
                                                for (h in holiday) {
                                                    if (tgl3 == holiday[h].date) {
                                                        countHariLibur++;
                                                    }

                                                }
                                                if (countHariLibur == 0) {
                                                    count++;
                                                }
                                            }

                                        } else {
                                            console.log(++m)
                                            console.log(d = 1)
                                            //var tgl4 = y + "-" + m + "-" + (d++);
                                            var tgl3 = "";
                                            if (m < 10) {
                                                if (d < 10) {
                                                    tgl3 = y + "-0" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-0" + m + "-" + (d++);
                                                }
                                            } else {
                                                if (d < 10) {
                                                    tgl3 = y + "-" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-" + m + "-" + (d++);
                                                }
                                            }
                                            var date4 = new Date(tgl3);
                                            if (date4.getDay() != 6 && date4.getDay() != 0) {
                                                var holiday = hasil2.data.monthly.februari.holiday.data;
                                                var countHariLibur = 0;
                                                for (h in holiday) {
                                                    if (tgl3 == holiday[h].date) {
                                                        countHariLibur++;
                                                    }

                                                }
                                                if (countHariLibur == 0) {
                                                    count++;
                                                }
                                            }
                                        }
                                    }
                                    else if (m == 2) {
                                        var feb = hasil2.data.monthly.februari;
                                        if (d <= feb.daysCount) {
                                            var tgl3 = "";
                                            if (m < 10) {
                                                if (d < 10) {
                                                    tgl3 = y + "-0" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-0" + m + "-" + (d++);
                                                }
                                            } else {
                                                if (d < 10) {
                                                    tgl3 = y + "-" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-" + m + "-" + (d++);
                                                }
                                            }
                                            //var tgl3 = y + "-" + m + "-" + (d++);
                                            var date3 = new Date(tgl3);
                                            if (date3.getDay() != 6 && date3.getDay() != 0) {
                                                var holiday = hasil2.data.monthly.februari.holiday.data;
                                                var countHariLibur = 0;
                                                for (h in holiday) {
                                                    if (tgl3 == holiday[h].date) {
                                                        countHariLibur++;
                                                    }

                                                }
                                                if (countHariLibur == 0) {
                                                    count++;
                                                }
                                            }

                                        } else {
                                            console.log(++m)
                                            console.log(d = 1)
                                            //var tgl4 = y + "-" + m + "-" + (d++);
                                            var tgl3 = "";
                                            if (m < 10) {
                                                if (d < 10) {
                                                    tgl3 = y + "-0" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-0" + m + "-" + (d++);
                                                }
                                            } else {
                                                if (d < 10) {
                                                    tgl3 = y + "-" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-" + m + "-" + (d++);
                                                }
                                            }
                                            var date4 = new Date(tgl3);
                                            if (date4.getDay() != 6 && date4.getDay() != 0) {
                                                var holiday = hasil2.data.monthly.maret.holiday.data;
                                                var countHariLibur = 0;
                                                for (h in holiday) {
                                                    if (tgl3 == holiday[h].date) {
                                                        countHariLibur++;
                                                    }

                                                }
                                                if (countHariLibur == 0) {
                                                    count++;
                                                }
                                            }
                                        }
                                    }
                                    else if (m == 3) {
                                        var mart = hasil2.data.monthly.maret;
                                        if (d <= mart.daysCount) {
                                            //var tgl4 = y + "-" + m + "-" + (d++);
                                            var tgl3 = "";
                                            if (m < 10) {
                                                if (d < 10) {
                                                    tgl3 = y + "-0" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-0" + m + "-" + (d++);
                                                }
                                            } else {
                                                if (d < 10) {
                                                    tgl3 = y + "-" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-" + m + "-" + (d++);
                                                }
                                            }
                                            var date4 = new Date(tgl3);
                                            if (date4.getDay() != 6 && date4.getDay() != 0) {
                                                var holiday = hasil2.data.monthly.maret.holiday.data;
                                                var countHariLibur = 0;
                                                for (h in holiday) {
                                                    if (tgl3 == holiday[h].date) {
                                                        countHariLibur++;
                                                    }

                                                }
                                                if (countHariLibur == 0) {
                                                    count++;
                                                }
                                            }
                                        } else {
                                            console.log(++m)
                                            console.log(d = 1)
                                            var tgl3 = "";
                                            if (m < 10) {
                                                if (d < 10) {
                                                    tgl3 = y + "-0" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-0" + m + "-" + (d++);
                                                }
                                            } else {
                                                if (d < 10) {
                                                    tgl3 = y + "-" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-" + m + "-" + (d++);
                                                }
                                            }
                                            var date4 = new Date(tgl3);
                                            if (date4.getDay() != 6 && date4.getDay() != 0) {
                                                var holiday = hasil2.data.monthly.april.holiday.data;
                                                var countHariLibur = 0;
                                                for (h in holiday) {
                                                    if (tgl3 == holiday[h].date) {
                                                        countHariLibur++;
                                                    }

                                                }
                                                if (countHariLibur == 0) {
                                                    count++;
                                                }
                                            }
                                        }

                                    }
                                    else if (m == 4) {
                                        var mart = hasil2.data.monthly.april;
                                        if (d <= mart.daysCount) {
                                            //var tgl4 = y + "-" + m + "-" + (d++);
                                            var tgl3 = "";
                                            if (m < 10) {
                                                if (d < 10) {
                                                    tgl3 = y + "-0" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-0" + m + "-" + (d++);
                                                }
                                            } else {
                                                if (d < 10) {
                                                    tgl3 = y + "-" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-" + m + "-" + (d++);
                                                }
                                            }
                                            var date4 = new Date(tgl3);
                                            if (date4.getDay() != 6 && date4.getDay() != 0) {
                                                var holiday = hasil2.data.monthly.april.holiday.data;
                                                var countHariLibur = 0;
                                                for (h in holiday) {
                                                    if (tgl3 == holiday[h].date) {
                                                        countHariLibur++;
                                                    }

                                                }
                                                if (countHariLibur == 0) {
                                                    count++;
                                                }
                                            }
                                        } else {
                                            console.log(++m)
                                            console.log(d = 1)
                                            var tgl3 = "";
                                            if (m < 10) {
                                                if (d < 10) {
                                                    tgl3 = y + "-0" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-0" + m + "-" + (d++);
                                                }
                                            } else {
                                                if (d < 10) {
                                                    tgl3 = y + "-" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-" + m + "-" + (d++);
                                                }
                                            }
                                            var date4 = new Date(tgl3);
                                            if (date4.getDay() != 6 && date4.getDay() != 0) {
                                                var holiday = hasil2.data.monthly.mei.holiday.data;
                                                var countHariLibur = 0;
                                                for (h in holiday) {
                                                    if (tgl3 == holiday[h].date) {
                                                        countHariLibur++;
                                                    }

                                                }
                                                if (countHariLibur == 0) {
                                                    count++;
                                                }
                                            }
                                        }
                                    }
                                    else if (m == 5) {
                                        var mart = hasil2.data.monthly.mei;
                                        if (d <= mart.daysCount) {
                                            //var tgl4 = y + "-" + m + "-" + (d++);
                                            var tgl3 = "";
                                            if (m < 10) {
                                                if (d < 10) {
                                                    tgl3 = y + "-0" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-0" + m + "-" + (d++);
                                                }
                                            } else {
                                                if (d < 10) {
                                                    tgl3 = y + "-" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-" + m + "-" + (d++);
                                                }
                                            }
                                            var date4 = new Date(tgl3);
                                            if (date4.getDay() != 6 && date4.getDay() != 0) {
                                                var holiday = hasil2.data.monthly.mei.holiday.data;
                                                var countHariLibur = 0;
                                                for (h in holiday) {
                                                    if (tgl3 == holiday[h].date) {
                                                        countHariLibur++;
                                                    }

                                                }
                                                if (countHariLibur == 0) {
                                                    count++;
                                                }
                                            }
                                        } else {
                                            console.log(++m)
                                            console.log(d = 1)
                                            var tgl3 = "";
                                            if (m < 10) {
                                                if (d < 10) {
                                                    tgl3 = y + "-0" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-0" + m + "-" + (d++);
                                                }
                                            } else {
                                                if (d < 10) {
                                                    tgl3 = y + "-" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-" + m + "-" + (d++);
                                                }
                                            }
                                            var date4 = new Date(tgl3);
                                            if (date4.getDay() != 6 && date4.getDay() != 0) {
                                                var holiday = hasil2.data.monthly.juni.holiday.data;
                                                var countHariLibur = 0;
                                                for (h in holiday) {
                                                    if (tgl3 == holiday[h].date) {
                                                        countHariLibur++;
                                                    }

                                                }
                                                if (countHariLibur == 0) {
                                                    count++;
                                                }
                                            }
                                        }
                                    }
                                    else if (m == 6) {
                                        var mart = hasil2.data.monthly.juni;
                                        if (d <= mart.daysCount) {
                                            //var tgl4 = y + "-" + m + "-" + (d++);
                                            var tgl3 = "";
                                            if (m < 10) {
                                                if (d < 10) {
                                                    tgl3 = y + "-0" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-0" + m + "-" + (d++);
                                                }
                                            } else {
                                                if (d < 10) {
                                                    tgl3 = y + "-" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-" + m + "-" + (d++);
                                                }
                                            }
                                            var date4 = new Date(tgl3);
                                            if (date4.getDay() != 6 && date4.getDay() != 0) {
                                                var holiday = hasil2.data.monthly.juni.holiday.data;
                                                var countHariLibur = 0;
                                                for (h in holiday) {
                                                    if (tgl3 == holiday[h].date) {
                                                        countHariLibur++;
                                                    }

                                                }
                                                if (countHariLibur == 0) {
                                                    count++;
                                                }
                                            }
                                        } else {
                                            console.log(++m)
                                            console.log(d = 1)
                                            var tgl3 = "";
                                            if (m < 10) {
                                                if (d < 10) {
                                                    tgl3 = y + "-0" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-0" + m + "-" + (d++);
                                                }
                                            } else {
                                                if (d < 10) {
                                                    tgl3 = y + "-" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-" + m + "-" + (d++);
                                                }
                                            }
                                            var date4 = new Date(tgl3);
                                            if (date4.getDay() != 6 && date4.getDay() != 0) {
                                                var holiday = hasil2.data.monthly.juli.holiday.data;
                                                var countHariLibur = 0;
                                                for (h in holiday) {
                                                    if (tgl3 == holiday[h].date) {
                                                        countHariLibur++;
                                                    }

                                                }
                                                if (countHariLibur == 0) {
                                                    count++;
                                                }
                                            }
                                        }
                                    }
                                    else if (m == 7) {
                                        var mart = hasil2.data.monthly.juli;
                                        if (d <= mart.daysCount) {
                                            //var tgl4 = y + "-" + m + "-" + (d++);
                                            var tgl3 = "";
                                            if (m < 10) {
                                                if (d < 10) {
                                                    tgl3 = y + "-0" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-0" + m + "-" + (d++);
                                                }
                                            } else {
                                                if (d < 10) {
                                                    tgl3 = y + "-" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-" + m + "-" + (d++);
                                                }
                                            }
                                            var date4 = new Date(tgl3);
                                            if (date4.getDay() != 6 && date4.getDay() != 0) {
                                                var holiday = hasil2.data.monthly.juli.holiday.data;
                                                var countHariLibur = 0;
                                                for (h in holiday) {
                                                    if (tgl3 == holiday[h].date) {
                                                        countHariLibur++;
                                                    }

                                                }
                                                if (countHariLibur == 0) {
                                                    count++;
                                                }
                                            }
                                        } else {
                                            console.log(++m)
                                            console.log(d = 1)
                                            var tgl3 = "";
                                            if (m < 10) {
                                                if (d < 10) {
                                                    tgl3 = y + "-0" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-0" + m + "-" + (d++);
                                                }
                                            } else {
                                                if (d < 10) {
                                                    tgl3 = y + "-" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-" + m + "-" + (d++);
                                                }
                                            }
                                            var date4 = new Date(tgl3);
                                            if (date4.getDay() != 6 && date4.getDay() != 0) {
                                                var holiday = hasil2.data.monthly.agustus.holiday.data;
                                                var countHariLibur = 0;
                                                for (h in holiday) {
                                                    if (tgl3 == holiday[h].date) {
                                                        countHariLibur++;
                                                    }

                                                }
                                                if (countHariLibur == 0) {
                                                    count++;
                                                }
                                            }
                                        }
                                    }
                                    else if (m == 8) {
                                        var agustus = hasil2.data.monthly.agustus;
                                        if (d <= agustus.daysCount) {
                                            //var tgl4 = y + "-" + m + "-" + (d++);
                                            var tgl3 = "";
                                            if (m < 10) {
                                                if (d < 10) {
                                                    tgl3 = y + "-0" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-0" + m + "-" + (d++);
                                                }
                                            } else {
                                                if (d < 10) {
                                                    tgl3 = y + "-" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-" + m + "-" + (d++);
                                                }
                                            }
                                            var date4 = new Date(tgl3);
                                            if (date4.getDay() != 6 && date4.getDay() != 0) {
                                                var holiday = hasil2.data.monthly.agustus.holiday.data;
                                                var countHariLibur = 0;
                                                for (h in holiday) {
                                                    if (tgl3 == holiday[h].date) {
                                                        countHariLibur++;
                                                    }

                                                }
                                                if (countHariLibur == 0) {
                                                    count++;
                                                }
                                            }
                                        } else {
                                            console.log(++m)
                                            console.log(d = 1)
                                            var tgl3 = "";
                                            if (m < 10) {
                                                if (d < 10) {
                                                    tgl3 = y + "-0" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-0" + m + "-" + (d++);
                                                }
                                            } else {
                                                if (d < 10) {
                                                    tgl3 = y + "-" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-" + m + "-" + (d++);
                                                }
                                            }
                                            var date4 = new Date(tgl3);
                                            if (date4.getDay() != 6 && date4.getDay() != 0) {
                                                var holiday = hasil2.data.monthly.september.holiday.data;
                                                var countHariLibur = 0;
                                                for (h in holiday) {
                                                    if (tgl3 == holiday[h].date) {
                                                        countHariLibur++;
                                                    }
                                                }
                                                if (countHariLibur == 0) {
                                                    count++;
                                                }
                                            }
                                        }
                                    }
                                    else if (m == 9) {
                                        var mart = hasil2.data.monthly.september;
                                        if (d <= mart.daysCount) {
                                            //var tgl4 = y + "-" + m + "-" + (d++);
                                            var tgl3 = "";
                                            if (m < 10) {
                                                if (d < 10) {
                                                    tgl3 = y + "-0" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-0" + m + "-" + (d++);
                                                }
                                            } else {
                                                if (d < 10) {
                                                    tgl3 = y + "-" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-" + m + "-" + (d++);
                                                }
                                            }
                                            var date4 = new Date(tgl3);
                                            if (date4.getDay() != 6 && date4.getDay() != 0) {
                                                var holiday = hasil2.data.monthly.september.holiday.data;
                                                var countHariLibur = 0;
                                                for (h in holiday) {
                                                    if (tgl3 == holiday[h].date) {
                                                        countHariLibur++;
                                                    }
                                                }
                                                if (countHariLibur == 0) {
                                                    count++;
                                                }
                                            }
                                        } else {
                                            console.log(++m)
                                            console.log(d = 1)
                                            var tgl3 = "";
                                            if (m < 10) {
                                                if (d < 10) {
                                                    tgl3 = y + "-0" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-0" + m + "-" + (d++);
                                                }
                                            } else {
                                                if (d < 10) {
                                                    tgl3 = y + "-" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-" + m + "-" + (d++);
                                                }
                                            }
                                            var date4 = new Date(tgl3);
                                            if (date4.getDay() != 6 && date4.getDay() != 0) {
                                                var holiday = hasil2.data.monthly.oktober.holiday.data;
                                                var countHariLibur = 0;
                                                for (h in holiday) {
                                                    if (tgl3 == holiday[h].date) {
                                                        countHariLibur++;
                                                    }

                                                }
                                                if (countHariLibur == 0) {
                                                    count++;
                                                }
                                            }
                                        }
                                    }
                                    else if (m == 10) {
                                        var mart = hasil2.data.monthly.oktober;
                                        if (d <= mart.daysCount) {
                                            //var tgl4 = y + "-" + m + "-" + (d++);
                                            var tgl3 = "";
                                            if (m < 10) {
                                                if (d < 10) {
                                                    tgl3 = y + "-0" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-0" + m + "-" + (d++);
                                                }
                                            } else {
                                                if (d < 10) {
                                                    tgl3 = y + "-" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-" + m + "-" + (d++);
                                                }
                                            }
                                            var date4 = new Date(tgl3);
                                            if (date4.getDay() != 6 && date4.getDay() != 0) {
                                                var holiday = hasil2.data.monthly.oktober.holiday.data;
                                                var countHariLibur = 0;
                                                for (h in holiday) {
                                                    if (tgl3 == holiday[h].date) {
                                                        countHariLibur++;
                                                    }

                                                }
                                                if (countHariLibur == 0) {
                                                    count++;
                                                }
                                            }
                                        } else {
                                            console.log(++m)
                                            console.log(d = 1)
                                            var tgl3 = "";
                                            if (m < 10) {
                                                if (d < 10) {
                                                    tgl3 = y + "-0" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-0" + m + "-" + (d++);
                                                }
                                            } else {
                                                if (d < 10) {
                                                    tgl3 = y + "-" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-" + m + "-" + (d++);
                                                }
                                            }
                                            var date4 = new Date(tgl3);
                                            if (date4.getDay() != 6 && date4.getDay() != 0) {
                                                var holiday = hasil2.data.monthly.oktober.holiday.data;
                                                var countHariLibur = 0;
                                                for (h in holiday) {
                                                    if (tgl3 == holiday[h].date) {
                                                        countHariLibur++;
                                                    }

                                                }
                                                if (countHariLibur == 0) {
                                                    count++;
                                                }
                                            }
                                        }
                                    }
                                    else if (m == 11) {
                                        var mart = hasil2.data.monthly.november;
                                        if (d <= mart.daysCount) {
                                            //var tgl4 = y + "-" + m + "-" + (d++);
                                            var tgl3 = "";
                                            if (m < 10) {
                                                if (d < 10) {
                                                    tgl3 = y + "-0" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-0" + m + "-" + (d++);
                                                }
                                            } else {
                                                if (d < 10) {
                                                    tgl3 = y + "-" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-" + m + "-" + (d++);
                                                }
                                            }
                                            var date4 = new Date(tgl3);
                                            if (date4.getDay() != 6 && date4.getDay() != 0) {
                                                var holiday = hasil2.data.monthly.november.holiday.data;
                                                var countHariLibur = 0;
                                                for (h in holiday) {
                                                    if (tgl3 == holiday[h].date) {
                                                        countHariLibur++;
                                                    }

                                                }
                                                if (countHariLibur == 0) {
                                                    count++;
                                                }
                                            }
                                        } else {
                                            console.log(++m)
                                            console.log(d = 1)
                                            var tgl3 = "";
                                            if (m < 10) {
                                                if (d < 10) {
                                                    tgl3 = y + "-0" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-0" + m + "-" + (d++);
                                                }
                                            } else {
                                                if (d < 10) {
                                                    tgl3 = y + "-" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-" + m + "-" + (d++);
                                                }
                                            }
                                            var date4 = new Date(tgl3);
                                            if (date4.getDay() != 6 && date4.getDay() != 0) {
                                                var holiday = hasil2.data.monthly.desember.holiday.data;
                                                var countHariLibur = 0;
                                                for (h in holiday) {
                                                    if (tgl3 == holiday[h].date) {
                                                        countHariLibur++;
                                                    }

                                                }
                                                if (countHariLibur == 0) {
                                                    count++;
                                                }
                                            }
                                        }
                                    }
                                    else if (m == 12) {
                                        var mart = hasil2.data.monthly.desember;
                                        if (d <= mart.daysCount) {
                                            //var tgl4 = y + "-" + m + "-" + (d++);
                                            var tgl3 = "";
                                            if (m < 10) {
                                                if (d < 10) {
                                                    tgl3 = y + "-0" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-0" + m + "-" + (d++);
                                                }
                                            } else {
                                                if (d < 10) {
                                                    tgl3 = y + "-" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-" + m + "-" + (d++);
                                                }
                                            }
                                            var date4 = new Date(tgl3);
                                            if (date4.getDay() != 6 && date4.getDay() != 0) {
                                                var holiday = hasil2.data.monthly.desember.holiday.data;
                                                var countHariLibur = 0;
                                                for (h in holiday) {
                                                    if (tgl3 == holiday[h].date) {
                                                        countHariLibur++;
                                                    }

                                                }
                                                if (countHariLibur == 0) {
                                                    count++
                                                }
                                            }
                                        } else {
                                            console.log(m = 1)
                                            console.log(d = 1)
                                            console.log(++y)
                                            var tgl3 = "";
                                            if (m < 10) {
                                                if (d < 10) {
                                                    tgl3 = y + "-0" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-0" + m + "-" + (d++);
                                                }
                                            } else {
                                                if (d < 10) {
                                                    tgl3 = y + "-" + m + "-0" + (d++);
                                                } else {
                                                    tgl3 = y + "-" + m + "-" + (d++);
                                                }
                                            }
                                            var date4 = new Date(tgl3);
                                            if (date4.getDay() != 6 && date4.getDay() != 0) {
                                                var holiday = hasil2.data.monthly.januari.holiday.data;
                                                var countHariLibur = 0;
                                                for (h in holiday) {
                                                    if (tgl3 != holiday[h].date) {
                                                        countHariLibur++;
                                                    }

                                                }
                                                if (countHariLibur == 0) {
                                                    count++;
                                                }
                                            }
                                        }
                                    }
                                }

                                $.ajax({
                                    url: "/Account/Get/" + $("#nikHidden").val()
                                }).done((hasilAccount) => {
                                    var upAccount = new Object();
                                    upAccount.NIK = hasilAccount.nik;
                                    upAccount.Password = hasilAccount.password;
                                    upAccount.LeaveStatus = hasilAccount.leaveStatus;
                                    upAccount.LeaveQuota = (hasilAccount.leaveQuota - count);
                                    console.log(upAccount);
                                    $.ajax({
                                        url: "/Account/Put",
                                        type: "PUT",
                                        data: upAccount
                                    }).done((hasilUpdateAC) => {
                                        var object = new Object();
                                        object.StartDate = $("#tglawal").val()
                                        object.EndDate = $("#tglakhir").val()
                                        object.TotalDays = count
                                        object.Attachment = result
                                        object.Status = 2
                                        object.NIK = $("#nikHidden").val()
                                        object.LeaveId = parseInt($("#typeLeave").val())
                                        $.ajax({
                                            url: "/LeaveEmployee/Post",
                                            type: "POST",
                                            data: object
                                        }).done((berhasil) => {
                                            removeUpload();
                                            $("#typeLeave").val("");
                                            $(".tglawal").hide()
                                            $(".tglawal").val("")

                                            $(".tglawalTemp").show()
                                            //$(".tglakhir").hide()
                                            $(".tglakhir").val("")

                                            $('#alertLeaveSuccess').fadeIn("slow");
                                            setTimeout(function () {
                                                $('#alertLeaveSuccess').fadeOut("slow");
                                            }, 5000)
                                        }).fail((gagal) => {
                                            removeUpload();
                                            $("#typeLeave").val("");
                                            $(".tglawal").hide()
                                            $(".tglawal").val("")

                                            $(".tglakhir").hide()
                                            $(".tglakhir").val("")
                                            $(".tglawalTemp").show()

                                            $("#alertLeave").html(" Sorry, your leave request cannot be accepted!")
                                            $("#alertLeave").fadeIn("slow")
                                            setTimeout(function () {
                                                $('#alertLeave').fadeOut("slow");
                                            }, 5000)
                                        })

                                    })
                                })

                            }).fail((err) => {
                                console.log(err)
                            })

                        }
                    }).fail((error) => {
                        console.log("SALAH")
                    })
                } else {
                    $.ajax({
                        url: "/User/GetCalendar"
                    }).done((hasil2) => {
                        console.log(hasil2)
                        var tgl = new Date($("#tglawal").val());
                        var tgl2 = new Date($("#tglakhir").val());
                        var selisih = Math.abs(tgl - tgl2) / 86400000;
                        var d = tgl.getDate();
                        var m = tgl.getMonth() + 1;
                       
                        var y = tgl.getFullYear();
                        var count = 0;
                        var hariLibur = 0;
                        var z = 1;
                        for (var i = 0; i <= selisih; i++) {
                            console.log(i + " PER " + selisih)
                            if (m == 1) {
                                var feb = hasil2.data.monthly.januari;
                                if (d <= feb.daysCount) {
                                    var tgl3 = "";
                                    if (m < 10) {
                                        if (d < 10) {
                                            tgl3 = y + "-0" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-0" + m + "-" + (d++);
                                        }
                                    } else {
                                        if (d < 10) {
                                            tgl3 = y + "-" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-" + m + "-" + (d++);
                                        }
                                    }
                                    //var tgl3 = y + "-" + m + "-" + (d++);
                                    var date3 = new Date(tgl3);
                                    if (date3.getDay() != 6 && date3.getDay() != 0) {
                                        var holiday = hasil2.data.monthly.januari.holiday.data;
                                        var countHariLibur = 0;
                                        for (h in holiday) {
                                            if (tgl3 == holiday[h].date) {
                                                countHariLibur++;
                                            }

                                        }
                                        if (countHariLibur == 0) {
                                            count++;
                                        }
                                    }

                                } else {
                                    console.log(++m)
                                    console.log(d = 1)
                                    //var tgl4 = y + "-" + m + "-" + (d++);
                                    var tgl3 = "";
                                    if (m < 10) {
                                        if (d < 10) {
                                            tgl3 = y + "-0" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-0" + m + "-" + (d++);
                                        }
                                    } else {
                                        if (d < 10) {
                                            tgl3 = y + "-" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-" + m + "-" + (d++);
                                        }
                                    }
                                    var date4 = new Date(tgl3);
                                    if (date4.getDay() != 6 && date4.getDay() != 0) {
                                        var holiday = hasil2.data.monthly.februari.holiday.data;
                                        var countHariLibur = 0;
                                        for (h in holiday) {
                                            if (tgl3 == holiday[h].date) {
                                                countHariLibur++;
                                            }

                                        }
                                        if (countHariLibur == 0) {
                                            count++;
                                        }
                                    }
                                }
                            }
                            else  if (m == 2) {
                                var feb = hasil2.data.monthly.februari;
                                if (d <= feb.daysCount) {
                                    var tgl3 = "";
                                    if (m < 10) {
                                        if (d < 10) {
                                            tgl3 = y + "-0" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-0" + m + "-" + (d++);
                                        }
                                    } else {
                                        if (d < 10) {
                                            tgl3 = y + "-" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-" + m + "-" + (d++);
                                        }
                                    }
                                    //var tgl3 = y + "-" + m + "-" + (d++);
                                    var date3 = new Date(tgl3);
                                    if (date3.getDay() != 6 && date3.getDay() != 0) {
                                        var holiday = hasil2.data.monthly.februari.holiday.data;
                                        var countHariLibur = 0;
                                        for (h in holiday) {
                                            if (tgl3 == holiday[h].date) {
                                                countHariLibur++;
                                            }

                                        }
                                        if (countHariLibur == 0) {
                                            count++;
                                        }
                                    }

                                } else {
                                    console.log(++m)
                                    console.log(d = 1)
                                    //var tgl4 = y + "-" + m + "-" + (d++);
                                    var tgl3 = "";
                                    if (m < 10) {
                                        if (d < 10) {
                                            tgl3 = y + "-0" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-0" + m + "-" + (d++);
                                        }
                                    } else {
                                        if (d < 10) {
                                            tgl3 = y + "-" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-" + m + "-" + (d++);
                                        }
                                    }
                                    var date4 = new Date(tgl3);
                                    if (date4.getDay() != 6 && date4.getDay() != 0) {
                                        var holiday = hasil2.data.monthly.maret.holiday.data;
                                        var countHariLibur = 0;
                                        for (h in holiday) {
                                            if (tgl3 == holiday[h].date) {
                                                countHariLibur++;
                                            }

                                        }
                                        if (countHariLibur == 0) {
                                            count++;
                                        }
                                    }
                                }
                            }
                            else  if (m == 3) {
                                var mart = hasil2.data.monthly.maret;
                                if (d <= mart.daysCount) {
                                    //var tgl4 = y + "-" + m + "-" + (d++);
                                    var tgl3 = "";
                                    if (m < 10) {
                                        if (d < 10) {
                                            tgl3 = y + "-0" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-0" + m + "-" + (d++);
                                        }
                                    } else {
                                        if (d < 10) {
                                            tgl3 = y + "-" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-" + m + "-" + (d++);
                                        }
                                    }
                                    var date4 = new Date(tgl3);
                                    if (date4.getDay() != 6 && date4.getDay() != 0) {
                                        var holiday = hasil2.data.monthly.maret.holiday.data;
                                        var countHariLibur = 0;
                                        for (h in holiday) {
                                            if (tgl3 == holiday[h].date) {
                                                countHariLibur++;
                                            }

                                        }
                                        if (countHariLibur == 0) {
                                            count++;
                                        }
                                    }
                                } else {
                                    console.log(++m)
                                    console.log(d = 1)
                                    var tgl3 = "";
                                    if (m < 10) {
                                        if (d < 10) {
                                            tgl3 = y + "-0" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-0" + m + "-" + (d++);
                                        }
                                    } else {
                                        if (d < 10) {
                                            tgl3 = y + "-" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-" + m + "-" + (d++);
                                        }
                                    }
                                    var date4 = new Date(tgl3);
                                    if (date4.getDay() != 6 && date4.getDay() != 0) {
                                        var holiday = hasil2.data.monthly.april.holiday.data;
                                        var countHariLibur = 0;
                                        for (h in holiday) {
                                            if (tgl3 == holiday[h].date) {
                                                countHariLibur++;
                                            }

                                        }
                                        if (countHariLibur == 0) {
                                            count++;
                                        }
                                    }
                                }

                            }
                             else if (m == 4) {
                                var mart = hasil2.data.monthly.april;
                                if (d <= mart.daysCount) {
                                    //var tgl4 = y + "-" + m + "-" + (d++);
                                    var tgl3 = "";
                                    if (m < 10) {
                                        if (d < 10) {
                                            tgl3 = y + "-0" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-0" + m + "-" + (d++);
                                        }
                                    } else {
                                        if (d < 10) {
                                            tgl3 = y + "-" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-" + m + "-" + (d++);
                                        }
                                    }
                                    var date4 = new Date(tgl3);
                                    if (date4.getDay() != 6 && date4.getDay() != 0) {
                                        var holiday = hasil2.data.monthly.april.holiday.data;
                                        var countHariLibur = 0;
                                        for (h in holiday) {
                                            if (tgl3 == holiday[h].date) {
                                                countHariLibur++;
                                            }

                                        }
                                        if (countHariLibur == 0) {
                                            count++;
                                        }
                                    }
                                } else {
                                    console.log(++m)
                                    console.log(d = 1)
                                    var tgl3 = "";
                                    if (m < 10) {
                                        if (d < 10) {
                                            tgl3 = y + "-0" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-0" + m + "-" + (d++);
                                        }
                                    } else {
                                        if (d < 10) {
                                            tgl3 = y + "-" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-" + m + "-" + (d++);
                                        }
                                    }
                                    var date4 = new Date(tgl3);
                                    if (date4.getDay() != 6 && date4.getDay() != 0) {
                                        var holiday = hasil2.data.monthly.mei.holiday.data;
                                        var countHariLibur = 0;
                                        for (h in holiday) {
                                            if (tgl3 == holiday[h].date) {
                                                countHariLibur++;
                                            }

                                        }
                                        if (countHariLibur == 0) {
                                            count++;
                                        }
                                    }
                                }
                            }
                             else if (m == 5) {
                                var mart = hasil2.data.monthly.mei;
                                if (d <= mart.daysCount) {
                                    //var tgl4 = y + "-" + m + "-" + (d++);
                                    var tgl3 = "";
                                    if (m < 10) {
                                        if (d < 10) {
                                            tgl3 = y + "-0" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-0" + m + "-" + (d++);
                                        }
                                    } else {
                                        if (d < 10) {
                                            tgl3 = y + "-" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-" + m + "-" + (d++);
                                        }
                                    }
                                    var date4 = new Date(tgl3);
                                    if (date4.getDay() != 6 && date4.getDay() != 0) {
                                        var holiday = hasil2.data.monthly.mei.holiday.data;
                                        var countHariLibur = 0;
                                        for (h in holiday) {
                                            if (tgl3 == holiday[h].date) {
                                                countHariLibur++;
                                            }

                                        }
                                        if (countHariLibur == 0) {
                                            count++;
                                        }
                                    }
                                } else {
                                    console.log(++m)
                                    console.log(d = 1)
                                    var tgl3 = "";
                                    if (m < 10) {
                                        if (d < 10) {
                                            tgl3 = y + "-0" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-0" + m + "-" + (d++);
                                        }
                                    } else {
                                        if (d < 10) {
                                            tgl3 = y + "-" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-" + m + "-" + (d++);
                                        }
                                    }
                                    var date4 = new Date(tgl3);
                                    if (date4.getDay() != 6 && date4.getDay() != 0) {
                                        var holiday = hasil2.data.monthly.juni.holiday.data;
                                        var countHariLibur = 0;
                                        for (h in holiday) {
                                            if (tgl3 == holiday[h].date) {
                                                countHariLibur++;
                                            }

                                        }
                                        if (countHariLibur == 0) {
                                            count++;
                                        }
                                    }
                                }
                            }
                             else if (m == 6) {
                                var mart = hasil2.data.monthly.juni;
                                if (d <= mart.daysCount) {
                                    //var tgl4 = y + "-" + m + "-" + (d++);
                                    var tgl3 = "";
                                    if (m < 10) {
                                        if (d < 10) {
                                            tgl3 = y + "-0" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-0" + m + "-" + (d++);
                                        }
                                    } else {
                                        if (d < 10) {
                                            tgl3 = y + "-" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-" + m + "-" + (d++);
                                        }
                                    }
                                    var date4 = new Date(tgl3);
                                    if (date4.getDay() != 6 && date4.getDay() != 0) {
                                        var holiday = hasil2.data.monthly.juni.holiday.data;
                                        var countHariLibur = 0;
                                        for (h in holiday) {
                                            if (tgl3 == holiday[h].date) {
                                                countHariLibur++;
                                            }

                                        }
                                        if (countHariLibur == 0) {
                                            count++;
                                        }
                                    }
                                } else {
                                    console.log(++m)
                                    console.log(d = 1)
                                    var tgl3 = "";
                                    if (m < 10) {
                                        if (d < 10) {
                                            tgl3 = y + "-0" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-0" + m + "-" + (d++);
                                        }
                                    } else {
                                        if (d < 10) {
                                            tgl3 = y + "-" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-" + m + "-" + (d++);
                                        }
                                    }
                                    var date4 = new Date(tgl3);
                                    if (date4.getDay() != 6 && date4.getDay() != 0) {
                                        var holiday = hasil2.data.monthly.juli.holiday.data;
                                        var countHariLibur = 0;
                                        for (h in holiday) {
                                            if (tgl3 == holiday[h].date) {
                                                countHariLibur++;
                                            }

                                        }
                                        if (countHariLibur == 0) {
                                            count++;
                                        }
                                    }
                                }
                            }
                             else  if (m == 7) {
                                var mart = hasil2.data.monthly.juli;
                                if (d <= mart.daysCount) {
                                    //var tgl4 = y + "-" + m + "-" + (d++);
                                    var tgl3 = "";
                                    if (m < 10) {
                                        if (d < 10) {
                                            tgl3 = y + "-0" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-0" + m + "-" + (d++);
                                        }
                                    } else {
                                        if (d < 10) {
                                            tgl3 = y + "-" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-" + m + "-" + (d++);
                                        }
                                    }
                                    var date4 = new Date(tgl3);
                                    if (date4.getDay() != 6 && date4.getDay() != 0) {
                                        var holiday = hasil2.data.monthly.juli.holiday.data;
                                        var countHariLibur = 0;
                                        for (h in holiday) {
                                            if (tgl3 == holiday[h].date) {
                                                countHariLibur++;
                                            }

                                        }
                                        if (countHariLibur == 0) {
                                            count++;
                                        }
                                    }
                                } else {
                                    console.log(++m)
                                    console.log(d = 1)
                                    var tgl3 = "";
                                    if (m < 10) {
                                        if (d < 10) {
                                            tgl3 = y + "-0" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-0" + m + "-" + (d++);
                                        }
                                    } else {
                                        if (d < 10) {
                                            tgl3 = y + "-" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-" + m + "-" + (d++);
                                        }
                                    }
                                    var date4 = new Date(tgl3);
                                    if (date4.getDay() != 6 && date4.getDay() != 0) {
                                        var holiday = hasil2.data.monthly.agustus.holiday.data;
                                        var countHariLibur = 0;
                                        for (h in holiday) {
                                            if (tgl3 == holiday[h].date) {
                                                countHariLibur++;
                                            }

                                        }
                                        if (countHariLibur == 0) {
                                            count++;
                                        }
                                    }
                                }
                            }
                             else  if (m == 8) {
                                var agustus = hasil2.data.monthly.agustus;
                                if (d <= agustus.daysCount) {
                                    //var tgl4 = y + "-" + m + "-" + (d++);
                                    var tgl3 = "";
                                    if (m < 10) {
                                        if (d < 10) {
                                            tgl3 = y + "-0" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-0" + m + "-" + (d++);
                                        }
                                    } else {
                                        if (d < 10) {
                                            tgl3 = y + "-" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-" + m + "-" + (d++);
                                        }
                                    }
                                    var date4 = new Date(tgl3);
                                    if (date4.getDay() != 6 && date4.getDay() != 0) {
                                        var holiday = hasil2.data.monthly.agustus.holiday.data;
                                        var countHariLibur = 0;
                                        for (h in holiday) {
                                            if (tgl3 == holiday[h].date) {
                                                countHariLibur++;
                                            }

                                        }
                                        if (countHariLibur == 0) {
                                            count++;
                                        }
                                    }
                                } else {
                                    console.log(++m)
                                    console.log(d = 1)
                                    var tgl3 = "";
                                    if (m < 10) {
                                        if (d < 10) {
                                            tgl3 = y + "-0" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-0" + m + "-" + (d++);
                                        }
                                    } else {
                                        if (d < 10) {
                                            tgl3 = y + "-" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-" + m + "-" + (d++);
                                        }
                                    }
                                    var date4 = new Date(tgl3);
                                    if (date4.getDay() != 6 && date4.getDay() != 0) {
                                        var holiday = hasil2.data.monthly.september.holiday.data;
                                        var countHariLibur = 0;
                                        for (h in holiday) {
                                            if (tgl3 == holiday[h].date) {
                                                countHariLibur++;
                                            }
                                        }
                                        if (countHariLibur == 0) {
                                            count++;
                                        }
                                    }
                                }
                            }
                           else if (m == 9) {
                                var mart = hasil2.data.monthly.september;
                                if (d <= mart.daysCount) {
                                    //var tgl4 = y + "-" + m + "-" + (d++);
                                    var tgl3 = "";
                                    if (m < 10) {
                                        if (d < 10) {
                                            tgl3 = y + "-0" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-0" + m + "-" + (d++);
                                        }
                                    } else {
                                        if (d < 10) {
                                            tgl3 = y + "-" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-" + m + "-" + (d++);
                                        }
                                    }
                                    var date4 = new Date(tgl3);
                                    if (date4.getDay() != 6 && date4.getDay() != 0) {
                                        var holiday = hasil2.data.monthly.september.holiday.data;
                                        var countHariLibur = 0;
                                        for (h in holiday) {
                                            if (tgl3 == holiday[h].date) {
                                                countHariLibur++;
                                            }
                                        }
                                        if (countHariLibur == 0) {
                                            count++;
                                        }
                                    }
                                } else {
                                    console.log(++m)
                                    console.log(d = 1)
                                    var tgl3 = "";
                                    if (m < 10) {
                                        if (d < 10) {
                                            tgl3 = y + "-0" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-0" + m + "-" + (d++);
                                        }
                                    } else {
                                        if (d < 10) {
                                            tgl3 = y + "-" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-" + m + "-" + (d++);
                                        }
                                    }
                                    var date4 = new Date(tgl3);
                                    if (date4.getDay() != 6 && date4.getDay() != 0) {
                                        var holiday = hasil2.data.monthly.oktober.holiday.data;
                                        var countHariLibur = 0;
                                        for (h in holiday) {
                                            if (tgl3 == holiday[h].date) {
                                                countHariLibur++;
                                            }

                                        }
                                        if (countHariLibur == 0) {
                                            count++;
                                        }
                                    }
                                }
                            }
                            else  if (m == 10) {
                                var mart = hasil2.data.monthly.oktober;
                                if (d <= mart.daysCount) {
                                    //var tgl4 = y + "-" + m + "-" + (d++);
                                    var tgl3 = "";
                                    if (m < 10) {
                                        if (d < 10) {
                                            tgl3 = y + "-0" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-0" + m + "-" + (d++);
                                        }
                                    } else {
                                        if (d < 10) {
                                            tgl3 = y + "-" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-" + m + "-" + (d++);
                                        }
                                    }
                                    var date4 = new Date(tgl3);
                                    if (date4.getDay() != 6 && date4.getDay() != 0) {
                                        var holiday = hasil2.data.monthly.oktober.holiday.data;
                                        var countHariLibur = 0;
                                        for (h in holiday) {
                                            if (tgl3 == holiday[h].date) {
                                                countHariLibur++;
                                            }

                                        }
                                        if (countHariLibur == 0) {
                                            count++;
                                        }
                                    }
                                } else {
                                    console.log(++m)
                                    console.log(d = 1)
                                    var tgl3 = "";
                                    if (m < 10) {
                                        if (d < 10) {
                                            tgl3 = y + "-0" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-0" + m + "-" + (d++);
                                        }
                                    } else {
                                        if (d < 10) {
                                            tgl3 = y + "-" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-" + m + "-" + (d++);
                                        }
                                    }
                                    var date4 = new Date(tgl3);
                                    if (date4.getDay() != 6 && date4.getDay() != 0) {
                                        var holiday = hasil2.data.monthly.oktober.holiday.data;
                                        var countHariLibur = 0;
                                        for (h in holiday) {
                                            if (tgl3 == holiday[h].date) {
                                                countHariLibur++;
                                            }

                                        }
                                        if (countHariLibur == 0) {
                                            count++;
                                        }
                                    }
                                }
                            }
                            else  if (m == 11) {
                                var mart = hasil2.data.monthly.november;
                                if (d <= mart.daysCount) {
                                    //var tgl4 = y + "-" + m + "-" + (d++);
                                    var tgl3 = "";
                                    if (m < 10) {
                                        if (d < 10) {
                                            tgl3 = y + "-0" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-0" + m + "-" + (d++);
                                        }
                                    } else {
                                        if (d < 10) {
                                            tgl3 = y + "-" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-" + m + "-" + (d++);
                                        }
                                    }
                                    var date4 = new Date(tgl3);
                                    if (date4.getDay() != 6 && date4.getDay() != 0) {
                                        var holiday = hasil2.data.monthly.november.holiday.data;
                                        var countHariLibur = 0;
                                        for (h in holiday) {
                                            if (tgl3 == holiday[h].date) {
                                                countHariLibur++;
                                            }

                                        }
                                        if (countHariLibur == 0) {
                                            count++;
                                        }
                                    }
                                } else {
                                    console.log(++m)
                                    console.log(d = 1)
                                    var tgl3 = "";
                                    if (m < 10) {
                                        if (d < 10) {
                                            tgl3 = y + "-0" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-0" + m + "-" + (d++);
                                        }
                                    } else {
                                        if (d < 10) {
                                            tgl3 = y + "-" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-" + m + "-" + (d++);
                                        }
                                    }
                                    var date4 = new Date(tgl3);
                                    if (date4.getDay() != 6 && date4.getDay() != 0) {
                                        var holiday = hasil2.data.monthly.desember.holiday.data;
                                        var countHariLibur = 0;
                                        for (h in holiday) {
                                            if (tgl3 == holiday[h].date) {
                                                countHariLibur++;
                                            }

                                        }
                                        if (countHariLibur == 0) {
                                            count++;
                                        }
                                    }
                                }
                            }
                            else if (m == 12) {
                                var mart = hasil2.data.monthly.desember;
                                if (d <= mart.daysCount) {
                                    //var tgl4 = y + "-" + m + "-" + (d++);
                                    var tgl3 = "";
                                    if (m < 10) {
                                        if (d < 10) {
                                            tgl3 = y + "-0" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-0" + m + "-" + (d++);
                                        }
                                    } else {
                                        if (d < 10) {
                                            tgl3 = y + "-" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-" + m + "-" + (d++);
                                        }
                                    }
                                    var date4 = new Date(tgl3);
                                    if (date4.getDay() != 6 && date4.getDay() != 0) {
                                        var holiday = hasil2.data.monthly.desember.holiday.data;
                                        var countHariLibur = 0;
                                        for (h in holiday) {
                                            if (tgl3 == holiday[h].date) {
                                                countHariLibur++;
                                            }

                                        }
                                        if (countHariLibur == 0) {
                                            count++
                                        }
                                    }
                                } else {
                                    console.log(m = 1)
                                    console.log(d = 1)
                                    console.log(++y)
                                    var tgl3 = "";
                                    if (m < 10) {
                                        if (d < 10) {
                                            tgl3 = y + "-0" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-0" + m + "-" + (d++);
                                        }
                                    } else {
                                        if (d < 10) {
                                            tgl3 = y + "-" + m + "-0" + (d++);
                                        } else {
                                            tgl3 = y + "-" + m + "-" + (d++);
                                        }
                                    }
                                    var date4 = new Date(tgl3);
                                    if (date4.getDay() != 6 && date4.getDay() != 0) {
                                        var holiday = hasil2.data.monthly.januari.holiday.data;
                                        var countHariLibur = 0;
                                        for (h in holiday) {
                                            if (tgl3 != holiday[h].date) {
                                                countHariLibur++;
                                            }

                                        }
                                        if (countHariLibur == 0) {
                                            count++;
                                        }
                                    }
                                }
                            }
                        }
                        console.log(count)
                        $.ajax({
                            url: "/Account/Get/" + $("#nikHidden").val()
                        }).done((hasilAccount) => {
                            var upAccount = new Object();
                            upAccount.NIK = hasilAccount.nik;
                            upAccount.Password = hasilAccount.password;
                            upAccount.LeaveStatus = hasilAccount.leaveStatus;
                            upAccount.LeaveQuota = (hasilAccount.leaveQuota - count);
                            
                            $.ajax({
                                url: "/Account/Put",
                                type: "PUT",
                                data: upAccount
                            }).done((hasilUpdateAC) => {
                                var object = new Object();
                                object.StartDate = $("#tglawal").val()
                                object.EndDate = $("#tglakhir").val()
                                object.TotalDays = count
                                object.Attachment = null
                                object.Status = 2
                                object.NIK = $("#nikHidden").val()
                                object.LeaveId = parseInt($("#typeLeave").val())
                                $.ajax({
                                    url: "/LeaveEmployee/Post",
                                    type: "POST",
                                    data: object
                                }).done((berhasil) => {
                                    removeUpload();
                                    $("#typeLeave").val("");
                                    $(".tglawal").hide()
                                    $(".tglawal").val("")

                                    $(".tglawalTemp").show()
                                    //$(".tglakhir").hide()
                                    $(".tglakhir").val("")

                                    $('#alertLeaveSuccess').fadeIn("slow");
                                    setTimeout(function () {
                                        $('#alertLeaveSuccess').fadeOut("slow");
                                    }, 5000)
                                }).fail((gagal) => {
                                    removeUpload();
                                    $("#typeLeave").val("");
                                    $(".tglawal").hide()
                                    $(".tglawal").val("")

                                    $(".tglakhir").hide()
                                    $(".tglakhir").val("")
                                    $(".tglawalTemp").show()

                                    $("#alertLeave").html(" Sorry, your leave request cannot be accepted!")
                                    $("#alertLeave").fadeIn("slow")
                                    setTimeout(function () {
                                        $('#alertLeave').fadeOut("slow");
                                    }, 5000)
                                })

                            })
                        })

                    }).fail((err) => {
                        console.log(err)
                    })
                }

               
            }
        
    } else if ($("#typeLeaveTemp").val() == "Special Leave") {
        //let tempIdSpecial = ["typeLeave", "tglawal", "tglakhirTemp", "uploadFilee"]
        let tempIdSpecial = ["typeLeave", "tglawal", "tglakhirTemp"]
        countSpecial = 0;
        for (t in tempIdSpecial) {
            //if (tempIdSpecial[t] == "uploadFilee") {
            //    if ($("#uploadFilee").val() == "") {
            //        $("#alertDoc").show()
            //        countSpecial++;
            //    } else {
            //        $("#alertDoc").hide()
            //    }
            //}
            //else
           if ($("#" + tempIdSpecial[t]).val() == "") {
                $("#" + tempIdSpecial[t]).addClass("is-invalid")
                countSpecial++;
            } else {
                $("#" + tempIdSpecial[t]).removeClass("is-invalid")
            }
        }
        if (countSpecial == 0) {
            //var objSpecial = new Object();
            //objSpecial.StartDate = $("#tglawal").val();
            //objSpecial.EndDate = $("#tglakhirTemp").val();
            //objSpecial.TotalDays = $("#quotaLeave").val();
            //objSpecial.Attachment = $("#quotaLeave").val();

            if ($("#uploadFilee").val() != "") {
                var fileUpload = $("#uploadFilee").get(0);

                var files = document.getElementById("uploadFilee").files[0];

                var data = new FormData();

                data.append("FileUpload", files);

                $.ajax({
                    url: "/User/UploadFile",
                    type: "POST",
                    data: data,
                    dataType: 'json',
                    contentType: false,
                    processData: false,
                }).done((result) => {
                    if (result != null) {

                        var object = new Object();
                        object.StartDate = $("#tglawal").val()
                        object.EndDate = $("#tglakhirTemp").val()
                        object.TotalDays = parseInt($("#quotaLeave").val())
                        object.Attachment = result
                        object.Status = 2
                        object.NIK = $("#nikHidden").val()
                        object.LeaveId = parseInt($("#typeLeave").val())
                        $.ajax({
                            url: "/LeaveEmployee/Post",
                            type: "POST",
                            data: object
                        }).done((hasil) => {
                            removeUpload();
                            $("#typeLeave").val("");
                            $(".tglawal").hide()
                            $(".tglawal").val("")
                            $(".tglawalTemp").show()

                            $(".tglakhir").hide()
                            $(".tglakhirTemp").val("")

                            $('#alertLeaveSuccess').fadeIn("slow");
                            setTimeout(function () {
                                $('#alertLeaveSuccess').fadeOut("slow");
                            }, 5000)
                        }).fail((gagal) => {
                            removeUpload();
                            $("#typeLeave").val("");
                            $(".tglawal").hide()
                            $(".tglawal").val("")
                            $(".tglawalTemp").show()

                            $(".tglakhir").hide()
                            $(".tglakhirTemp").val("")

                            $("#alertLeave").html(" Sorry, your leave request cannot be accepted!")
                            $("#alertLeave").fadeIn("slow")
                            setTimeout(function () {
                                $('#alertLeave').fadeOut("slow");
                            }, 5000)
                        })



                    }
                }).fail((error) => {
                    console.log(error)
                })
            } else {

                var object = new Object();
                object.StartDate = $("#tglawal").val()
                object.EndDate = $("#tglakhirTemp").val()
                object.TotalDays = parseInt($("#quotaLeave").val())
                object.Attachment = null
                object.Status = 2
                object.NIK = $("#nikHidden").val()
                object.LeaveId = parseInt($("#typeLeave").val())
                $.ajax({
                    url: "/LeaveEmployee/Post",
                    type: "POST",
                    data: object
                }).done((hasil) => {
                    removeUpload();
                    $("#typeLeave").val("");
                    $(".tglawal").hide()
                    $(".tglawal").val("")
                    $(".tglawalTemp").show()

                    $(".tglakhir").hide()
                    $(".tglakhirTemp").val("")

                    $('#alertLeaveSuccess').fadeIn("slow");
                    setTimeout(function () {
                        $('#alertLeaveSuccess').fadeOut("slow");
                    }, 5000)
                }).fail((gagal) => {
                    removeUpload();
                    $("#typeLeave").val("");
                    $(".tglawal").hide()
                    $(".tglawal").val("")
                    $(".tglawalTemp").show()

                    $(".tglakhir").hide()
                    $(".tglakhirTemp").val("")

                    $("#alertLeave").html(" Sorry, your leave request cannot be accepted!")
                    $("#alertLeave").fadeIn("slow")
                    setTimeout(function () {
                        $('#alertLeave').fadeOut("slow");
                    }, 5000)
                })

            }


        }
    } else {
        $("#typeLeave").addClass("is-invalid")
    }
})


//Load Type Leave
loadLeave();
function loadLeave() {
    $.ajax({
        url: "/Leave/GetAll"
    }).done((result) => {
        let temp = '<option value="">Choose leave...</option>';
        $.ajax({
            url: "/Employee/Get/" + $('#nikHidden').val()
        }).done((hasil) => {
            $.each(result, function (key, val) {

                if (val.leaveName == "Maternity Leave") {
                    console.log("a")
                    if (hasil.gender == 1) {
                        temp += `<option value="${val.leaveId}">${val.leaveName}</option>`
                    }
                } else if (val.leaveName == "Hajj Leave") {
                    if (hasil.religion == 0) {
                        temp += `<option value="${val.leaveId}">${val.leaveName}</option>`
                    }
                } else {
                    temp += `<option value="${val.leaveId}">${val.leaveName}</option>`
                }
            })
            $("#typeLeave").html(temp);
        })
       
       
        
    })
}
checkLeave()
///Cek Cuti
function checkLeave() {
    $.ajax({
        url: "/User/CheckLeave"
    }).done((result) => {
        var no = 0;
        var dateNow = new Date()
        var dateStart = 0;
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
            document.getElementById("uploadFilee").removeAttribute("disabled");
            document.getElementById("typeLeave").removeAttribute("disabled");
            document.getElementById("submit").removeAttribute("disabled");
            $("#alertLeave").fadeOut("slow")
        }
        else if (dateStart == 1) {
            $(".tglawal").hide()
            $(".tglawalTemp").show()

            $(".tglakhir").hide()
            $(".tglakhirTemp").show()


            document.getElementById("uploadFilee").setAttribute("disabled", "disabled");
            document.getElementById("typeLeave").setAttribute("disabled", "disabled");
            document.getElementById("submit").setAttribute("disabled", "disabled");
            $("#alertLeave").html("Sorry, you are currently on leave, can't apply for leave again!")
            $("#alertLeave").fadeIn("slow")
        } else if (dateStart == 2) {
            $(".tglawal").hide()
            $(".tglawalTemp").show()

            $(".tglakhir").hide()
            $(".tglakhirTemp").show()


            document.getElementById("uploadFilee").setAttribute("disabled", "disabled");
            document.getElementById("typeLeave").setAttribute("disabled", "disabled");
            document.getElementById("submit").setAttribute("disabled", "disabled");
            $("#alertLeave").html("Sorry, you are currently on leave, can't apply for leave again!")
            $("#alertLeave").fadeIn("slow")

        } else if (dateStart == 3) {
            document.getElementById("uploadFilee").removeAttribute("disabled");
            document.getElementById("typeLeave").removeAttribute("disabled");
            document.getElementById("submit").removeAttribute("disabled");
            $("#alertLeave").fadeOut("slow")
        }
    })
}

//Date
$(function () {
    var zz = 0;
   
    
    $("#typeLeave").change(function () {
        if ($(this).val() == "") {
            $("#typeLeave").addClass("is-invalid")
            $(".tglawal").hide()
            $(".tglawal").val("")
            $(".tglakhir").val("")
            $(".tglawalTemp").show()
        } else {
            $("#typeLeave").removeClass("is-invalid")
            
            $.ajax({
                url: "/Leave/Get/" + $(this).val()
            }).done((result) => {
                $("#typeLeaveTemp").val(result.leaveType)
              
                if (result.leaveType == "Normal Leave") {
                    $.ajax({
                        url: "/Account/Get/" + $("#nikHidden").val()
                    }).done((hasil) => {
                        if (hasil.leaveStatus == 1) {
                            if (hasil.leaveQuota == 0) {

                                document.getElementById("uploadFilee").setAttribute("disabled", "disabled");
                                document.getElementById("submit").setAttribute("disabled", "disabled");

                                $(".tglawal").hide()
                                $(".tglakhirTemp").val("")
                                $(".tglawalTemp").show()
                                $("#alertLeave").html(" Sorry, your leave quota has expired!")
                                $("#alertLeave").fadeIn("slow")
                            } else {

                                document.getElementById("uploadFilee").removeAttribute("disabled");
                                document.getElementById("submit").removeAttribute("disabled");

                                $("#quotaLeave").val(hasil.leaveQuota)

                                $(".tglawalTemp").hide()
                                $(".tglawal").show()
                                $(".tglawal").val("")

                                $(".tglakhir").hide()
                                $(".tglakhirTemp").show()
                                $(".tglakhirTemp").val("")
                                $(".tglakhir").val("")

                                $("#alertLeave").fadeOut("slow")
                            }
                        } 
                    })
                } else {

                    document.getElementById("uploadFilee").removeAttribute("disabled");
                    document.getElementById("submit").removeAttribute("disabled");

                    $("#quotaLeave").val(result.leaveRange)

                    $(".tglawalTemp").hide()
                    $(".tglawal").show()
                    $(".tglawal").val("")

                    $(".tglakhir").hide()
                    $(".tglakhirTemp").show()
                    $(".tglakhirTemp").val("")
                    $(".tglakhir").val("")

                    $("#alertLeave").fadeOut("slow")
                }
            })
        }
    })
    $(".tglawalTemp").click(function () {
        let type = $("#typeLeave").val();
        if (type == null || type == "") {
             $("#typeLeave").addClass("is-invalid")

        }
    })
    $(".tglakhirTemp").click(function () {
        let type = $("#typeLeave").val();
        if (type == null || type == "") {
            $("#typeLeave").addClass("is-invalid")

        }
    })
    $(".tglawal").hide()
    $(".tglawalTemp").show()

    $(".tglakhir").hide()
    $(".tglakhirTemp").show()

    $(".tglawal").flatpickr(
        {
            "disable": [
                function (date) {
                    // return true to disable
                    return (date.getDay() === 0 || date.getDay() === 6);

                }
            ],
            onDayCreate: function (dObj, dStr, fp, dayElem) {
                // Utilize dayElem.dateObj, which is the corresponding Date
                $.ajax({
                    url: "/User/GetCalendar"
                }).done((result) => {
                    let dateNow = new Date();
                    let dateCalendar = new Date(dayElem.dateObj);
                    let month = 12;

                    for (var i = dateNow.getMonth(); i < month; i++) {
                        if (i == 0) {
                            $.each(result.data.monthly.januari.holiday.data, function (key, val) {
                                let dateHoliday = new Date(val.date)
                                if (dateCalendar.toLocaleDateString() == dateHoliday.toLocaleDateString()) {
                                    dayElem.innerHTML += `<span class="event busy"></span>`;
                                }
                            })
                        } else if (i == 1) {
                            $.each(result.data.monthly.februari.holiday.data, function (key, val) {
                                let dateHoliday = new Date(val.date)
                                if (dateCalendar.toLocaleDateString() == dateHoliday.toLocaleDateString()) {
                                    dayElem.innerHTML += `<span class="event busy"></span>`;
                                }
                            })
                        } else if (i == 2) {
                            $.each(result.data.monthly.maret.holiday.data, function (key, val) {
                                let dateHoliday = new Date(val.date)
                                if (dateCalendar.toLocaleDateString() == dateHoliday.toLocaleDateString()) {
                                    dayElem.innerHTML += `<span class="event busy"></span>`;
                                }
                            })
                        } else if (i == 3) {
                            $.each(result.data.monthly.april.holiday.data, function (key, val) {
                                let dateHoliday = new Date(val.date)
                                if (dateCalendar.toLocaleDateString() == dateHoliday.toLocaleDateString()) {
                                    dayElem.innerHTML += `<span class="event busy"></span>`;
                                }
                            })
                        } else if (i == 4) {
                            $.each(result.data.monthly.mei.holiday.data, function (key, val) {
                                let dateHoliday = new Date(val.date)
                                if (dateCalendar.toLocaleDateString() == dateHoliday.toLocaleDateString()) {
                                    dayElem.innerHTML += `<span class="event busy"></span>`;
                                }
                            })
                        } else if (i == 5) {
                            $.each(result.data.monthly.juni.holiday.data, function (key, val) {
                                let dateHoliday = new Date(val.date)
                                if (dateCalendar.toLocaleDateString() == dateHoliday.toLocaleDateString()) {
                                    dayElem.innerHTML += `<span class="event busy"></span>`;
                                }
                            })
                        } else if (i == 6) {
                            $.each(result.data.monthly.juli.holiday.data, function (key, val) {
                                let dateHoliday = new Date(val.date)
                                if (dateCalendar.toLocaleDateString() == dateHoliday.toLocaleDateString()) {
                                    dayElem.innerHTML += `<span class="event busy"></span>`;
                                }
                            })
                        }
                        else if (i == 7) {
                            $.each(result.data.monthly.agustus.holiday.data, function (key, val) {
                                let dateHoliday = new Date(val.date)
                                if (dateCalendar.toLocaleDateString() == dateHoliday.toLocaleDateString()) {
                                    dayElem.innerHTML += `<span class="event busy"></span>`;
                                }
                            })
                        }
                        else if (i == 8) {
                            $.each(result.data.monthly.september.holiday.data, function (key, val) {
                                let dateHoliday = new Date(val.date)
                                if (dateCalendar.toLocaleDateString() == dateHoliday.toLocaleDateString()) {
                                    dayElem.innerHTML += `<span class="event busy"></span>`;
                                }
                            })
                        } else if (i == 9) {
                            $.each(result.data.monthly.oktober.holiday.data, function (key, val) {
                                let dateHoliday = new Date(val.date)
                                if (dateCalendar.toLocaleDateString() == dateHoliday.toLocaleDateString()) {
                                    dayElem.innerHTML += `<span class="event busy"></span>`;
                                }
                            })
                        } else if (i == 10) {
                            $.each(result.data.monthly.november.holiday.data, function (key, val) {
                                let dateHoliday = new Date(val.date)
                                if (dateCalendar.toLocaleDateString() == dateHoliday.toLocaleDateString()) {
                                    dayElem.innerHTML += `<span class="event busy"></span>`;
                                }
                            })
                        } else if (i == 11) {
                            $.each(result.data.monthly.desember.holiday.data, function (key, val) {
                                let dateHoliday = new Date(val.date)
                                if (dateCalendar.toLocaleDateString() == dateHoliday.toLocaleDateString()) {
                                    dayElem.innerHTML += `<span class="event busy"></span>`;
                                }
                            })
                        }
                    }
                })
            },
            minDate: "today",
            onChange: function (selectedDates, dateStr, instance) {
                let range = parseInt($("#quotaLeave").val()) - 1;
                if ($("#typeLeaveTemp").val() == "Normal Leave") {
                    var countDate = 0;
                    var initial = 0;
                    var lopp = range;
                    do {
                        var dateNow = new Date(dateStr).fp_incr(initial);
                        if (dateNow.getDay() == 6 || dateNow.getDay() == 0) {
                            countDate++;
                            lopp++;
                        }
                        initial++;
                    } while (initial < lopp);
                   
                    $(".tglakhir").show()
                    $(".tglakhirTemp").hide()
                    $(".tglakhir").val("")
                    $("#tglakhir").flatpickr({
                        "disable": [
                            function (date) {
                                // return true to disable
                                return (date.getDay() === 0 || date.getDay() === 6);

                            }
                        ],
                        minDate: new Date(dateStr).fp_incr(1),
                        maxDate: new Date(dateStr).fp_incr(range + countDate)
                    });
                } else {
                    let ranges = parseInt($("#quotaLeave").val());
                    var countDate = 0;
                    var initial = 0;
                    var lopp = range;
                    do {
                        var dateNow = new Date(dateStr).fp_incr(initial);
                        if (dateNow.getDay() == 6 || dateNow.getDay() == 0) {
                            countDate++;
                            lopp++;
                        }
                        initial++;
                    } while (initial < lopp);
                    $(".tglakhir").hide()
                    $(".tglakhirTemp").show()
                    var tgl = new Date(dateStr).fp_incr(ranges + countDate);
                    console.log(countDate)
                    $("#tglakhirTemp").val(tgl.toISOString().substring(0, 10))
                }
               
            }
        }
    );
    
});

//Upload attachment
function readURL(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {
            $('.image-upload-wrap').hide();

            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();

            $('.image-title').html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);

    } else {
        removeUpload();
    }
}

function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});

//var date1 = new Date("2021-02-31");
//console.log(date1.getDate())
var month = ["januari", "februari", "maret", "april", "mei", "juni", "juli", "agustus", "September", "Oktober", "November","Desember"];





