class MySelect extends HTMLElement {
    constructor(){
        super();
        console.log('Hello World123');

    }
}
customElements.define('my-select', MySelect);