function validator(options) {
    const selectorRules = []

    function validate(rule, inputElement) {
        const errElement = inputElement.parentElement.querySelector('#message')
        var errMessage
        const rules = selectorRules[rule.selector]
        for(let ruleTest of rules) {
            errMessage = ruleTest(inputElement.value)
            if(errMessage) break
        }
        if(errMessage) {
            errElement.innerHTML = errMessage
            inputElement.parentElement.classList.add('invalid')
        }else {
            errElement.innerHTML = ''
            inputElement.parentElement.classList.remove('invalid')
        }
        return !errMessage
    }


    const formElement = document.querySelector(options.form)
    if(formElement) {
        const btnLogin = formElement.querySelector('.login')
        btnLogin.onclick = function(e) {
            var isFormValid = true
            options.rules.forEach(rule => {
            const inputElement = formElement.querySelector(rule.selector)
                var isValid = validate(rule, inputElement)
                if(!isValid) {
                    isFormValid = false
                }
            })

            if(isFormValid) {
                // const formInputs = document.querySelectorAll('input[name]')
                // const formData = Array.from(formInputs).reduce((arr, cur) => {
                //     arr[cur.name] = cur.value
                //     return arr
                // },{})
                // creatUser(formData)
                saveData()
               
                const formRegister = document.querySelector('.modal__container')
                const formRegisterAccept = document.querySelector('.formRegisterAccept')
                const formRegisterAcceptButton = document.querySelector('.formRegisterAccept button')
                setTimeout(() => {
                    formRegister.style.display = 'none'
                    formRegisterAccept.style.display = 'block'
                },2000)
                formRegisterAcceptButton.onclick = function() {
                    location.reload()
                }
                
                
            }
        }

        options.rules.forEach(rule => {
            if(Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            }else {
                selectorRules[rule.selector] = [rule.test]
            }

            
            const inputElement = document.querySelector(rule.selector)
            inputElement.onblur = function() {
                validate(rule, inputElement)
            }

            inputElement.onkeypress = function() {
                const errElement = inputElement.parentElement.querySelector('#message')
                errElement.innerHTML = ''
                inputElement.parentElement.classList.remove('invalid')
            }
        })
    }

    

}

validator.isRequired = function(selector,message) {
    return {
        selector,
        test: function(value) {
            return value ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
}

validator.isEmail = function(selector) {
    return {
        selector,
        test: function(value) {
            const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return emailRegex.test(value) ? undefined : 'Vui lòng nhập đúng định dạng email'
        }
    }
}

validator.minLength = function(selector, min) {
    return {
        selector,
        test: function(value) {
            return value.length >= min ? undefined : `Mật khẩu tối thiểu ${min} ký tự`
        }
    }
}

validator.confirmed = function(selector, check) {
    return {
        selector,
        test: function(value) {
            return value === check() ? undefined : `Mật khẩu không trùng khớp`
        }
    }
}


validator({
    form: '#form-login',
    rules: [
        validator.isRequired('#fullname', 'Vui lòng nhập đầy đủ họ tên'),
        validator.isRequired('#email'),
        validator.isEmail('#email'),
        validator.isRequired('#password'),
        validator.minLength('#password',6),
        validator.isRequired('#passwordConfirm'),
        validator.confirmed('#passwordConfirm',function() {
            return document.querySelector('#password').value
        }),
    ],
})

// function creatUser(data) {
//     const obj = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     }
//     fetch('http://localhost:3000/user',obj)
//         .then(res => {
//             return res.json()
//         })
// }

// function check() {
//     fetch('http://localhost:3000/user')
//         .then(res => {
//             return res.json()
//         })
//         .then(data => {
//             const inputSigninName = document.querySelector('input[id="signinName"]')
//             const inputSigninPass = document.querySelector('input[id="signinPassword"]')
//             const signInBtn = document.querySelector('.signIn-button')
//             const signinMessage = document.querySelector('.signinMessage')
//             signInBtn.onclick = function() {
//                 data.map(index => {
//                     if(inputSigninName.value === index.fullname && inputSigninPass.value === index.password) {
//                         this.setAttribute('href','mp3.html')                     
//                     }else {
//                         signinMessage.innerText = 'Họ tên hoặc mật khẩu không trùng khớp'
//                     }
//                 })
//             }
//         })
// }
// check()

function saveData() {
    const nameInput = document.querySelector('input[id="fullname"]').value
    const emailInput = document.querySelector('input[id="email"]').value
    const passwordInput = document.querySelector('input[id="password"]').value
    const passwordConfirmInput = document.querySelector('input[id="passwordConfirm"]').value
    const listData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : []
    listData.push({
        fullname: nameInput,
        email: emailInput,
        password: passwordInput,
        passwordConfirm: passwordConfirmInput,
    })
    localStorage.setItem("userData",JSON.stringify(listData))
}


function check() {
    const listData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : []
    const inputSigninName = document.querySelector('input[id="signinName"]')
    const inputSigninPass = document.querySelector('input[id="signinPassword"]')
    const signInBtn = document.querySelector('.signIn-button')
    const signinMessage = document.querySelector('.signinMessage')
    signInBtn.onclick = function() {
        listData.map(data => {
            if(inputSigninName.value === data.fullname && inputSigninPass.value === data.password) {
                this.setAttribute('href','mp3.html')
            }else {
                signinMessage.innerText = 'Họ tên hoặc mật khẩu không trùng khớp'
            }     
        })
    }
}
check()

document.querySelector('.signIn__desc-bot a').onclick = function() {
    const forgotForm = document.querySelector('.forgotForm')
    const formSigin = document.querySelector('.signIn')
    forgotForm.style.display = 'block'
    formSigin.style.display = 'none'

}

document.querySelector('.closeForgot').onclick = function() {
    location.reload()
}

function fotgotPass() {
    const listData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : [] 
    const inputforgotName = document.querySelector('#forgotName')
    const inputforgotEmail = document.querySelector('#forgotEmail')
    const forgotButton = document.querySelector('.forgotForm button')
    const forgotMessage = document.querySelector('.forgotMessage')
    const fotgotshowPass = document.querySelector('.showPass')
    forgotButton.onclick = function() {
        const result = listData.find(data => {
            return inputforgotName.value === data.fullname && inputforgotEmail.value === data.email
        })
        if(result === undefined) {
            forgotMessage.innerText = 'Họ tên hoặc mật khẩu không chính xác'
        }else {
            forgotMessage.innerText = ''
            fotgotshowPass.innerText = `Password: ${result.password}`
        }
    }
}
fotgotPass()

