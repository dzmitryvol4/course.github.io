class MySelect extends HTMLElement {
#selectButton;
#selectPopup;
#selectPopupSearch;
#optionsBox;

    constructor(){
        super();
        console.log('Hello World');

    }

    connectedCallback(){
        console.log('connectedCallback');
        this.#createTemplate();
    }

    #createTemplate() {
        console.log('createTemplate');
        const template = document.createElement("template");
        template.innerHTML = `<div class="select-popup">
                              <input placeholder="Search..."/>
                              <div class="select-popup-options"><!--Здесь будет список опций--></div>
                              </div>`;
        this.#selectButton = this.querySelector(".select-button");
        this.#selectPopup= this.querySelector(".select-popup");
        this.#selectPopupSearch = this.querySelector(".select-popup-search");
        this.#optionsBox= this.querySelector(".select-popup-options");

        this.append(template.content.cloneNode(true));
    }
}
customElements.define('my-select', MySelect);