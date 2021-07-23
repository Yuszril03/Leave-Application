$(window).on('load', function () {
    $('.loader').hide();
});

window.addEventListener('load', () => {
    let forms = document.getElementsByClassName('needs-validation');
    let formsForgot = document.getElementsByClassName('needs-validation-forgot');
    for (let form of forms) {
        form.addEventListener('submit', (evt) => {
            if (!form.checkValidity()) {
                evt.preventDefault();
                evt.stopPropagation();
            }
            else {
                evt.preventDefault();
                Login();
            }
            form.classList.add('was-validated');
        });
    }
    for (let form of formsForgot) {
        form.addEventListener('submit', (evt) => {
            if (!form.checkValidity()) {
                evt.preventDefault();
                evt.stopPropagation();
            }
            else {
                evt.preventDefault();
                Forgot();
            }
            form.classList.add('was-validated');
        });
    }
});

$(document).ready(function () {
    $("#show_hide_password a").on('click', function (event) {
        event.preventDefault();
        if ($('#show_hide_password input').attr("type") == "text") {
            $('#show_hide_password input').attr('type', 'password');
            $('#eyeIcon').removeClass("fa-eye");
            $('#eyeIcon').addClass("fa-eye-slash");
        } else if ($('#show_hide_password input').attr("type") == "password") {
            $('#show_hide_password input').attr('type', 'text');
            $('#eyeIcon').removeClass("fa-eye-slash");
            $('#eyeIcon').addClass("fa-eye");
        }
    });


});

function Login() {
    $(document).ready(function () {
        let validate = $('#validate').val().trim();
        let password = $('#password').val().trim();

        $.ajax({
            url: '/Home/Auth',
            type: 'post',
            data: { ValidateId: validate, Password: password },
            beforeSend: function () {
                $('.modal').hide();
                $('.modal-backdrop').remove();
                $('.loader').show();
            },
            complete: function () {
                $('.loader').fadeOut(1000);
            },
            success: function (response) {
                if (response != null) {
                    if (response == "Admin") {
                        window.location = "/Admin/Index";
                    } else if (response == "Employee" || response == "Manager") {
                        window.location = "/User";
                    } else {
                        window.location = "/Home/Index";
                    }
                }
                else {
                    Swal.fire({
                        title: 'NIK/Email or Password Wrong',
                        text: 'Please try again.',
                        icon: 'warning',
                    })
                }
            }
        });
    });
}

function Forgot() {
    $(document).ready(function () {
        let email = $('#email').val().trim();

        $.ajax({
            url: '/Home/ResetPassword',
            type: 'put',
            data: { Email: email },
            beforeSend: function () {
                $('.modal').hide();
                $('.modal-backdrop').remove();
                $('.loader').show();
            },
            complete: function () {
                $('.loader').fadeOut(1000);
            },
            success: function (response) {
                if (response.result > 0) {
                    Swal.fire({
                        title: `${response.message}`,
                        text: 'New password has been send to your mail.',
                        icon: 'success',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                }
                else {
                    Swal.fire({
                        title: `${response.message}`,
                        text: 'Email not found by system.',
                        icon: 'warning',
                    });
                }
            }
        });
    });
}