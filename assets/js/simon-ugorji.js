/**TYPED JS**/
const typedOpts = {
    strings: ["&lt; Full-Stack Web Developer /&gt;", "&lt; Technical Writer /&gt;", "&lt; Product hunter /&gt;"],
    typeSpeed: 50,
    backSpeed: 50,
    loop: true,
    fadeOut: true,
    showCursor: false
};
const typed = new Typed('#my_intro', typedOpts);

/** particles js **/
particlesJS("particles-js", { "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#50d38a" }, "shape": { "type": "image", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 }, "image": { "src": "assets/img/code.png", "width": 100, "height": 100 } }, "opacity": { "value": 0.49705773886831206, "random": true, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 16.03412060865523, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } }, "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": true });

/*CONTACT ME*/
//init function
const formVal = new octaValidate('form_contact', {strictMode : true, successBorder: true});
//listen for submission
document.querySelector('#form_contact').addEventListener('submit', function (e) {
    e.preventDefault();
    if (formVal.validate() === true) {
        e.currentTarget.submit();
    }
})