import axios from 'axios'
import * as source from '..'
const proxy = 'https://cors-anywhere.herokuapp.com/'

export const SortBy = async(sortqueryString, resLength, skip) => {
        const url = `${proxy}https://sid-task-manager-api.herokuapp.com/tasks/?${sortqueryString ? sortqueryString :`limit=5&skip=${skip}`}`

    const res = await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        }
    })
    if (res) {
        if (res.data.length === 5) {
            skip += 5
            source.removeRow()
            source.RenderTable(res.data)
            source.mouseEvent()

            if (resLength / skip === Infinity) {
                document.querySelector('.nextBtn').style.display = 'block';

            } else if (resLength / skip === 1) {
                document.querySelector('.nextBtn').style.display = 'none';

            } else if (resLength / skip > 1) {
                document.querySelector('.nextBtn').style.display = 'block';
            }

        } else {
            source.removeRow();
            source.RenderTable(res.data);
            source.mouseEvent();
            document.querySelector('.nextBtn').style.display = 'none';
        }
        source.sortByOrder()
    }
}