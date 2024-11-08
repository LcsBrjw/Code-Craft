const burgerButton = document.querySelector('#burger-menu');
const topBar = document.querySelector('.top-bar');
const midBar = document.querySelector('.middle-bar');
const botBar = document.querySelector('.bottom-bar');


burgerButton.addEventListener('click', function() {
    topBar.classList.toggle('active')
    midBar.classList.toggle('active')
    botBar.classList.toggle('active')
})