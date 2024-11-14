// BURGER MENU

const burgerButton = document.querySelector('#burger-menu');
const burgerMenu = document.querySelector('#burger-nav');
const topBar = document.querySelector('.top-bar');
const midBar = document.querySelector('.middle-bar');
const botBar = document.querySelector('.bottom-bar');


burgerButton.addEventListener('click', function() {
    topBar.classList.toggle('active')
    midBar.classList.toggle('active')
    botBar.classList.toggle('active')
    burgerMenu.classList.toggle('active')
    signLog.classList.remove('active')
    logIn.classList.remove('active')
})




// CHOIX LOGIN SIGNIN
const userImg = document.querySelector('#user-img');
const signLog = document.querySelector('#sign-log');

userImg.addEventListener('click', function() {
    signLog.classList.toggle('active')
    burgerMenu.classList.remove('active')
    topBar.classList.remove('active')
    midBar.classList.remove('active')
    botBar.classList.remove('active')
})


// GESTION LOGIN
const logButt = document.querySelector('#login-button');
const cancButt = document.querySelector('#annul');
const logIn = document.querySelector('#login');

logButt.addEventListener('click', function() {
    logIn.classList.add('active')
    burgerMenu.classList.remove('active')
})
cancButt.addEventListener('click', function() {
    logIn.classList.remove('active')
})


