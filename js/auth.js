const $email = document.querySelector('.email')
const $password = document.querySelector('.password')
const $signin = document.querySelector('.login')
const $error = document.querySelector('.error')
$signin.addEventListener('click', e =>{
    e.preventDefault()

    if($email.value === 'abdul' && $password.value === 'admin'){
        $error.innerHTML = 'Вы успешно авторизовались'
        $error.classList.remove('text-danger')
        $error.classList.add('text-success')
        setTimeout(() => {
            window.open('./index.html', '_self')
        }, 1000)

    }else{
        $email.style.borderColor = 'red'
        $password.style.borderColor = 'red'
        $error.innerHTML = 'Неверный логин или пароль!'

    }
})