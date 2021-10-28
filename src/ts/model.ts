import { State } from './interFace/state'
type Id = number | string;
class Model {
    state: State[]
    constructor(state) {
        this.state = state;
    }
    getItem(id: Id) {
        return this.state.find(item => item.id == id)
    } 

    addItem(item: State) {
        this.state.push(item)
        console.log(this.state);
        
        return item
    }

    updateItem(id: Id, data) {
        const item = this.getItem(id)

        Object.keys(data).forEach(prop =>item[prop]=data[prop])    
    }

    removeItem(id: Id) {
        this.state = this.state.filter(item =>  item.id != id)
        console.log(this.state);
        
    }
}

export default Model