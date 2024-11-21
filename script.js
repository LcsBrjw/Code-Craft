// CHOIX LOGIN SIGNIN
const userImg = document.querySelector('#user-img');
const signLog = document.querySelector('#sign-log');

userImg.addEventListener('click', function() {
    signLog.classList.toggle('active')
    logIn.classList.remove('active')

})


// GESTION LOGIN
const logButt = document.querySelector('#login-button');
const cancButt = document.querySelector('#annul');
const logIn = document.querySelector('#login');

logButt.addEventListener('click', function() {
    logIn.classList.add('active')
})
cancButt.addEventListener('click', function() {
    logIn.classList.remove('active')
    signLog.classList.remove('active')
})


// NAVIGATION VERS SIGNIN
const signButt = document.querySelector('#signin-button'); 

signButt.addEventListener('click', function() {
    window.location.href = '/signin'
})