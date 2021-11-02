import { State } from './interFace/state'
type Id = number | string;
class Model {
    state: State[]
    constructor(state = []) {
        this.state = state;
    }
    getItem(id: Id) {
        return this.state.find(item => item.id == id)
    } 

    addItem(item: State) {
        this.state.push(item)
        
        return item
    }

    updateItem({ id, title, completed }: State) {
        const item = this.getItem(id)
        item.completed = completed
        item.title = title
        // Object.keys(data).forEach(prop =>item[prop]=data[prop])    
    }

    removeItem(id: Id) {
        this.state = this.state.filter(item =>  item.id != id)
        
    }
}

export default Model