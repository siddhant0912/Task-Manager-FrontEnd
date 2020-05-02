import axios from 'axios'
import * as source from '..'
const proxy = 'https://cors-anywhere.herokuapp.com/'

export const uploadProfilePic = async(file) => {

    const url = `${proxy}https://sid-task-manager-api.herokuapp.com/users/me/avatar`

    const data = new FormData()
    data.append('avatar', file)
    const res = await axios.post(url, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
            'Authorization': window.localStorage.getItem('token')
        }
    })
    if (res) {
        document.querySelector('.fileSelector').style.display = 'none';
        document.querySelector('.upload').style.display = 'none';
        console.log('Upload Succesful')
        const id = window.localStorage.getItem('userId')
        getProfilePic(id)
    }

}

export const getProfilePic = async(id) => {
    const url = `${proxy}https://sid-task-manager-api.herokuapp.com/users/${id}/avatar`

    const res = await axios.get(url, {
        headers: {
            'Content-Type': '   application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Method': 'GET, POST, OPTIONS',
        }
    })
    if (res) {
        source.CheckForAvatar(res)
    } else {
        source.CheckForAvatar(res)
    }

}

export const RemoveProfilePic = async() => {
    const url = `${proxy}https://sid-task-manager-api.herokuapp.com/users/me/avatar`
    const res = await axios.delete(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        }
    })
    if (res) {
        window.localStorage.removeItem('avatarUrl')
        const profilepic = document.querySelector('.profilePic')
        profilepic.removeChild(profilepic.children[0])

        const userImg = document.querySelector('.userImg')
        userImg.style.display = 'block'
        userImg.setAttribute('src', './img/avatar.png')
    }
}