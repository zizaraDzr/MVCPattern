export class EventEmitter {
    events: any
     constructor() {
         this.events = {
            'add': [],
            'remove': []
         }

     }
     on(type: string, callback: Function) {
         this.events[type] = this.events[type] || []
         this.events[type].push(callback)
         console.log(this.events)
     }

     emit(type: string, arg: string) {
        if (this.events[type]) {
            this.events[type].forEach(element=> {
                element(arg)
            });
        }
        console.warn('нет типа события')
     }
}