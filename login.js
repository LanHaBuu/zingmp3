const signUp = document.querySelector('.signIn__desc-on a')
const modalElement = document.querySelector('.modal')
const modalContainer = document.querySelector('.modal__container')
const modalClose = document.querySelector('.modal__header i')
const inputName = document.querySelector('#signinName')
const inputPass = document.querySelector('#signinPassword')
const typeText = document.querySelector('.text-typing')


modalClose.onclick = function() {
    modalElement.classList.remove('open')
    location.reload()
}

signUp.onclick = function() {
    modalElement.classList.add('open')
}

modalElement.onclick = function() {
    modalElement.classList.remove('open')
    location.reload()
}

modalContainer.onclick = function(e) {
    e.stopPropagation()
}

inputName.onmousedown = function() {
    typeText.style.display = 'none'
}

inputPass.onmousedown = function() {
    typeText.style.display = 'none'
}