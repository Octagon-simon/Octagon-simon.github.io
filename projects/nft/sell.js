window.addEventListener('load', function () {
    try {
        const nftModal = $("#modal_submit_nft");
        //close modal on click
        $(".modal-close").onclick = () => nftModal.style.display = "none";
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == nftModal) {
                nftModal.style.display = "none";
            }
        }
        function setNftPrice() {
            //remove extrawhite space
            this.value = this.value.trim()
            //check and append value to price element
            if ($('#inp_price').value.trim() !== ""
                && $('#price_tag').value.trim() !== "") {
                $('.nft-price').innerHTML = $('#inp_price').value +
                    $('#price_tag').value
            }
        }

        //listen for image input change event
        $('#inp_nft').addEventListener('change', function () {
            //destructure array
            const [file] = this.files
            //check if file type is an image
            if (file.type.includes('image'))
                //show preview
                $('#nft-img').src = URL.createObjectURL(file)
        })
        //listen for nft name input change event
        $('#inp_name').addEventListener('change', function () {
            //check if value is not empty
            this.value = this.value.trim()
            if (this.value.trim() !== "") {
                $('.nft-desc h4').innerHTML = this.value
            }
        })
        //listen for nft description input change event
        $('#inp_desc').addEventListener('change', function () {
            //check if value is not empty
            this.value = this.value.trim()
            if (this.value.trim() !== "") {
                $('.nft-desc p').innerHTML = this.value
            }
        })
        //listen for nft price change event
        $('#inp_price').addEventListener('change', setNftPrice)
        //listen for nft price change event
        $('#price_tag').addEventListener('change', setNftPrice)

        $('#form_submit_nft').addEventListener('submit', function (e) {
            //prevent the form from submitting
            e.preventDefault()
            //instantiate validation library
            let myForm = new octaValidate('form_submit_nft')
            myForm.customRule('PRICE', /^([0-9]+\.[0-9])|([0-9])$/, 'You have entered an invalid price')
            //check if validation is successful
            if (myForm.validate()) {
                //show the modal
                nftModal.style.display = "block"
            } else {
                e.preventDefault()
            }
        })
    } catch (err) {
        console.error(err)
    }
})