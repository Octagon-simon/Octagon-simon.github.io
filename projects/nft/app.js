const url = "http://127.0.0.1:3000/projects/nft";
//use $ as global query selector
const $ = (elem) => document.querySelector(elem);
//use $$ as global query selectorAll
const $$ = (elem) => document.querySelectorAll(elem);
let theme = "dark";
const loggedIn = Boolean(sessionStorage.getItem('loggedIn')) || false
const changeTheme = (theme) => {
    document.body.classList.remove('light', 'dark')
    //check if page should be disturbed
    if (document.body.id !== "dnd") {
        //add theme theme
        document.body.classList.add(theme)
    }
}
//function to dynamically load scripts
/*
const loadScript = async (url) => {
    const res = await fetch(url)
    const script = await res.text()
    Function(script)
}
*/
//update cart
const updateCartCount = () => {
    if (localStorage.getItem('cart')) {
        const data = JSON.parse(localStorage.getItem('cart'));
        //loop through nfts
        data.forEach(nft => {
            //set total cart items
            $$('.cart-count').forEach(elem => {
                elem.innerHTML = data.length
            })
        })
    }
}
//number pf nfts in cart
const cartCount = () => {
    if (localStorage.getItem('cart')) return JSON.parse(localStorage.getItem('cart')).length || 0

    return 0
}
const handleThemeSwitch = function () {
    if ($('.btn-theme-switch i') && $('.btn-theme-switch')) {
        document.body.classList.remove('light', 'dark')
        $('.btn-theme-switch i').removeAttribute('class')
        if (theme == 'light') {
            theme = 'dark'
            $('.btn-theme-switch i').setAttribute('class', 'fas fa-sun')
        } else {
            theme = 'light'
            $('.btn-theme-switch i').setAttribute('class', 'fas fa-moon')
        }
        document.body.classList.add(theme)
    }

}

//check if page should be disturbed
if (document.body.id !== "dnd") {
    //create theme switch html
    const frag = document.createDocumentFragment()
    const d = document.createElement('div')
    d.setAttribute('class', 'theme-switch')
    const b = document.createElement('button')
    b.setAttribute('class', 'btn-theme-switch')
    const i = document.createElement('i')
    i.setAttribute('class', 'fas fa-sun')
    b.appendChild(i)
    d.appendChild(b)
    frag.appendChild(d)
    //event listener
    d.addEventListener('click', handleThemeSwitch)

    //add theme html
    $$('section')[$$('section').length - 1].after(frag)
}

//fetch navbar
fetch(`${url}/layouts/navbar.html`)
    .then(res => res.text())
    .then(data => {
        if ($('header')) {
            $('header').innerHTML = data;
            //toggle navbar for mobile devices
            $('.nav-toggler').addEventListener('click', function () {
                const x = document.getElementById("myLinks");
                if (x.style.display === "block") {
                    x.style.display = "none";
                } else {
                    x.style.display = "block";
                }
            })

            //what happens when the user is logged in
            if (loggedIn) {
                //hide auth links
                $$('[auth-link]').forEach(elem => {
                    elem.style.display = "none"
                })
                //show pages that require login
                $$('[auth-end], [auth-page]').forEach(elem => {
                    elem.style.display = "block"
                })
            }
            //update cart
            updateCartCount()
        }
    })
    .catch(err => {
        console.log(err)
    })

//fetch wallet
fetch(`${url}/layouts/wallet.html`)
    .then(res => res.text())
    .then(data => {
        if ($('section')) {
            const section = document.createElement('section');
            section.innerHTML = data
            $$('section')[$$('section').length - 1].after(section)

            if (data) {
                const scr = document.createElement('script')
                scr.src = "./wallet.js"
                scr.onload = () => console.info('wallet script has been loaded by the browser')
                document.body.appendChild(scr)
            }
        }
    })
    .catch(err => {
        console.log(err)
    })

//change theme when window has loaded
window.addEventListener('load', function () {
    changeTheme(theme);
})
