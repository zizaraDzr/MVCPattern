class Controller {
    model
    view 
    constructor(model, view) {
        this.model = model
        this.view = view
        view.on('add', this.addTodo.bind(this))
        view.on('remove', this.remove.bind(this))
    }

    addTodo(title: string) {
        const todo = this.model.addItem({
            id: Date.now(),
            title: title,
            completed: false
        })

        this.view.addItem(todo)
    }

    remove(id: string) {
        this.model.removeItem(id)
        this.view.removeItem(id)
    }
}
export default Controller