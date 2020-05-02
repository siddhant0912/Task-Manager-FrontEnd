import axios from 'axios'
import * as source from '..'
var proxy = 'https://cors-anywhere.herokuapp.com/'
export const logout = async() => {

    const url = `${proxy}https://sid-task-manager-api.herokuapp.com/users/logout`

    const res = await axios.post(url, {}, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        }
    })

    if (res.status === 200) {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('userId')
        source.checkToken()
    }
}

export const logoutAll = async() => {
    const url = `${proxy}https://sid-task-manager-api.herokuapp.com/users/logoutAll`

    const res = await axios.post(url, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        }
    })

    if (res.status === 200) {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('userId')
        source.checkToken()
    }

}