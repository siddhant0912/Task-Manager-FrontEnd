import * as signupAc from '../model/signUpModel'
import * as loginView from '../views/loginview'

export const signup = () => {
    const markup = `
    <div class="overall-div">
    <div class="login-box">
    <img src="./img/avatar.png" class="avatar">
    <h1>Sign Up Here</h1>
    <form>
        <p>Username</p>
        <input type ="text" class="name" name="name" placeholder="Enter Name" required>
        <p>Email</p>
        <input type="text" class="email" name="email" placeholder="Enter Email" required>
        <p class="err-msg1"></p>
        <p>Password</p>
        <input type="password" class="password" name="password" placeholder="Enter Password">
        <p class="err-msg2"></p>
        <input type="submit" id="sign-up" class="submit" value="Sign Up">
        <p class ="signup-link">Click Here For Log In</p>
    </form>
    </div>
    </div>`
    document.querySelector('.main-sec').insertAdjacentHTML('afterbegin', markup)
    const signup = document.getElementById('sign-up');

    signup.addEventListener('click', async(e) => {
        e.preventDefault()
        await signupAc.userSignup()
    })

    document.querySelector('.signup-link').addEventListener('click', (e) => {
        e.preventDefault()
        document.querySelector('.overall-div').innerHTML = ''
        loginView.logpg()

    })

}