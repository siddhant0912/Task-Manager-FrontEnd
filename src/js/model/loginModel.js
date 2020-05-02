import axios from 'axios'
import * as source from '..'
const userlogin = async(email, password, headers) => {

    const proxy = `https://cors-anywhere.herokuapp.com/`
    const url = `${proxy}https://sid-task-manager-api.herokuapp.com/users/login`



    try {
        const res = await axios.post(url, {
            email,
            password,
        }, {
            headers
        })
        if (res.status === 400) {
            document.querySelector('.err-msg2').innerHTML = `Wrong password`
        } else if (res) {
            console.log(res.status)
            window.localStorage.setItem('userId', res.data.user._id)
            window.localStorage.setItem('token', res.data.token)
            source.checkToken()
        }

    } catch (e) {
        console.log(e)
    }
}

export const submitForm = () => {
    let headers = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const email = document.querySelector('.email').value
    const password = document.querySelector('.password').value
    userlogin(email, password, headers)
}