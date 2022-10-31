window.addEventListener('load', function () {
    try {
        const buyModal = $("#modal_buy_nft");
        const buyAction = () => {
            //when the user clicks on confirm
            const cart = JSON.parse(localStorage.getItem('cart'))
            const nftData = $('#buy-info').getAttribute('nft-data');
            $('.buy-content').innerHTML = `
                    <p><i class="fas fa-check-circle fa-4x text-primary mt-20"></i></p>
                    <h4 class="text-primary mt-20 mb-20" style="font-size:1.4em">Thank you for your purchase</h4>`
            //remove element
            $(`[list-id="${nftData}"]`).remove()
            //remove modal
            setTimeout(() => {
                buyModal.style.display = "none";
                //reset buy modal
                $('.buy-content').innerHTML = `
                        <h4 class="text-primary" style="font-size:1.4em">Confirm your purchase</h4>
                        <p><i class="fas fa-info fa-3x text-primary mt-20"></i></p>
                        <p class="text-light" style="line-height:25px;margin-top:20px">Please confirm if you want to buy an NFT with this address</p>
                        <p id="buy-info" class="text-primary mt-20" style="word-break: break-all;">0xj3u8hb4uhn</p>
                        <div class="d-flex" style="gap:20px;width:80%;margin:30px auto">
                            <button class="btn-act buy-confirm w-50">Proceed</button>
                            <button class="btn-danger buy-cancel w-50">Cancel</button>
                        </div>
                        <p class="mt-20" style="line-height:25px;color:#999">We will charge you with the address linked to your wallet</p>
                        `
                //when user clicks on the cancel button
                $('.buy-cancel').onclick = cancelAction
                //when the user clicks on confirm
                $('.buy-confirm').onclick = buyAction
            }, 1500)
            //remove token from cart
            cart.splice(cart.indexOf(nftData), 1)
            //update Cart
            localStorage.setItem('cart', JSON.stringify(cart))
            //update cart count
            updateCartCount()
            //check if there's still items in cart
            if (!cartCount()) {
                $('.nft-section').innerHTML = `
                        <div class="text-center text-primary">
                            <i class="fas fa-info-circle fa-3x"></i>
                            <h5 class="text-center mt-20">No Items in Cart</h5>
                        </div>`;
            }
        }

        const cancelAction = () => {
            //when user clicks on the cancel button
            buyModal.style.display = "none";
        }
        //close modal on click
        $(".buy.modal-close").onclick = () => buyModal.style.display = "none";
        //when user clicks on the cancel button
        $('.buy-cancel').onclick = cancelAction
        //when the user clicks on confirm
        $('.buy-confirm').onclick = buyAction
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == buyModal) {
                buyModal.style.display = "none";
            }
        }
        const nftS = $('.nft-section')
        const tokens = JSON.parse(localStorage.getItem('cart'))
        if (!tokens.length) {
            //when to clear the loading state
            setTimeout(() => {
                nftS.innerHTML = `
            <div class="text-center text-primary">
                <i class="fas fa-info-circle fa-3x"></i>
                <h5 class="text-center mt-20">No items in cart</h5>
            </div>`
            }, 3000)
        } else {
            const opts = {
                method: 'GET',
                headers: {
                    'Content-Type': 'ApplIcation/json',
                    'Authorization': '148ec29b-3009-4919-b7aa-ec533d4796db'
                }
            }
            // nftS.innerHTML = '';
            let clearedNfts = false
            let i = 0;
            const interval = setInterval(() => {
                if (i === tokens.length) {
                    //clear the interval
                    clearInterval(interval)
                }
                if (i < tokens.length) {
                    fetch(`https://api.nftport.xyz/v0/nfts/${tokens[i]}?chain=ethereum`, opts)
                        .then(res => res.json())
                        .then(data => {
                            const img = data.nft.cached_file_url
                            const name = data.nft.metadata.name
                            const link = data.nft.metadata.external_url || data.nft.metadata_url || '#'
                            const desc = data.nft.metadata.description || 'No description Provided'
                            //check if html content is cleared
                            if (!clearedNfts) {
                                nftS.innerHTML = ''
                                clearedNfts = true
                            }
                            //dynamic add nfts
                            nftS.innerHTML += `
                        <div class="nft-list" list-id="${tokens[i]}">
                    <div class="nft-item" onclick="window.location.href='${link}'">
                        <span class="nft-price">0.0ETH</span>
                        <img src="${img}">
                        <div class="nft-desc">
                            <h4>${name}</h4>
                    <p>${(desc.length >= 113) ? desc.substring(0, 113) + '...' : desc}</p>
                        </div>
                    </div>
                    <div class="d-flex" style="column-gap: 10px;">
                        <button nft-data="${tokens[i]}" nft-price="2.2ETH" class="mt-20 btn-act w-50 buy-now">Buy Now</button>
                        <button nft-data="${tokens[i]}" class="remove-from-cart mt-20 btn-danger btn-danger-outline w-50">Remove</button>
                    </div>
                </div>`;
                            //check if data contains a value
                            if (data) {
                                const cart = JSON.parse(localStorage.getItem('cart'))
                                $$('.remove-from-cart').forEach(elem => {
                                    elem.onclick = function () {
                                        const nftData = this.getAttribute('nft-data')
                                        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'
                                        //disable the button
                                        this.setAttribute('disabled', 'disabled')
                                        //remove token from cart
                                        cart.splice(cart.indexOf(nftData), 1)
                                        //update Cart
                                        localStorage.setItem('cart', JSON.stringify(cart))
                                        //update cart count
                                        updateCartCount()
                                        //remove element
                                        setTimeout(() => {
                                            $(`[list-id="${nftData}"]`).remove()
                                            //check if there's still items in cart
                                            if (!cartCount()) {
                                                nftS.innerHTML = `<div class="text-center text-primary">
                                            <i class="fas fa-info-circle fa-3x"></i>
                                            <h5 class="text-center mt-20">No Items in Cart</h5>
                                        </div>`;
                                            }
                                        }, 3000)
                                    }
                                })

                                //loop through the buy buttons
                                $$('.buy-now').forEach(elem => {
                                    elem.onclick = () => {
                                        //check if wallet addres exists
                                        if (!localStorage.getItem('wallet')) {
                                            //show wallet modal instead
                                            walletModal.style.display = "block"
                                        } else {
                                            //show modal
                                            buyModal.style.display = "block"
                                            //set nft data
                                            const nftData = elem.getAttribute('nft-data')
                                            console.log(elem.getAttribute('nft-data'))
                                            //set the nft information on the modal 
                                            $('#buy-info').setAttribute('nft-data', nftData)
                                            $('#buy-info').innerHTML = nftData.substr(0, nftData.indexOf('/'))
                                        }

                                    }
                                })
                            }
                            i++;
                        })
                        .catch(err => {
                            //add error
                            nftS.innerHTML = `
                        <div class="text-center text-danger">
                <i class="fas fa-times-circle fa-3x"></i>
                <h5 class="text-center mt-20">Couldn't fetch NFTs</h5>
            </div>`;
                            console.error(err)
                        })
                    //i++;
                } else {
                    clearInterval(interval)
                }
            }, 5000)
            //nft quantity ?
        }
    } catch (err) {
        console.error(err)
    }
}) 