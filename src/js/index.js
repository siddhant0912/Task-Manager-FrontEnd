import * as loginView from './views/loginview'
import * as todoView from './views/TodoView'
import * as UpdateTask from './model/UpdateTaskModel'
import * as DeleteTask from './model/DeleteTaskModel'
import * as TaskView from './views/TaskView'
import * as Sort from './model/SortModel'


export const checkToken = async() => {

    document.querySelector('.main-sec').innerHTML = ''

    if (window.localStorage.getItem('token')) {

        document.body.style.background = 'none'
        document.title = 'HomePage | Task Manager'
        await todoView.RenderMainView()
    } else {
        loginView.logpg()
        document.title = 'Log In | Task Manager'
        document.body.style.setProperty('background', 'url(/img/back.jpg)')
        document.body.style.setProperty('background-size', 'cover')
        document.body.style.setProperty('background-position', 'center')
    }
}
checkToken();

const giveRowClass = (table) => {
    for (var i = 1; i < table.rows.length; i++) {
        const tr = document.getElementsByTagName("TR")[i];
        var att = document.createAttribute("class");
        att.value = "row";
        tr.setAttributeNode(att);
    };
};

const TableHead = (arrhead) => {
    const table = document.querySelector('table')
    const tr = table.insertRow(table.rows.length)

    arrhead.forEach(el => {
        const th = document.createElement('th')
        th.innerHTML = el
        tr.appendChild(th)

    });

}

const TableData = (arrdata) => {

    const table = document.querySelector('table');
    const tr = table.insertRow(table.rows.length);
    arrdata.forEach((el) => {
        const td = document.createElement('td');
        td.innerHTML = el;
        tr.appendChild(td);
    });

    giveRowClass(table);

    const tableRows = document.querySelectorAll('.row');
    tableRows.forEach((el) => {
        el.children[7].style.borderTopStyle = 'hidden';
        el.children[7].style.borderRightStyle = 'hidden';
        el.children[7].style.borderBottomStyle = 'hidden';
    });
}

export const removeRow = () => {
    const table = document.querySelector('table');
    const tableRow = document.querySelectorAll('tr');

    tableRow.forEach((el) => {
        const index = el.rowIndex;
        table.deleteRow(index);
    });
}

export const RenderTable = async(res) => {
    const editBtn = `<div class="taskEditBtn">
   <button class="editTaskBtn"><ion-icon name="pencil-outline"></ion-icon></button>
    <button class="deleteTaskBtn"><ion-icon name="trash-outline"></ion-icon></button>                
    <button class="saveBtn"><ion-icon name="save-outline"></ion-icon></button>
    </div>`


    const editDes = `<div class="inputEdit"><input type="text" placeholder="Enter new Description"></div>`
    const ediSta = `<div class="inputEdit"><input type="text" placeholder="Enter new Status"></div>`
    const sort = `<button class="sortByBtn"><ion-icon name="chevron-up-outline"></ion-icon></button>`;


    if (res.length >= 1) {
        const headArr = Object.keys(res[0])
        var num = 0
        TableHead(['No.', headArr[2], headArr[0], headArr[3] + sort, headArr[5], headArr[1], headArr[4]]);
        res.forEach((el) => {
            let resValue = Object.values(el);
            const resValue3 = moment(resValue[3]).format('hh:mm a D/MM/YY');
            const resValue5 = moment(resValue[5]).format('hh:mm a D/MM/YY');


            TableData([num += 1, resValue[2] + editDes, resValue[0] + ediSta, resValue3, resValue5, resValue[1], resValue[4], editBtn]);
        });
    }
}

export const mouseEvent = () => {
    const editDes = `<div class="inputEdit"><input type="text" placeholder="Enter new Description"></div>`
    const ediSta = `<div class="inputEdit"><input type="text" placeholder="Enter new Status"></div>`

    const table = document.querySelector('table');
    const tableRows = document.querySelectorAll('.row');

    tableRows.forEach((el) => {
        el.addEventListener('mouseover', (e) => {
            e.preventDefault();
            el.children[7].children[0].style.display = 'block';
        });
    });
    tableRows.forEach((el) => {
        el.addEventListener('mouseout', (e) => {
            e.preventDefault();
            el.children[7].children[0].style.display = 'none';
        });
    });
    tableRows.forEach((el) => {
        const id = el.children[5].innerHTML;
        const ownerId = el.children[6].innerHTML;

        el.children[7].children[0].children[0].onclick = function(e) {
            e.preventDefault();
            el.children[7].children[0].children[0].style.display = 'none';
            el.children[7].children[0].children[1].style.display = 'none';
            el.children[7].children[0].children[2].style.display = 'block'
            el.children[1].children[0].style.display = 'inline-block';
            el.children[2].children[0].style.display = 'inline-block';
            const descValue = el.children[1].outerText.replace(' ', '');
            const compValue = el.children[2].outerText.replace(' ', '');

            el.children[1].children[0].children[0].value = descValue;
            el.children[2].children[0].children[0].value = compValue;
        };
        el.children[7].children[0].children[2].onclick = async function(e) {
            e.preventDefault();

            if (!el.children[1].children[0].children[0].value) {
                el.children[7].children[0].children[0].style.display = 'inline-block';
                el.children[7].children[0].children[1].style.display = 'inline-block';
                el.children[7].children[0].children[2].style.display = 'none';
                el.children[1].children[0].style.display = 'none';
                el.children[2].children[0].style.display = 'none';

                return alert('Nothing Changed!');
            }

            const descriptionValue = el.children[1].children[0].children[0].value;
            const completedValue = el.children[2].children[0].children[0].value;
            console.log(descriptionValue, completedValue, id)

            const updateTaskRes = await UpdateTask.updateTask(descriptionValue, completedValue, id);

            el.children[1].children[0].style.display = 'none';
            el.children[2].children[0].style.display = 'none';

            el.children[1].innerHTML = updateTaskRes.data.Description + editDes;
            el.children[2].innerHTML = updateTaskRes.data.Status + ediSta;
            el.children[4].innerHTML = moment(new Date().getTime()).format('hh:mm a D/MM/YY');

            el.children[7].children[0].children[0].style.display = 'inline-block';
            el.children[7].children[0].children[1].style.display = 'inline-block';
            el.children[7].children[0].children[2].style.display = 'none';
        };


        el.children[7].children[0].children[1].onclick = async function(e) {
            e.preventDefault();
            const res = await DeleteTask.deleteTask(id)

            if (res) {
                const index = el.rowIndex;
                table.deleteRow(index);
                tableRows.forEach((cur) => {
                    cur.children[0].innerHTML = cur.rowIndex;
                });
            }
        };
    });


}
let sum = 0
let count = 1
export const sortByOrder = () => {
    const sortBtn = document.querySelector('.sortByBtn')

    if (sortBtn) {
        sortBtn.addEventListener('click', async(e) => {
            e.preventDefault()
            let order
            if (count % 2 === 0) {
                order = 'asec'
            } else {
                order = 'desc'
            }
            await Sort.SortBy(`limit=5&skip=${sum}&sortedBy=createdAt:${order}`)
            count++
        })
    }
}


export const sortForPagination = (length) => {
    const next = document.querySelector('.next')
    const prev = document.querySelector('.previous')

    prev.addEventListener('click', async(e) => {
        e.preventDefault()
        sum -= 5
        const lt = await TaskView.getTask()
        await Sort.SortBy(undefined, lt, sum)
        if (sum <= 0) {
            document.querySelector('.previous').style.display = 'none';
        }
    })

    next.addEventListener('click', async(e) => {
        e.preventDefault()
        sum += 5
        const lt = await TaskView.getTask()
        await Sort.SortBy(undefined, lt, sum)
        if (sum >= 5) {
            document.querySelector('.prevBtn').style.display = 'block';
        }
    })


}
export const CheckForAvatar = (res) => {
    let imgurl

    const profilepic = document.querySelector('.profilePic')
    profilepic.removeChild(profilepic.children[0])

    const response = res.config.url.replace('https://cors-anywhere.herokuapp.com/', '')
    if (res.config.url) {
        var inpurl = document.querySelector('.hide input');
        inpurl.setAttribute('value', response)
        window.localStorage.setItem('avatarUrl', response)
        imgurl = window.localStorage.getItem('avatarUrl')
    } else {
        imgurl = './img/avatar.png'
    }
    const markup = `<img src="${imgurl}" alt="User Profile">`
    profilepic.insertAdjacentHTML('afterbegin', markup)
}