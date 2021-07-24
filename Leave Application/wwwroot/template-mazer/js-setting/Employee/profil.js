$(document).ready(function () {
    onLoadd();
    var myModal = new bootstrap.Modal(document.getElementById('edit'), {
        keyboard: false
    })

    function onLoadd() {
        $.ajax({
            url: "/User/GetOneProfil"
        }).done((result) => {
            //View
            $("#nikV").html(result[0].nik)
            $("#namaV").html(result[0].firstName + " " + result[0].lastName)
            $("#genderV").html(result[0].gender)
            $("#emailV").html(result[0].email)
            var tel = parseInt(result[0].phoneNumber);
            $("#nomorV").html("+62" + tel)
            if (result[0].managerId == null) {
                $("#manajerV").html("-")
            } else {
                $.ajax({
                    url: "/Employee/Get/" + result[0].managerId
                }).done((hasil) => {
                    $("#manajerV").html(hasil.firstName + " " + hasil.lastName)
                })
                
            }

            $("#depV").html(result[0].departmentName)
            if (result[0].leaveQuota <= 0) {
                $("#cutiV").html("0")
            } else {

             $("#cutiV").html(result[0].leaveQuota)
            }
            if (result[0].leaveStatus == 1) {
                $("#statusV").html('<span class="badge bg-success">Work</span>')
            } else {
                $("#statusV").html('<span class="badge bg-secondary">Leave</span>')
            }

        })
    }

    

    function formatTelfon(angka, prefix) {
        var parse = parseInt(angka);
        var stringTO = '' + parse;
        var number_string = stringTO.replace(/^[\+]?[(]?[1-9]{3}[)]?[-\s\.]?[1-9]{3}[-\s\.]?[1-9]{4,6}$/im, '').toString(),
            split = number_string.split(','),
            sisa = split[0].length % 3,
            rupiah = split[0].substr(0, sisa),
            ribuan = split[0].substr(sisa).match(/\d{3}/gi);

        // tambahkan titik jika yang di input sudah menjadi angka ribuan
        if (ribuan) {
            separator = sisa ? '' : '';
            rupiah += separator + ribuan.join('');
        }

        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        return prefix == undefined ? rupiah : (rupiah ? '+62' + rupiah : '');
    }
    $('#doneUpdate').hide();
    $('#failUpdate').hide();
    let forms = document.getElementById('submit');
    forms.addEventListener("click", function () {
        var form = $("#form").serializeArray();
        count = 0;
        for (var t in form) {
            if (form[t].name == "nikE") {

            }
            else if (form[t].name == "emailE") {
                if (form[t].value != $("#tempEmail").val()) {
                    if (document.getElementById("valEmail").value == "1") {
                        $("#" + form[t].name).removeClass("is-valid")
                        $('#' + form[t].name).addClass("is-invalid");
                        $("#femail").html("The email you entered is already in use!")
                        count++;
                    } else if (form[t].value == "") {
                        $("#" + form[t].name).removeClass("is-valid")
                        $('#' + form[t].name).addClass("is-invalid");
                        $("#femail").html("Please fill in the email!")
                        count++;
                    }
                    else {
                        $("#" + form[t].name).removeClass("is-invalid")
                        $("#" + form[t].name).addClass("is-valid")
                    }
                }
                 else {
                    $("#" + form[t].name).removeClass("is-invalid")
                    $("#" + form[t].name).addClass("is-valid")
                }
            }
            else if (form[t].name == "phoneNumberE") {
                if ((form[t].value).length < 12) {
                    $("#" + form[t].name).removeClass("is-valid")
                    $('#' + form[t].name).addClass("is-invalid");
                    $("#ftelfon").html("Phone number less than 12 digits!")
                    count++;
                } else {
                    $("#" + form[t].name).removeClass("is-invalid")
                    $("#" + form[t].name).addClass("is-valid")
                }
            }
            else if (form[t].value == "") {
                $("#" + form[t].name).removeClass("is-valid")
                $("#" + form[t].name).addClass("is-invalid")
                count++;
            } else {
                $("#" + form[t].name).removeClass("is-invalid")
                $("#" + form[t].name).addClass("is-valid")
            }
            
        }

        if (count == 0) {
            var obj = new Object();
            obj.NIK = $("#nikE").val();
            obj.FirstName = $("#firstnameE").val();
            obj.LastName = $("#lastNameE").val();
            obj.Email = $("#emailE").val();
            obj.Gender = $("#genderE").val();
            obj.PhoneNumber = $("#phoneNumberE").val();
            obj.ManagerId = $("#tempManager").val()
            obj.DepartmentId = $("#tempDep").val()
            const myJSON = JSON.stringify(obj);
            $.ajax({
                url: '/Employee/Put',
                type: "PUT",
                data: obj
            }).done((result) => {
                var delayInMilliseconds = 1000; //1 second
                $.ajax({
                    url: "/User/SetName",
                    type: "POST",
                    data: obj
                }).done((jadi) => {
                    setTimeout(function () {
                        var x = $("#firstnameE").val() + " " + $("#lastNameE").val();
                        myModal.hide()
                        $("#namaAtas").html(x)
                        $('#doneUpdate').show();
                        onLoadd();
                    }, delayInMilliseconds);
                })
                
               
            }).fail((error) => {
                myModal.hide()
                $('#failUpdate').show();

                console.log(error)
            })
            
        }
    })
    $("#emailE").blur(function () {
        emaill = $(this).val()
        nik = $("#nikE").val()
        $.ajax({
            url: "/Employee/GetAll/"
        }).done((result) => {
            var e = "0";
            $.each(result, function (key, val) {
                if (val.email == emaill) {
                    e = "1";
                }
            })
            $("#valEmail").val(e);

            //if (result.email != emaill) {
            //}
            //else {
            //    $("#valEmail").val("1");
            //}
        }).fail((error) => {
            console.log(error)
        })
    })
    $("#phoneNumberE").keyup(function () {
        tel = $(this).val()
        
        $(this).val(formatAngka(tel,""))
    })
   
})
function formatAngka(angka, prefix) {
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
        split = number_string.split(','),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
        separator = sisa ? '' : '';
        rupiah += separator + ribuan.join('');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? '' + rupiah : '');
}
function openModal() {

    var form = $("#form").serializeArray();
    for (var t in form) {
        $("#" + form[t].name).removeClass("is-invalid")
        $("#" + form[t].name).removeClass("is-valid")
    }

    $.ajax({
        url: "/User/GetSessionNIK"
    }).done((hasil) => {
        $.ajax({
            url: "/Employee/Get/" + hasil
        }).done((result) => {
            console.log(result)
            ////ModalEdit
            $("#nikE").val(result.nik)
            $("#firstnameE").val(result.firstName)
            $("#lastNameE").val(result.lastName)
            $("#emailE").val(result.email)
            $("#tempEmail").val(result.email)
            if (result.gender == 0) {
                $("#genderE").val("0")
            } else {
                $("#genderE").val("1")
            }

            $("#phoneNumberE").val(result.phoneNumber)
            $("#tempDep").val(result.departmentId)
            $("#tempManager").val(result.managerId)
            })
        
    })
}



