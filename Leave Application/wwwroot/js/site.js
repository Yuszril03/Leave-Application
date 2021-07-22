$(window).on('load', function () {
    $('.loader').hide();
});

window.addEventListener('load', () => {
    let forms = document.getElementsByClassName('needs-validation');
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
                    } else if (response == "Employee" || response == "Manager")
                    {
                        window.location = "/User/Index";
                        
                        }
                }
                else {
                    Swal.fire({
                        title: 'NIK/Email atau Password Anda Salah',
                        text: 'Silahkan Ulangi Lagi',
                        icon: 'warning',
                    })
                }
            }
        });
    });
}