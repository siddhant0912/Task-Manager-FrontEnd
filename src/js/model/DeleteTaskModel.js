import axios from 'axios'
const proxy = 'https://cors-anywhere.herokuapp.com/'
export const deleteTask = async(id) => {
    const url = `${proxy}https://sid-task-manager-api.herokuapp.com/tasks/${id}`
    const res = await axios.delete(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        }
    })
    if (res) {
        return res
    }

}