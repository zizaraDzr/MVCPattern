import { State } from './interFace/state'
class Controller {
    model
    view 
    constructor(model, view) {
        this.model = model
        this.view = view
        view.on('add', this.addTodo.bind(this))
        view.on('remove', this.removeItemTodo.bind(this))
        view.on('toggle', this.toggleItemTodo.bind(this))
        view.on('edit', this.editTodo.bind(this))
    }
    addTodo(title: string) {
        const todo = this.model.addItem({
            id: Date.now(),
            title: title,
            completed: false
        })

        this.view.addItem(todo)
    }
    toggleItemTodo(todo: { id: string; completed: boolean; }) {
        this.model.updateItem(todo)
        this.view.toggleItem(todo)
    }
    removeItemTodo(id: string) {
        this.model.removeItem(id)
        this.view.removeItem(id)
    }
    editTodo(todo: { id: string; title: string; }) {
        this.model.updateItem(todo)
        this.view.editItem(todo)
    }
}
export default Controller