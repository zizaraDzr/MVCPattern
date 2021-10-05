const init = (document => {
    const todoForm = document.getElementById('todo-form')
    const addInput = document.getElementById('add-input')
    const todoList = document.getElementById('todo-list')
    const todoItem = document.querySelectorAll('.todo-item')
    
    function addTodoItem (event) {
        event.preventDefault()
    
        if (!addInput.value) return error('введите данные')
        
        const listItem = createListItem(addInput.value)
        todoList.appendChild(listItem)
        addInput.value = ''
    
    }
    
    function error (text) {
        alert(text)
    }
    function toggelTodoItem () {
        console.dir(this)
        const listItem = this.parentNode
        listItem.classList.toggle('completed')
    }
    function editTodoItem () {
        const listItem = this.parentNode
        const title = listItem.querySelector('.title')
        const editInput = listItem.querySelector('.textfield')
        const isEditing = listItem.classList.contains('editing')
    
        if (isEditing) {
            title.innerText = editInput.value
            this.innerText ='Изменить'
        } else {
            editInput.value = title.innerText
            this.innerText = 'Сохранить'
        }
    
        listItem.classList.toggle('editing')
    }
    
    function deleteTodoItem () {
        const listItem = this.parentNode
        todoList.removeChild(listItem)
    }
    function init() {
        todoForm.addEventListener('submit', addTodoItem)
        todoItem.forEach(item => bindEvents(item))
    
    }
    function bindEvents (listItem) {
        const checkbox = listItem.querySelector('.checkbox')
        const editButton = listItem.querySelector('button.edit')
        const deleteButton = listItem.querySelector('button.delete')
    
        checkbox.addEventListener('change', toggelTodoItem)
        editButton.addEventListener('click', editTodoItem)
        deleteButton.addEventListener('click', deleteTodoItem)
    }
    function createElement (tagName, props, ...children) {
        const element = document.createElement(tagName)
    
        Object.keys(props)
            .forEach(item => element.setAttribute(item, props[item]))
    
            if (children.length) {
                children.forEach(child => {
                    if (typeof child === 'string') {
                        // создать node узел из текста
                        child = document.createTextNode(child)
                    }
                    element.appendChild(child)
                })
            }
          
    
        return element
        // for in может затронуть свойства объекта которые он наследует
        // Object.keys() - пробегается только по объекту 
        // for (let prop in props) {
        //     if (props.hasOwnProperty[prop]){}
        // }
    
    
    }
    function createListItem (title) {
        const checkbox = createElement('input', {
            type: 'checkbox',
            class: 'checkbox'
        })
    
        const label = createElement('label', { class: 'title' }, title)
        const editInput = createElement('input', {
            type: 'text',
            class: 'textfield'
        })
        const editButton = createElement('button', { class: 'edit' }, 'Изменить')
        const deleteButton = createElement('button', { class: 'delete' }, 'Удалить')
        const listItem = createElement('li', { class: 'todo-item' }, 
        checkbox, label, editInput, editButton, deleteButton)
        bindEvents(listItem)
    
        return listItem
    }
    return init
})(document);

init()
