window.addEventListener('load', function () {
    try {
        /*Type writer effect*/
        let plI = 0;
        //add more space  if you're looping
        let preloadText = 'Explore, Collect and Sell NFTs'
        let typeWrite = function () {
            if (plI < preloadText.length) {
                document.querySelector('#home-title').innerHTML += preloadText.charAt(plI)
                plI++;
            } /*
        //keep looping
        else{
            plI = 0; document.querySelector('#home-title').innerHTML = ''
        }*/
            setTimeout(typeWrite, 150)
        }
        typeWrite()


        //k()
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

        //h())
        const nftS = document.querySelector('.nft-section')
        let clearedNfts = false;
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
                        //check if nft html content is cleared already
                        if (!clearedNfts) {
                            nftS.innerHTML = ''
                            clearedNfts = true
                        }
                        nftS.innerHTML += `
                    
            <div class="nft-item" onclick="window.location.href='${link}'" >
                <img src="${img}">
                <div class="nft-desc">
                    <h4>${name}</h4>
                    <p>${(desc.length >= 113) ? desc.substring(0, 113) + '...' : desc}</p>
                </div>
            </div>`;
                    })
                    .catch(err => {
                        //add static nfts
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