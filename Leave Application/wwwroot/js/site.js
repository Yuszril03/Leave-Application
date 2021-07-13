window.addEventListener('load', () => {
    let forms = document.getElementsByClassName('needs-validation');
    for (let form of forms) {
        form.addEventListener('submit', (evt) => {
            if (!form.checkValidity()) {
                evt.preventDefault();
                evt.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    }
});