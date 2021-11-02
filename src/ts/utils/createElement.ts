export function createElement (tagName: string, props: object, ...children: any) {
    const element = document.createElement(tagName)
    
    Object.keys(props)
        .forEach(item =>{
            if (props[item]) {  
                element.setAttribute(item, props[item])
            }
        } )

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