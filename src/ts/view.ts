import { State } from './interFace/state'
import { createElement } from './utils/createElement'
import { EventEmitter } from './utils/eventEmitter'
type Id = number | string;
class View extends EventEmitter {
    form: HTMLElement
    input: HTMLInputElement
    list: HTMLElement
    constructor() {
        super()
        this.form = document.getElementById('todo-form')
        this.input = document.getElementById('add-input') as HTMLInputElement
        this.list = document.getElementById('todo-list')
        this.form.addEventListener('submit', this.handleAdd.bind(this))
    }

// add item
    addItem(todo: State) {
        const listItem = this.createElement(todo)

        this.input.value = ''
        this.list.appendChild(listItem)
    }
    handleAdd(event: Event) {
        event.preventDefault()
        if (!this.input.value) return alert('empty')

        const value = this.input.value
        this.emit('add', value)
    }

// edit item  
    handeEdit(event: { target: HTMLInputElement; }) {
        const listItem = event.target.parentNode as HTMLInputElement
        const id = listItem.getAttribute('data-id')
        const label = listItem.querySelector('.title') as HTMLInputElement
        const input = listItem.querySelector('.textfield') as HTMLInputElement
        const editButton = listItem.querySelector('.edit') as HTMLInputElement
        const title = input.value
        const isEditing = listItem.classList.contains('editing')

        if (isEditing) {
            this.emit('edit', { id, title })
            
        } else {
            input.value = label.textContent
            editButton.textContent = 'Сохранить'
            listItem.classList.add('editing')
        }
    }
    editItem(todo: { id: string; title: string; }) {
        const listItem = this.findListItem(todo.id) as HTMLInputElement
        const label = listItem.querySelector('.title') as HTMLInputElement
        const input = listItem.querySelector('.textfield') as HTMLInputElement
        const editButton = listItem.querySelector('.edit') as HTMLInputElement
 
        label.textContent = todo.title
        editButton.textContent = 'Изменить'
        listItem.classList.remove('editing')
    }

// remove item
    handleRemove(event: { target: HTMLInputElement; }) {
        const listItem = event.target.parentNode as HTMLInputElement
        const id = listItem.getAttribute('data-id')
        
        this.emit('remove', id)
    }
    removeItem(id: Id) {
        const listItem = this.findListItem(id)

        this.list.removeChild(listItem)
    }

// toggle item
    handleToggle(event: { target: HTMLInputElement; } ) {
        const listItem = event.target.parentNode as HTMLInputElement
        const id = listItem.getAttribute('data-id')
        const completed: boolean = event.target.checked

        this.emit('toggle', { id, completed } )
    }
    toggleItem(todo: any) {
        
        const listItem = this.findListItem(todo.id)
        const checkbox = listItem.querySelector('.checkbox') as HTMLInputElement

        checkbox.checked = todo.completed
        if(todo.completed) {
            listItem.classList.add('completed')
        } else {
            listItem.classList.remove('completed')
        }
    }

    createElement(todo: State) {
        const checkbox = createElement('input', {
            type: 'checkbox',
            class: 'checkbox',
            checked: todo.completed ? 'checked' : '' 
        })
        const label = createElement('label', { class: 'title' }, todo.title)
        const editInput = createElement('input', {
            type: 'text',
            class: 'textfield'
        })
        const editButton = createElement('button', { class: 'edit' }, 'Изменить')
        const deleteButton = createElement('button', { class: 'delete' }, 'Удалить')
        const listItem = createElement('li', { class: `todo-item${todo.completed ? ' completed' : ''}`, 'data-id': todo.id }, 
        checkbox, label, editInput, editButton, deleteButton)
        return this.addEventlisteners(listItem)
    }
    addEventlisteners(listItem) {
        const checkbox = listItem.querySelector('.checkbox') as HTMLInputElement
        const editButton = listItem.querySelector('button.edit') as HTMLInputElement
        const removeButton = listItem.querySelector('button.delete') as HTMLInputElement
        
        checkbox.addEventListener('change', this.handleToggle.bind(this))
        editButton.addEventListener('click', this.handeEdit.bind(this))
        removeButton.addEventListener('click', this.handleRemove.bind(this))
        return listItem
    }
    findListItem(id: Id): HTMLElement  {
        return this.list.querySelector(`[data-id='${id}']`)
    }
}

export default View