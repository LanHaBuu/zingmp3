const toast = document.getElementById('toast')
const subnavBtns = document.querySelectorAll('.sidebar__subnav-item span')
const themeColor = document.querySelector('.header__info-item-theme')
const themeWhite = document.querySelector('.header__color-item--white')
const themeBlack = document.querySelector('.header__color-item--black')
const themeBlue = document.querySelector('.header__color-item--blue')
const themeGreen = document.querySelector('.header__color-item--green')
const inputColor = document.querySelector('.inputColor')


for(let subnavBtn of subnavBtns){
    subnavBtn.onclick = function(){
        const htmls = `
    <div class="notify">
        <div class="notify__icon">
        <i class="fa-solid fa-bell"></i>
        </div>
        <div class="notify__content">
                <div class="notify__heading">Thông báo</div>
            <div class="notify__text">Tính năng chưa hoàn thiện, bạn vui lòng thông cảm</div>
        </div>
        <div class="notify__close">
            <i class="fa-solid fa-xmark"></i>
        </div>   
   </div>
    `
    toast.innerHTML = htmls
    }
}


themeColor.onclick = function() {
    this.classList.toggle('active')
}

themeWhite.onclick = function() {
    document.body.removeAttribute('class')
    document.body.classList.add('white')
}

themeBlack.onclick = function() {
    document.body.removeAttribute('class')
    document.body.classList.add('black')
}

themeBlue.onclick = function() {
    document.body.removeAttribute('class')
    document.body.classList.add('blue')
}

themeGreen.onclick = function() {
    document.body.removeAttribute('class')
    document.body.classList.add('green')
}

inputColor.oninput = function() {
    const rgba = Number(this.value)
    document.body.style.backgroundColor = `rgba(0,0,0,${rgba/100})`   
    if(document.body.classList.contains('black')) {
        document.body.style.backgroundColor = `rgba(0,0,0,${rgba/100})`   
    }
    if(document.body.classList.contains('white')) {
        document.body.style.backgroundColor = `rgba(255,255,255,${rgba/100})`   
    }
    if(document.body.classList.contains('green')) {
        document.body.style.backgroundColor = `rgba(18,69,52,${rgba/100})`   
    }
    if(document.body.classList.contains('blue')) {
        document.body.style.backgroundColor = `rgba(29,55,90,${rgba/100})`   
    }
}

//slide
