import axios from 'axios'
import * as TaskView from '../views/TaskView'
import * as source from '..'
import * as SortBy from './SortModel'

const proxy = 'https://cors-anywhere.herokuapp.com/'

export const createTasks = async(Description, Status) => {
    const url = `${proxy}https://sid-task-manager-api.herokuapp.com/tasks`
    const res = await axios.post(url, {
        Description,
        Status,
        createdAt: new Date().getTime()
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        }
    })

    if (res) {

        //get task
        const length = await TaskView.getTask()

        //pagination
        await SortBy.SortBy(undefined, length, 0)

        // document.querySelector('.prevBtn').style.display = 'none';
        // document.querySelector('.nextBtn').style.display = 'none';
    }
}