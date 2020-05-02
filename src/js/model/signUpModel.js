import axios from 'axios'
import * as source from '..'




const createUser = async(obj, headers) => {
    const proxy = `https://cors-anywhere.herokuapp.com/`
    const url = `${proxy}https://sid-task-manager-api.herokuapp.com/users`

    const res = await axios.post(url, {
        name: obj.name,
        email: obj.email,
        password: obj.password
    }, {
        headers
    })
    if (res) {
        window.localStorage.setItem('token', res.data.token)
        window.localStorage.setItem('userId', res.data.user._id)
        source.checkToken()
    }

}
export const userSignup = () => {
    let headers = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const name = document.querySelector('.name').value
    const email = document.querySelector('.email').value
    const password = document.querySelector('.password').value
    console.log(name, email, password)
    createUser({ name, email, password }, headers)
}