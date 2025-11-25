class MySelect extends HTMLElement {
    #selectButton;
    #selectPopup;
    #selectPopupSearch;
    #optionsBox;
    #shadow;

    constructor(){
        super();
        console.log('Hello World');

    }

    connectedCallback(){
        console.log('connectedCallback');
        this.#shadow = this.attachShadow({ mode: "open" });
        this.#createTemplate();
        this.#renderOptions();
    }

    #createTemplate() {
        console.log('createTemplate');
        const template = document.createElement("template");
        template.innerHTML = `<style>
                                :host{
                                    position: relative;
                                    display: inline-block;
                                }
                                .select-popup{
                                    display: none;
                                    position: absolute;
                                    background:var(--select-popup-background, grey);
                                    top: 100%;
                                    left: 0;
                                }
                                .select-popup.open{
                                    display: block;
                                }
                              </style>
                              <button class="select-button">open</button>
                              <div class="select-popup">
                              <input placeholder="Search..."/>
                              <div class="select-popup-options"><!--Здесь будет список опций--></div>
                              </div>`;
        this.#shadow.appendChild(template.content.cloneNode(true))
        this.#selectButton = this.#shadow.querySelector(".select-button");
        this.#selectPopup= this.#shadow.querySelector(".select-popup");
        this.#selectPopupSearch = this.#shadow.querySelector(".select-popup input");
        this.#optionsBox= this.#shadow.querySelector(".select-popup-options");
        this.append(template.content.cloneNode(true));
        console.log(this);
        this.#selectButton.addEventListener("click", () => this.#openPopup());
    }

    #renderOptions(){
        console.log('renderOptions', this);
        this.#optionsBox= this.#shadow.querySelector(".select-popup-options");
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

    #openPopup() {
        this.#selectPopup.classList.toggle("open");
    }
}
customElements.define('my-select', MySelect);