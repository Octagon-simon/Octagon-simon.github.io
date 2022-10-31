//add ability to delete nft from cart
window.addEventListener('load', function () {
    try {
        let i = 0;
        const tokens = [
            '0x9cd6a32765ece5f30b916d6c00eb9efae2c180a7/175', '0xccb5c4e5fcfb6c85b79e0a41617df55a5ddbce7e/89', '0x3203de5830c7deb61a0b2ee45178474a93269f01/45', '0x183276cf6dd6195de7d09d3ff4e80e97e3de1fee/2395', '0xfb173e1661d4076888d02ec14c3d53e44ff53f3b/35', '0x018ae5620758a28d39b1c03f4a03f6b2db9f55ca/313', '0xdd44443d8a3563e947ead8a2254b36f8d8b28581/22103', '0x00a52503faff391507fc90a2f931f8f61f67d816/673',
            '0x8f6a4d8ad2493adfd7d1540ccdba11bde5c7eb9e/3103']

        const opts = {
            method: 'GET',
            headers: {
                'Content-Type': 'ApplIcation/json',
                'Authorization': '148ec29b-3009-4919-b7aa-ec533d4796db'
            }
        }

        const nftS = document.querySelector('.nft-section')
        let clearedNfts = false;
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
                        if (!clearedNfts) {
                            nftS.innerHTML = ''
                            clearedNfts = true
                        }
                        nftS.innerHTML += `
                    <div class="nft-list">
                    <div class="nft-item">
                        <img src="${img}">
                        <span class="nft-price">0.0ETH</span>
                        <div class="nft-overlay"></div>
                        <div class="nft-desc">
                            <h4>${name}</h4>
                            <p>${(desc.length >= 113) ? desc.substring(0, 113) + '...' : desc}</p>
                        </div>
                    </div>
                    <button nft-data="${tokens[i]}" class="add-to-cart mt-20 btn-cta btn-cta-outline w-100">Add to cart</button>
                </div>`;
                        if (data) {
                            //load nfts in cart already
                            if (localStorage.getItem('cart')) {
                                const data = JSON.parse(localStorage.getItem('cart'));
                                //loop through nfts
                                data.forEach(nft => {
                                    //disable the buttons
                                    if ($(`[nft-data="${nft}"]`)) {
                                        $(`[nft-data="${nft}"]`).setAttribute('disabled', 'disabled')
                                        $(`[nft-data="${nft}"]`).innerHTML = 'Added to cart'
                                    }

                                })
                            }
                            //add a new nft to cart
                            $$('.add-to-cart').forEach(elem => {
                                elem.addEventListener('click', function () {
                                    const btn = this;
                                    //disable the button
                                    btn.setAttribute('disabled', 'disabled')
                                    //add loading state
                                    btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
                                    //save nft data in local storage
                                    const data = [btn.getAttribute('nft-data')]
                                    if (localStorage.getItem('cart')) {
                                        data.push(...JSON.parse(localStorage.getItem('cart')))
                                    }
                                    //store cart to local storage
                                    localStorage.setItem('cart', JSON.stringify(data))
                                    //something fancy
                                    setTimeout(() => {
                                        btn.innerHTML = 'Added to cart'
                                        //set total cart items
                                        updateCartCount()
                                    }, 3000)
                                })
                            })
                        }
                        i++;
                    })
                    .catch(err => {
                        //add error
                        nftS.innerHTML = `<div class="text-center text-danger">
                <i class="fas fa-times-circle fa-3x"></i>
                <h5 class="text-center mt-20">Couldn't fetch NFTs</h5>
            </div>`;
                        console.error(err)
                    })
                i++;
            } else {
                clearInterval(interval)
            }
        }, 5000)



    } catch (err) {
        console.error(err)
    }
})
