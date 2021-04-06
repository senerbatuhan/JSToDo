//Created Elements


const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

loadItems();




eventListeners();




function eventListeners() {
    // add event
    form.addEventListener('submit', addNewItem);

    //delete event
    taskList.addEventListener('click', deleteItem);

    //delete all items event
    btnDeleteAll.addEventListener('click', deleteAllItems);

}


function loadItems() {
    items = getItemsFromLS();
    items.forEach(function (item) {
        createItem(item);
    });
}

function getItemsFromLS() {
    if (localStorage.getItem('items') == null) {
        items = [];
    }
    else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

function setItemToLS(text) {
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}

function deleteItemFromLS(text) {
    items = getItemsFromLS();
    items.forEach(function (item, index) {
        if (item === text) {
            items.splice(index, 1)
        }
    });
    localStorage.setItem('items',JSON.stringify(items));
}



function createItem(text) {
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));
    const a = document.createElement('a');
    a.className = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fa fa-times"></i>';
    //add a to li
    li.appendChild(a);
    //add li under to ul
    taskList.appendChild(li);
}

function addNewItem(e) {
    if (input.value === '') {
        alert('add new item');
    }
    else {
        createItem(input.value);
        //append item from ls
        setItemToLS(input.value);
    }

    //clear input
    input.value = '';
    e.preventDefault();
}

function deleteItem(e) {

    if (e.target.className === 'fa fa-times') {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            //delete item from ls
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}

function deleteAllItems(e) {
    if (confirm('Are you sure?')) {
        while (taskList.firstChild) {
            taskList.firstChild.remove();
        }
        localStorage.clear();
    }

    e.preventDefault();
}