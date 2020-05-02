import * as logout from '../model/logoutModel'
import * as Task from '../model/TasksModel'
import * as TaskView from '../views/TaskView'
import * as Sort from '../model/SortModel'
import * as DeleteUser from '../model/DeleteUserModel'
import * as source from '..'
import * as Profile from '../model/ProfileModel'
export const RenderMainView = async() => {
    var markup = ` <div class="cont">
    <div class="addTask">
        <div class="addTask-section">
            <form>
                <h><b>Add a To-Do</b></h>
                <input type="text" class="task-name" name="Description" placeholder="Enter Task Description">
                <input type="" class="status" name="Status" placeholder="Enter Status(true/false)">
                <button class="task-submit">Submit</button>
                <button class="task-list">List Tasks</button>
            </form>
        </div>
        <div class="hide">
            <input class="avatrUrl" type="text">
        </div>

        <div class="logout">
            <button type="submit">Signout</button>
        </div>

        <div class="profilePic">
            <img class="userImg" src="" alt="User Profile"><br/>

            <div class="fileSelector">
                <input type="file" name="avatar"><br/>
                <button class="upload" type="submit">Upload</button>
            </div>
        </div>

        <div class="dropdown">
            <button class="dropbtn"><img src="https://image.flaticon.com/icons/svg/25/25243.svg" alt="arrow down"></button>
            <div id="myDropdown" class="dropdown-content">
                <button class="remove" type="submit">Remove Profile</button>
                <button class="add" type="file">Add Profile</button>
                <button class="logoutAll" type="submit">Logout All</button>
                <button class="delete-user" type="submit">Delete Account</button>
            </div>
        </div>
    </div>

    <div class="showTask">
        <div class="table">
            <table id="table-data">
            </table>
        </div>
        <div class="arrowNextPrev"></div>
    </div>
</div>
    `
    document.querySelector('.main-sec').innerHTML = markup

    document.querySelector('.logout').addEventListener('click', async(e) => {
        e.preventDefault()
        await logout.logout()
    })
    const dropbtn = document.querySelector('.dropbtn')
    dropbtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('myDropdown').classList.toggle('show')
    })

    const logoutAll = document.querySelector('.logoutAll')
    logoutAll.addEventListener('click', async(e) => {
        e.preventDefault()
        await logout.logoutAll()
    })
    const delete_user = document.querySelector('.delete-user')
    delete_user.addEventListener('click', async(e) => {
        e.preventDefault()
        await DeleteUser.deleteUser()
    })

    const tasksubmit = document.querySelector('.task-submit')
    tasksubmit.addEventListener('click', async(e) => {
        const task_name = document.querySelector('.task-name')
        const status = document.querySelector('.status')
        e.preventDefault()
        if (task_name && status) {
            await Task.createTasks(task_name.value, status.value)
            task_name.value = ''
            status.value = ''
            task_name.focus();
        }

    })
    if (window.localStorage.getItem('avatarUrl')) {
        const userId = window.localStorage.getItem('userId');
        await Profile.getProfilePic(userId);

    } else {
        const markup = `<img src="./img/avatar.png" alt="User Profile">`;
        document.querySelector('.profilePic').insertAdjacentHTML('afterbegin', markup);
    }
    const listtask = document.querySelector('.task-list')
    listtask.addEventListener('click', async(e) => {
        e.preventDefault()
        const length = await TaskView.getTask()
        await Sort.SortBy(undefined, length, 0)
        await source.sortForPagination(length)

    })
    const previousButton = () => {
        const html = `
            <div class="prevBtn">
                <button class="previous"><img src="https://image.flaticon.com/icons/svg/25/25184.svg">Prev</button>
            </div>
        `;
        document.querySelector('.arrowNextPrev').insertAdjacentHTML('beforeend', html);
    };

    const nextButton = () => {
        const html = `
            <div class="nextBtn">
                <button class="next">Next<img src="https://image.flaticon.com/icons/svg/25/25446.svg"></button>            
            </div>
        `;

        document.querySelector('.arrowNextPrev').insertAdjacentHTML('beforeend', html);
    };
    nextButton();
    previousButton();

    const add = document.querySelector('.add')
    add.addEventListener('click', e => {
        e.preventDefault()
        document.querySelector('.fileSelector').style.display = 'block';
        document.querySelector('.upload').style.display = 'block';
    })

    const remove = document.querySelector('.remove')
    remove.addEventListener('click', async(e) => {
        e.preventDefault()
        await Profile.RemoveProfilePic()
    })

    const upload = document.querySelector('.upload')
    if (upload) {
        upload.addEventListener('click', async(e) => {
            e.preventDefault()
            const file = e.target.parentNode.children[0].files[0]
            await Profile.uploadProfilePic(file)


        })
    }
}