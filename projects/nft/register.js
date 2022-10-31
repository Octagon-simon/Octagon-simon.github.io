window.addEventListener('load', function () {
    try {
        $('#form_register').addEventListener('submit', function (e) {
            //prevent the form from submitting
            e.preventDefault()
            //instantiate validation library
            let myForm = new octaValidate('form_register')
            //check if validation is successful
            if (myForm.validate()) {
                const userData = {
                    username: $('#inp_uname').value,
                    password: btoa($('#inp_conpass').value)
                }

                if (!localStorage.getItem('user')) localStorage.setItem('user', JSON.stringify(userData))
                //set loading state
                $('.btn-auth').innerHTML = `<i class="fa fa-spinner fa-spin"></i>`;
                $('.btn-auth').setAttribute('disabled', 'disabled');
                setTimeout(() => {
                    //redirect after 3 secs
                    window.location.assign('login.html')
                }, 3000)
            } else {
                e.preventDefault()
            }
        })
    } catch (err) {
        console.error(err)
    }
})