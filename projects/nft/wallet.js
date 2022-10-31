window.addEventListener('load', function () {
    try {
        const walletModal = $("#modal_wallet_address")
        //show wallet modal
        $$('#showWalletAddrModal').forEach(elem => {
            elem.onclick = () => walletModal.style.display = "block";
        })
        //close modal on click
        $(".modal-close").onclick = () => walletModal.style.display = "none";
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == walletModal) {
                walletModal.style.display = "none";
            }
        }
        //retrieve wallet address
        if (localStorage.getItem('wallet')) {
            const addr = atob(localStorage.getItem('wallet'));
            $('#inp_addr').value = addr;
            $('#form_wallet_addr button').innerHTML = 'Update Address'
        }
        //save wallet address
        $('#form_wallet_addr').addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = $('#form_wallet_addr button');
            //new instance of validation library
            const myForm = new octaValidate('form_wallet_addr')
            //check if validation is successful
            if (myForm.validate()) {
                //save address to storage
                localStorage.setItem('wallet', btoa($('#inp_addr').value))
                //disable the button
                btn.setAttribute('disabled', 'disabled')
                //add loading state
                btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
                setTimeout(() => {
                    btn.innerHTML = "Address Updated"
                    //remove disabled state
                    btn.removeAttribute('disabled')
                }, 3000)
            }
        })
    } catch (err) {
        console.error(err)
    }
})
