(function () {
    //NATIVE AJAX
    var ajax = {};
    ajax.x = function () {
        if (typeof XMLHttpRequest !== 'undefined') {
            return new XMLHttpRequest();
        }
        var versions = [
            "MSXML2.XmlHttp.6.0",
            "MSXML2.XmlHttp.5.0",
            "MSXML2.XmlHttp.4.0",
            "MSXML2.XmlHttp.3.0",
            "MSXML2.XmlHttp.2.0",
            "Microsoft.XmlHttp"
        ];

        var xhr;
        for (var i = 0; i < versions.length; i++) {
            try {
                xhr = new ActiveXObject(versions[i]);
                break;
            } catch (e) {
            }
        }
        return xhr;
    };
    ajax.send = function (url, callback, method, data, async) {
        if (async === undefined) {
            async = true;
        }
        var x = ajax.x();
        x.open(method, url, async);
        x.onreadystatechange = function () {
            if (x.readyState == 4) {
                callback(x.responseText)
            }
        };
        if (method == 'POST') {
            x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        //const formData = new FormData(data);
        x.send(data);
        return x.responseText;
    };

    ajax.get = function (url, data, callback, async) {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
    };
    //fetch sidemenu
    const sideMenuData = new Promise(function (resolve) {
        ajax.get("./includes/sidenav.html", {}, function (responseText) {
            resolve(responseText);
        });
    })

    //fetch footer
    const footerData = new Promise(function (resolve) {
        ajax.get("./includes/footer.html", {}, function (responseText) {
            resolve(responseText);
        });
    })

    //append sidenav to document
    sideMenuData.then(data => {
        document.querySelector('.page-wrapper').insertAdjacentHTML('afterbegin', data);
        $('.aside_a').on("click", function () {
            closeNav();
        });
    })

    //append footer to document
    footerData.then(data => {
        document.querySelector('.footer').innerHTML = data;
    })

})();

//SIDENAV
var style = document.createElement("style");
style.setAttribute("id", "menuToggler");
document.head.appendChild(style);
function openNav() {
    var style = document.querySelector("#menuToggler");
    style.innerHTML += " aside.menu.left-panel { width:300px !important; padding:5px !important; }";

    var backdrop = document.createElement("div");
    backdrop.setAttribute("class", "backdrop");
    const body = document.querySelector("body");

    body.appendChild(backdrop);
    var btn = document.querySelector("#menuBtn");
    btn.style.display = "none";
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
    var style = document.querySelector("#menuToggler");
    style.innerHTML += " aside.menu.left-panel { width:0px !important; padding:0px !important; }";
    var backdrop = document.querySelector(".backdrop");
    if (backdrop) {
        backdrop.remove();
    }
    var btn = document.querySelector("#menuBtn");
    btn.style.display = "block";
}
