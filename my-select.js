class MySelect extends HTMLElement {
    #selectButton;
    #selectPopup;
    #selectPopupSearch;
    #optionsBox;
    #shadow;
    #inputSearch;
    #selectedDataCheckbox;

    constructor(){
        super();
        console.log('Hello World');

    }

    connectedCallback(){
//        console.log('connectedCallback');
        this.#shadow = this.attachShadow({ mode: "open" });
        this.#createTemplate();
        this.#renderOptions();
        this.#searchData();
        this.#closeWindowPopup();
    }

    #createTemplate() {
//        console.log('createTemplate');
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
                                    z-index: 1;
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

                                .option.hidden {
                                  display: none;
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
                                  <input class="selected-data"/>
                                  <button class="select-button">open</button>
                                  <div class="select-popup">
                                    <slot name="search">
                                      <input class="input" placeholder="Search..."/>
                                    </slot>
                                    <div class="select-popup-options"><!--Здесь будет список опций--></div>
                                  </div>`;
//                                <input class="input" placeholder="Search..."/>
        this.#shadow.appendChild(template.content.cloneNode(true))
        this.#selectedDataCheckbox = this.#shadow.querySelector(".selected-data");
        this.#selectButton = this.#shadow.querySelector(".select-button");
        this.#selectPopup= this.#shadow.querySelector(".select-popup");
        this.#selectPopupSearch = this.#shadow.querySelector(".select-popup input");
        this.#optionsBox= this.#shadow.querySelector(".select-popup-options");
        this.#inputSearch = this.#shadow.querySelector(".input");
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

        this.#optionsBox.innerHTML = ``;
        options.forEach((option)=>{
        const optionTemplate = document.createElement('template');
            console.log(option)
            optionTemplate.innerHTML = `
                <label class="option" data-value="${option.value}">
                    <input type="checkbox" value="${option.value}" text="${option.text}" />
                ${option.text}</label>
            `;
            this.#optionsBox.append(optionTemplate.content.cloneNode(true));
        })
        this.#getData();
    }

    #getData(){
        this.#optionsBox.addEventListener('change', (e)=>{
            const nodeList = this.#optionsBox.querySelectorAll('input[type="checkbox"]:checked');
            console.log(nodeList);
            if(nodeList.length === 0){
                this.#selectedDataCheckbox.value = '';
            }else {
                const selectedTexts = Array.from(nodeList).map(checkbox => checkbox.getAttribute('text'));
                this.#selectedDataCheckbox.value = selectedTexts.join(', ');
            }
        });
    }

    #searchData(){
        this.#inputSearch.addEventListener('input', ()=>{
            const inputText = this.#inputSearch.value;
            const options = this.#optionsBox.querySelectorAll('.option');
            options.forEach((option)=>{
                const text = option.textContent;
                if(text.toLowerCase().includes(inputText.toLowerCase())){
                    option.classList.remove('hidden');
                }else {
                    option.classList.add('hidden');
                }
            })
        })
    }

    #openPopup() {
        this.#selectPopup.classList.add("open");
    }

    #closePopup() {
        this.#selectPopup.classList.remove("open");
    }

    #closeWindowPopup() {
        document.addEventListener('click', (event) => {
            if (!this.contains(event.target)) {
            this.#closePopup();
            }
        });
    }
}
customElements.define('my-select', MySelect);