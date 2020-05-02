import * as loginmodel from '../model/loginModel'
import * as signUpview from '../views/signUpView'


export const logpg = () => {
    var markup = `
    <div class="overall-div">
    <div class="login-box">
     <img src="./img/avatar.png" class="avatar">
    <h1>Login Here</h1>
    <form>
        <p>Email</p>
        <input type="text" class="email" name="email" placeholder="Enter Email">
        <p class="err-msg1"></p>
        <p>Password</p>
        <input type="password" class="password" name="password" placeholder="Enter Password">
        <p class="err-msg2"></p>
        <input type="submit" class="submit" value="Login">
        <p class="signup-link">New User? Click Here</p>
    </form>
    </div>

    </div>`

    var main = document.querySelector('.main-sec')

    if (main) {
        main.insertAdjacentHTML('afterbegin', markup);
    }

    var subbu = document.querySelector('.submit')
    var signup = document.querySelector('.signup-link')


    subbu.addEventListener('click', async(e) => {
        e.preventDefault()
        console.log('Hello')
        await loginmodel.submitForm()

    })
    signup.addEventListener('click', (e) => {
        e.preventDefault()
        main.innerHTML = ''
        signUpview.signup()

    })
}