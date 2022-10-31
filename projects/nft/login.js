window.addEventListener('load', function () {
    try {
        $('#form_login').addEventListener('submit', function (e) {
            //prevent the form from submitting
            e.preventDefault()
            //instantiate validation library
            let myForm = new octaValidate('form_login')
            //check if validation is successful
            if (myForm.validate()) {
                const userData = {
                    username: $('#inp_uname').value,
                    password: $('#inp_pass').value
                }

                if (!localStorage.getItem('user')) {
                    //redirect to signup page
                    window.location.assign('register.html')
                }
                //retrieve user details
                const user = JSON.parse(localStorage.getItem('user'))
                //compare login data
                if (user.username === userData.username &&
                    atob(user.password) === userData.password) {
                    //set loading state
                    $('.btn-auth').innerHTML = `<i class="fa fa-spinner fa-spin"></i>`
                    $('.btn-auth').setAttribute('disabled', 'disabled')
                    sessionStorage.setItem('loggedIn', true)
                    setTimeout(() => {
                        //redirect after 3 secs
                        window.location.assign('market.html')
                    }, 3000)
                } else {
                    alert('You have entered an Invalid Username or password')
                }

            } else {
                e.preventDefault()
            }
        })
    } catch (err) {
        console.error(err)
    }
})