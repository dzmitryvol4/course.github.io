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
        this.#renderOptions();
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
        console.log(this);
    }

    #renderOptions(){
        console.log('renderOptions', this);
        this.#optionsBox= this.querySelector(".select-popup-options");
        const options = [...this.children]
            .filter((el)=> el.tagName === 'OPTION')
            .map((opti)=> ({
            value: opti.value,
            text: opti.textContent
        }));
        console.log(options)

        const optionTemplate = document.createElement('template');

        options.forEach((option)=>{
            optionTemplate.innerHTML = `
                <label class="option" data-value="${option.value}">
                    <input type="checkbox" />
                ${option.text}</label>
            `;
            this.#optionsBox.append(optionTemplate.content.cloneNode(true));
        })
    }
}
customElements.define('my-select', MySelect);