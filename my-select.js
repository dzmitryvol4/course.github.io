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
                                    top: 100%;
                                    width: auto;
                                    left: 0;
                                    padding: 0.375rem 0.75rem;
                                    color: #212529;
                                    background-color: #fff;
                                    background-clip: padding-box;
                                    border: 1px solid #bdbdbd;
                                    border-radius: 0.25rem;
                                }
                                .select-popup.open{
                                    display: block;
                                }
                                .select-popup-search {
                                  width: 100%;
                                  border: none;
                                  font-size: 14px;
                                }

                                .select-popup-options {
                                  max-height: 200px;
                                  overflow-y: auto;
                                  width: 100%;
                                  box-sizing: border-box;
                                }

                                .option {
                                  display: block;
                                  padding: 1rem 0.1rem;
                                  cursor: pointer;
                                }

                                .option:hover {
                                  background: var(--select-option-hover, #bdbdbd);
                                }
                                .input{
                                  padding: 0.375rem 0.75rem;
                                  color: #212529;
                                  background-color: #fff;
                                  background-clip: padding-box;
                                  border: 1px solid #bdbdbd;
                                  border-radius: 0.25rem;
                                }
                              </style>
                              <button class="select-button">open</button>
                              <div class="select-popup">
                              <input class="input" placeholder="Search..."/>
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