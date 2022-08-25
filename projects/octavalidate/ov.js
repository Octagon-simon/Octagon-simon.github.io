function findElem(elem) {
  return (document.querySelector(elem) !== null);
}
window.addEventListener('load', function () {

  if (typeof PR !== undefined && typeof PR === 'object') {
    PR.prettyPrint();
  }

  document.querySelectorAll('#code-section').forEach(c => {
    w3CodeColor(c);
  });
});

//copy button function to code snippets
if (findElem('.cb-copy-btn')) {
  document.querySelectorAll('.cb-copy-btn').forEach(btn => {

    btn.addEventListener('click', function (e) {
      let preId = this.getAttribute('cb-copy-snippet');
      const toCopy = document.querySelector('pre#pre_' + preId + '').innerText.trim();
      if (toCopy.length !== 0) {
        window.navigator.clipboard.writeText(toCopy)
          .then(() => {
            alert("Code snippet has been copied");
          })
          .catch(() => {
            alert("Oops an error has occured");
          });
      }
      //prevent parent elements from receiving event
      e.stopPropagation();
    });
  });
}
/*
let buildNavbar = () => {
  const reader = new FileReader();
  reader.readAsDataURL('./includes/navbar.txt',"UTF-8");
  reader.onload = (evt) => {
    const html = new DOMParser().parseFromString(evt.target.result, 'text/html');
    console.log(html);
  }
  reader.onerror = (evt) => {
    console.log("ERROR OCCURED BUILDING NAVBAR")
  }
}

let buildNavbar = () => {
  fetch('includes/navbar.txt')
  .then(response => {
    response.text();
    console.log(response);
  })
  .then(data => {
   // const html = new DOMParser().parseFromString(data, 'text/html');
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  })
}
*/

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
  //fetch navbar
  const navbarData = new Promise(function (resolve) {
    ajax.get("./includes/navbar.html", {}, function (responseText) {
      resolve(responseText);
    });
  })
  //append navbar to document
  navbarData.then(data => {
    document.getElementById('header').innerHTML = data;

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  })

})();


function w3CodeColor(elmnt, mode) {
  var lang = (mode || "html");
  var elmntObj = (document.getElementById(elmnt) || elmnt);
  var elmntTxt = elmntObj.innerHTML;
  var tagcolor = "mediumblue";
  var tagnamecolor = "brown";
  var attributecolor = "red";
  var attributevaluecolor = "mediumblue";
  var commentcolor = "green";
  var cssselectorcolor = "brown";
  var csspropertycolor = "red";
  var csspropertyvaluecolor = "mediumblue";
  var cssdelimitercolor = "black";
  var cssimportantcolor = "red";
  var jscolor = "black";
  var jskeywordcolor = "mediumblue";
  var jsstringcolor = "brown";
  var jsnumbercolor = "red";
  var jspropertycolor = "black";
  elmntObj.style.fontFamily = "Consolas,'Courier New', monospace";
  if (!lang) { lang = "html"; }
  if (lang == "html") { elmntTxt = htmlMode(elmntTxt); }
  if (lang == "css") { elmntTxt = cssMode(elmntTxt); }
  if (lang == "js") { elmntTxt = jsMode(elmntTxt); }
  elmntObj.innerHTML = elmntTxt;

  function extract(str, start, end, func, repl) {
    var s, e, d = "", a = [];
    while (str.search(start) > -1) {
      s = str.search(start);
      e = str.indexOf(end, s);
      if (e == -1) { e = str.length; }
      if (repl) {
        a.push(func(str.substring(s, e + (end.length))));
        str = str.substring(0, s) + repl + str.substr(e + (end.length));
      } else {
        d += str.substring(0, s);
        d += func(str.substring(s, e + (end.length)));
        str = str.substr(e + (end.length));
      }
    }
    this.rest = d + str;
    this.arr = a;
  }
  function htmlMode(txt) {
    var rest = txt, done = "", php, comment, angular, startpos, endpos, note, i;
    comment = new extract(rest, "&lt;!--", "--&gt;", commentMode, "W3HTMLCOMMENTPOS");
    rest = comment.rest;
    while (rest.indexOf("&lt;") > -1) {
      note = "";
      startpos = rest.indexOf("&lt;");
      if (rest.substr(startpos, 9).toUpperCase() == "&LT;STYLE") { note = "css"; }
      if (rest.substr(startpos, 10).toUpperCase() == "&LT;SCRIPT") { note = "javascript"; }
      endpos = rest.indexOf("&gt;", startpos);
      if (endpos == -1) { endpos = rest.length; }
      done += rest.substring(0, startpos);
      done += tagMode(rest.substring(startpos, endpos + 4));
      rest = rest.substr(endpos + 4);
      if (note == "css") {
        endpos = rest.indexOf("&lt;/style&gt;");
        if (endpos > -1) {
          done += cssMode(rest.substring(0, endpos));
          rest = rest.substr(endpos);
        }
      }
      if (note == "javascript") {
        endpos = rest.indexOf("&lt;/script&gt;");
        if (endpos > -1) {
          done += jsMode(rest.substring(0, endpos));
          rest = rest.substr(endpos);
        }
      }
    }
    rest = done + rest;
    for (i = 0; i < comment.arr.length; i++) {
      rest = rest.replace("W3HTMLCOMMENTPOS", comment.arr[i]);
    }
    return rest;
  }
  function tagMode(txt) {
    var rest = txt, done = "", startpos, endpos, result;
    while (rest.search(/(\s|<br>)/) > -1) {
      startpos = rest.search(/(\s|<br>)/);
      endpos = rest.indexOf("&gt;");
      if (endpos == -1) { endpos = rest.length; }
      done += rest.substring(0, startpos);
      done += attributeMode(rest.substring(startpos, endpos));
      rest = rest.substr(endpos);
    }
    result = done + rest;
    result = "<span style=color:" + tagcolor + ">&lt;</span>" + result.substring(4);
    if (result.substr(result.length - 4, 4) == "&gt;") {
      result = result.substring(0, result.length - 4) + "<span style=color:" + tagcolor + ">&gt;</span>";
    }
    return "<span style=color:" + tagnamecolor + ">" + result + "</span>";
  }
  function attributeMode(txt) {
    var rest = txt, done = "", startpos, endpos, singlefnuttpos, doublefnuttpos, spacepos;
    while (rest.indexOf("=") > -1) {
      endpos = -1;
      startpos = rest.indexOf("=");
      singlefnuttpos = rest.indexOf("'", startpos);
      doublefnuttpos = rest.indexOf('"', startpos);
      spacepos = rest.indexOf(" ", startpos + 2);
      if (spacepos > -1 && (spacepos < singlefnuttpos || singlefnuttpos == -1) && (spacepos < doublefnuttpos || doublefnuttpos == -1)) {
        endpos = rest.indexOf(" ", startpos);
      } else if (doublefnuttpos > -1 && (doublefnuttpos < singlefnuttpos || singlefnuttpos == -1) && (doublefnuttpos < spacepos || spacepos == -1)) {
        endpos = rest.indexOf('"', rest.indexOf('"', startpos) + 1);
      } else if (singlefnuttpos > -1 && (singlefnuttpos < doublefnuttpos || doublefnuttpos == -1) && (singlefnuttpos < spacepos || spacepos == -1)) {
        endpos = rest.indexOf("'", rest.indexOf("'", startpos) + 1);
      }
      if (!endpos || endpos == -1 || endpos < startpos) { endpos = rest.length; }
      done += rest.substring(0, startpos);
      done += attributeValueMode(rest.substring(startpos, endpos + 1));
      rest = rest.substr(endpos + 1);
    }
    return "<span style=color:" + attributecolor + ">" + done + rest + "</span>";
  }
  function attributeValueMode(txt) {
    return "<span style=color:" + attributevaluecolor + ">" + txt + "</span>";
  }
  function commentMode(txt) {
    return "<span style=color:" + commentcolor + ">" + txt + "</span>";
  }
  function cssMode(txt) {
    var rest = txt, done = "", s, e, comment, i, midz, c, cc;
    comment = new extract(rest, /\/\*/, "*/", commentMode, "W3CSSCOMMENTPOS");
    rest = comment.rest;
    while (rest.search("{") > -1) {
      s = rest.search("{");
      midz = rest.substr(s + 1);
      cc = 1;
      c = 0;
      for (i = 0; i < midz.length; i++) {
        if (midz.substr(i, 1) == "{") { cc++; c++ }
        if (midz.substr(i, 1) == "}") { cc--; }
        if (cc == 0) { break; }
      }
      if (cc != 0) { c = 0; }
      e = s;
      for (i = 0; i <= c; i++) {
        e = rest.indexOf("}", e + 1);
      }
      if (e == -1) { e = rest.length; }
      done += rest.substring(0, s + 1);
      done += cssPropertyMode(rest.substring(s + 1, e));
      rest = rest.substr(e);
    }
    rest = done + rest;
    rest = rest.replace(/{/g, "<span style=color:" + cssdelimitercolor + ">{</span>");
    rest = rest.replace(/}/g, "<span style=color:" + cssdelimitercolor + ">}</span>");
    for (i = 0; i < comment.arr.length; i++) {
      rest = rest.replace("W3CSSCOMMENTPOS", comment.arr[i]);
    }
    return "<span style=color:" + cssselectorcolor + ">" + rest + "</span>";
  }
  function cssPropertyMode(txt) {
    var rest = txt, done = "", s, e, n, loop;
    if (rest.indexOf("{") > -1) { return cssMode(rest); }
    while (rest.search(":") > -1) {
      s = rest.search(":");
      loop = true;
      n = s;
      while (loop == true) {
        loop = false;
        e = rest.indexOf(";", n);
        if (rest.substring(e - 5, e + 1) == "&nbsp;") {
          loop = true;
          n = e + 1;
        }
      }
      if (e == -1) { e = rest.length; }
      done += rest.substring(0, s);
      done += cssPropertyValueMode(rest.substring(s, e + 1));
      rest = rest.substr(e + 1);
    }
    return "<span style=color:" + csspropertycolor + ">" + done + rest + "</span>";
  }
  function cssPropertyValueMode(txt) {
    var rest = txt, done = "", s;
    rest = "<span style=color:" + cssdelimitercolor + ">:</span>" + rest.substring(1);
    while (rest.search(/!important/i) > -1) {
      s = rest.search(/!important/i);
      done += rest.substring(0, s);
      done += cssImportantMode(rest.substring(s, s + 10));
      rest = rest.substr(s + 10);
    }
    result = done + rest;
    if (result.substr(result.length - 1, 1) == ";" && result.substr(result.length - 6, 6) != "&nbsp;" && result.substr(result.length - 4, 4) != "&lt;" && result.substr(result.length - 4, 4) != "&gt;" && result.substr(result.length - 5, 5) != "&amp;") {
      result = result.substring(0, result.length - 1) + "<span style=color:" + cssdelimitercolor + ">;</span>";
    }
    return "<span style=color:" + csspropertyvaluecolor + ">" + result + "</span>";
  }
  function cssImportantMode(txt) {
    return "<span style=color:" + cssimportantcolor + ";font-weight:bold;>" + txt + "</span>";
  }
  function jsMode(txt) {
    var rest = txt, done = "", esc = [], i, cc, tt = "", sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, numpos, mypos, dotpos, y;
    for (i = 0; i < rest.length; i++) {
      cc = rest.substr(i, 1);
      if (cc == "\\") {
        esc.push(rest.substr(i, 2));
        cc = "W3JSESCAPE";
        i++;
      }
      tt += cc;
    }
    rest = tt;
    y = 1;
    while (y == 1) {
      sfnuttpos = getPos(rest, "'", "'", jsStringMode);
      dfnuttpos = getPos(rest, '"', '"', jsStringMode);
      compos = getPos(rest, /\/\*/, "*/", commentMode);
      comlinepos = getPos(rest, /\/\//, "<br>", commentMode);
      numpos = getNumPos(rest, jsNumberMode);
      keywordpos = getKeywordPos("js", rest, jsKeywordMode);
      dotpos = getDotPos(rest, jsPropertyMode);
      if (Math.max(numpos[0], sfnuttpos[0], dfnuttpos[0], compos[0], comlinepos[0], keywordpos[0], dotpos[0]) == -1) { break; }
      mypos = getMinPos(numpos, sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, dotpos);
      if (mypos[0] == -1) { break; }
      if (mypos[0] > -1) {
        done += rest.substring(0, mypos[0]);
        done += mypos[2](rest.substring(mypos[0], mypos[1]));
        rest = rest.substr(mypos[1]);
      }
    }
    rest = done + rest;
    for (i = 0; i < esc.length; i++) {
      rest = rest.replace("W3JSESCAPE", esc[i]);
    }
    return "<span style=color:" + jscolor + ">" + rest + "</span>";
  }
  function jsStringMode(txt) {
    return "<span style=color:" + jsstringcolor + ">" + txt + "</span>";
  }
  function jsKeywordMode(txt) {
    return "<span style=color:" + jskeywordcolor + ">" + txt + "</span>";
  }
  function jsNumberMode(txt) {
    return "<span style=color:" + jsnumbercolor + ">" + txt + "</span>";
  }
  function jsPropertyMode(txt) {
    return "<span style=color:" + jspropertycolor + ">" + txt + "</span>";
  }
  function getDotPos(txt, func) {
    var x, i, j, s, e, arr = [".", "<", " ", ";", "(", "+", ")", "[", "]", ",", "&", ":", "{", "}", "/", "-", "*", "|", "%"];
    s = txt.indexOf(".");
    if (s > -1) {
      x = txt.substr(s + 1);
      for (j = 0; j < x.length; j++) {
        cc = x[j];
        for (i = 0; i < arr.length; i++) {
          if (cc.indexOf(arr[i]) > -1) {
            e = j;
            return [s + 1, e + s + 1, func];
          }
        }
      }
    }
    return [-1, -1, func];
  }
  function getMinPos() {
    var i, arr = [];
    for (i = 0; i < arguments.length; i++) {
      if (arguments[i][0] > -1) {
        if (arr.length == 0 || arguments[i][0] < arr[0]) { arr = arguments[i]; }
      }
    }
    if (arr.length == 0) { arr = arguments[i]; }
    return arr;
  }
  function getKeywordPos(typ, txt, func) {
    var words, i, pos, rpos = -1, rpos2 = -1, patt;
    if (typ == "js") {
      words = ["abstract", "arguments", "boolean", "break", "byte", "case", "catch", "char", "class", "const", "continue", "debugger", "default", "delete",
        "do", "double", "else", "enum", "eval", "export", "extends", "false", "final", "finally", "float", "for", "function", "goto", "if", "implements", "import",
        "in", "instanceof", "int", "interface", "let", "long", "NaN", "native", "new", "null", "package", "private", "protected", "public", "return", "short", "static",
        "super", "switch", "synchronized", "this", "throw", "throws", "transient", "true", "try", "typeof", "var", "void", "volatile", "while", "with", "yield"];
    }
    for (i = 0; i < words.length; i++) {
      pos = txt.indexOf(words[i]);
      if (pos > -1) {
        patt = /\W/g;
        if (txt.substr(pos + words[i].length, 1).match(patt) && txt.substr(pos - 1, 1).match(patt)) {
          if (pos > -1 && (rpos == -1 || pos < rpos)) {
            rpos = pos;
            rpos2 = rpos + words[i].length;
          }
        }
      }
    }
    return [rpos, rpos2, func];
  }
  function getPos(txt, start, end, func) {
    var s, e;
    s = txt.search(start);
    e = txt.indexOf(end, s + (end.length));
    if (e == -1) { e = txt.length; }
    return [s, e + (end.length), func];
  }
  function getNumPos(txt, func) {
    var arr = ["<br>", " ", ";", "(", "+", ")", "[", "]", ",", "&", ":", "{", "}", "/", "-", "*", "|", "%", "="], i, j, c, startpos = 0, endpos, word;
    for (i = 0; i < txt.length; i++) {
      for (j = 0; j < arr.length; j++) {
        c = txt.substr(i, arr[j].length);
        if (c == arr[j]) {
          if (c == "-" && (txt.substr(i - 1, 1) == "e" || txt.substr(i - 1, 1) == "E")) {
            continue;
          }
          endpos = i;
          if (startpos < endpos) {
            word = txt.substring(startpos, endpos);
            if (!isNaN(word)) { return [startpos, endpos, func]; }
          }
          i += arr[j].length;
          startpos = i;
          i -= 1;
          break;
        }
      }
    }
    return [-1, -1, func];
  }
}
//php post data
function postData(url, formId, success, error) {
  const formData = new FormData($('#' + formId)[0]);
  const btn = $('#btn_' + formId)[0];
  btn.innerHTML = '&nbsp;<i class="fas fa-spinner fa-spin"></i>';

  return (
    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      dataType: "json",
      encode: true,
      processData: false,
      contentType: false,
      success: function (res) {
        success(formId, res);
        btn.innerHTML = 'Try again';
        btn.removeAttribute("disabled");
      },
      error: function (xhr) {
        if (xhr.readyState === 4) {
          //HTTP ERROR
          if (xhr.status === 400) {
            error(JSON.parse(xhr.responseText));
          }
        } else if (xhr.readyState === 0) {
          XSAlert({
            title: 'Network Error',
            message: 'A Network Error has occured 😠',
            icon: 'error',
          });
        }
        btn.innerHTML = 'Try again';
        btn.removeAttribute("disabled");
      }
    })
  );
}

//remove default prettifier
document.querySelectorAll('link').forEach(l => {
  if (l.href == 'https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/prettify.css') {
    l.remove();
  }
});

//helper script for showing errors
/*
* octavalidate - PHP Helper Script
* This script helps to display server-side validation errors on the
* frontend for the end-user to see

* Make sure to include this script on the page that contains the form
*/

(function () {
  //global Styling
  if (!document.querySelector('style#octavalidate-global-style')) {
    const ovStyle = document.createElement("style");
    ovStyle.id = "octavalidate-global-style";
    ovStyle.innerHTML = `
    .octavalidate-inp-error:not([type="checkbox"], [type="file"], [type="radio"]){
    border-color: #e43f5a !important;
background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
background-repeat: no-repeat;
background-position: right calc(0.375em + 0.1875rem) center;
background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
} 
.octavalidate-inp-success:not([type="checkbox"], [type="file"], [type="radio"]){
    border-color: #4caf50 !important;
background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
background-repeat: no-repeat;
background-position: right calc(0.375em + 0.1875rem) center;
background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
.octavalidate-txt-error{
    display:block;
    color : #d10745;
    font-size: 1rem;
    margin: 5px 0px 0px 0px;
}`;
    document.head.appendChild(ovStyle);
  }
}());
function removeErrors(form_id) {
  const formChildren = document.querySelector('#' + form_id).children;
  let ind = 0;
  if (formChildren) {
    while (ind < formChildren.length) {
      //p tag
      const pTag = formChildren[ind].querySelector('p');
      //input tag
      const inputTag = formChildren[ind].querySelector('input');
      //textarea
      const textTag = formChildren[ind].querySelector('textarea');
      if (pTag && pTag.classList.contains('octavalidate-txt-error')) {
        pTag.remove();
      }
      if (inputTag && inputTag.classList.contains('octavalidate-inp-error')) {
        inputTag.classList.remove('octavalidate-inp-error');
        inputTag.classList.add('octavalidate-inp-success');
      }
      if (textTag && textTag.classList.contains('octavalidate-inp-error')) {
        textTag.classList.remove('octavalidate-inp-error');
        textTag.classList.add('octavalidate-inp-success');
      }
      ind++;
    }
  }
}
function showErrors(errorsObj) {
  const isObject = (obj) => {
    return (Object.prototype.toString.call(obj) === '[object Object]');
  };
  const findElem = (id) => {
    return (document.querySelector('#' + id) !== null);
  };
  if (typeof errorsObj == "undefined" || !isObject(errorsObj) || Object.keys(errorsObj).length === 0)
    throw new Error(
      "A Valid Object must be passed as an argument to the [showBackendErrors] method if you want to display server-side Form Errors.")
  //assign form id
  const form_id = Object.keys(errorsObj)[0];
  if (!findElem(form_id))
    throw new Error(`A form with this id [${form_id}] does not Exist`)

  removeErrors(form_id);

  //loop through error object
  Object.entries(errorsObj[form_id]).forEach(eo => {
    const inputName = (eo[0] !== undefined) ? eo[0] : null;
    const errorText = (eo[1] !== undefined) ? eo[1] : null;
    if (inputName && errorText) {
      //check if this error is for 2 form inputs
      if (inputName.match(/:/)) {
        inputName.split(':').forEach(inp => {
          //loop through all form inputs
          document.querySelectorAll('#' + form_id + ' [name]').forEach(ie => {
            if (ie.name === inp) {
              //remove success class
              ie.classList.remove('octavalidate-inp-success');
              //add error class
              if (!ie.classList.contains('octavalidate-inp-error')) {
                ie.classList.add("octavalidate-inp-error");
              }
              //create error text
              const g = document.createElement("p");
              //check if id exists on element
              if (ie.id) {
                g.setAttribute("id", "octavalidate_" + ie.id);
              } else {
                //use input name if id does not exist
                g.setAttribute("id", "octavalidate_" + inp);
              }
              g.setAttribute("class", "octavalidate-txt-error");
              g.innerText = errorText;
              //insert after
              ie.after(g);
            }
          });
        })
      } else {
        //loop through all form inputs
        document.querySelectorAll('#' + form_id + ' [name]').forEach(ie => {
          if (ie.name === inputName) {
            //remove success class
            ie.classList.remove('octavalidate-inp-success');
            //add error class
            if (!ie.classList.contains('octavalidate-inp-error')) {
              ie.classList.add("octavalidate-inp-error");
            }
            //create error text
            const g = document.createElement("p");
            if (ie.id) {
              g.setAttribute("id", "octavalidate_" + ie.id);
            } else {
              g.setAttribute("id", "octavalidate_" + inputName);
            }
            g.setAttribute("class", "octavalidate-txt-error");
            g.innerText = errorText;
            //insert after
            ie.after(g);
          }
        });
      }
    }
  });
}