import axios from 'axios'

const proxy = 'https://cors-anywhere.herokuapp.com/'

export const updateTask = async(desc, status, id) => {
    const url = `${proxy}https://sid-task-manager-api.herokuapp.com/tasks/${id}`

    const res = await axios.patch(url, {
        Description: desc,
        Status: status
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        }
    })

    if (res) {
        return res
    }
}