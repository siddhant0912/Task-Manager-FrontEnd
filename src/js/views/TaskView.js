import axios from 'axios'

const proxy = 'https://cors-anywhere.herokuapp.com/'
export const getTask = async() => {

    const url = `${proxy}https://sid-task-manager-api.herokuapp.com/tasks`

    const res = await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'applicationn/json',
            'Authorization': window.localStorage.getItem('token')
        }
    })
    if (res) {
        return res.data.length;
    }
}