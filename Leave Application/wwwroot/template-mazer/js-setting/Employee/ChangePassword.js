$(document).ready(function () {
    $("#submit").click(function () {
        let oldPassword = $("#OldPassword").val()
        let newPassword = $("#NewPassword").val()
        let confirmPassword = $("#ConfirmPassword").val()
        
        if (oldPassword.length < 8) {
            $("#oldPW").html("Password less than 8 characters")
            $("#OldPassword").addClass("is-invalid")
        } else {
            var obj = new Object();
            obj.NIK = $("#nikHidden").val();
            obj.Password = $("#OldPassword").val()
            $.ajax({
                url: "/User/CheckPassword",
                type: "POST",
                data: obj
            }).done((result) => {
                if (result == 200) {
                    $("#OldPassword").removeClass("is-invalid")
                    if (newPassword.length < 8 && confirmPassword.length < 8) {
                        $("#newPW").html("Password less than 8 characters")
                        $("#conPW").html("Password less than 8 characters")
                        $("#NewPassword").addClass("is-invalid")
                        $("#ConfirmPassword").addClass("is-invalid")
                    } else if (newPassword.length >= 8 && confirmPassword.length < 8) {
                        $("#NewPassword").removeClass("is-invalid")
                        $("#conPW").html("Password less than 8 characters")
                        $("#ConfirmPassword").addClass("is-invalid")
                    } else if (newPassword.length >= 8 && confirmPassword.length >= 8) {
                        if (newPassword == confirmPassword) {
                            $("#NewPassword").removeClass("is-invalid")
                            $("#ConfirmPassword").removeClass("is-invalid")
                            $.ajax({
                                url: "/Account/Get/" + $("#nikHidden").val()
                            }).done((resultt) => {
                                var objPas = new Object();
                                objPas.NIK = resultt.nik;
                                objPas.LeaveQuota = resultt.leaveQuota;
                                objPas.LeaveStatus = resultt.leaveStatus;
                                objPas.Password = newPassword;
                                
                                $.ajax({
                                    url: "/User/UpdatePassword",
                                    type: "POST",
                                    data: objPas
                                }).done((hasil) => {
                                  $("#OldPassword").val("")
                                    $("#NewPassword").val("")
                                    $("#ConfirmPassword").val("")
                                    if (hasil == 200) {
                                        $('#done').fadeIn("slow");
                                        setTimeout(function () {
                                            $('#done').fadeOut("slow");
                                        }, 5000)
                                    } else {
                                        $('#fail').fadeIn("slow");
                                        setTimeout(function () {
                                            $('#fail').fadeOut("slow");
                                        }, 5000)
                                    }
                                    
                                })
                            })
                        } else {
                            $("#NewPassword").removeClass("is-invalid")
                            $("#conPW").html("Confirm password is not the same as new password")
                            $("#ConfirmPassword").addClass("is-invalid")
                        }
                       
                    }

                } else {
                    $("#oldPW").html("The password is not the same as the old password")
                    $("#OldPassword").addClass("is-invalid")
                }
            })
        }
       
    })
})