import axios from 'axios'
import * as source from '..'

const proxy = 'https://cors-anywhere.herokuapp.com/'

export const deleteUser = async() => {
    const url = `${proxy}https://sid-task-manager-api.herokuapp.com/users/me`
    const res = await axios.delete(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        }
    })

    if (res) {
        window.localStorage.removeItem('token')
        source.checkToken()
    }
}