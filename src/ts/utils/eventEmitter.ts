export class EventEmitter {
    events: any
     constructor() {
         this.events = {
            'add': [],
            'remove': [],
            'toggle': [],
            'edit': []
         }
     }
     on(type: string, callback: Function) {
         this.events[type] = this.events[type] || []
         this.events[type].push(callback)
     }
     emit(type: string, arg: any) {
        if (this.events[type]) {
            this.events[type].forEach(element=> {
                element(arg)
            });
        }
     }
}