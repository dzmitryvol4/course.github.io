class MyPanel extends HTMLElement {
    #shadow;
    #headerElement;
    #contentElement;
    #toggleButton;
    #titleElement;
    #subTitleElement;

    constructor() {
        super();
    }

    connectedCallback() {
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#createTemplate();
        this.#setupEvents();
        this.#syncState();
    }

    static get observedAttributes() {
        return ['collapsed', 'header', 'sub-header'];
    }

    attributeChangedCallback(name) {
        if (name === 'collapsed') {
            this.#syncState();
        }

        if (name === "header") {
            this.#syncHeader();
        }

        if (name === "sub-header") {
            this.#syncSubHeader();
        }
    }

    #createTemplate() {
        const header = this.getAttribute('header') || 'Панель';
        const subHeader = this.getAttribute('sub-header') || '';
        const isToggleable = this.hasAttribute('toggleable');

        this.#shadow.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin-top: 20px;
                    width: 400px;
                }

                .panel {
                    border: 1px solid var(--panel-border, #ddd);
                    border-radius: 8px;
                    background: white;
                    overflow: hidden;
                }

                .panel:hover {
                    box-shadow: 0 6px 16px rgba(0,0,0,0.2);
                }

                .header {
                    padding: 12px 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: ${isToggleable ? 'pointer' : 'default'};
                }

                .header:hover {
                    background: ${isToggleable ? 'var(--panel-header-hover, #f0f0f0)' : 'var(--panel-header-bg, #f8f9fa)'};
                }

                .content {
                    padding: 10px;
                    color: var(--text-color, #333);
                    background: white;
                    height: 300px;
                 }

                 .sub-title {
                     font-size: 12px;
                     color: var(--sub-title-color, #666);
                 }
            </style>
            <div class="panel">
                <div class="header">
                    <span class="title">${header}</span>
                    ${subHeader ? `<span class="sub-title">${subHeader}</span>` : ''}
                    ${isToggleable ? '<span class="toggle">−</span>' : ''}
                </div>
                <div class="content">
                    <slot></slot>
                </div>
            </div>
        `;

        this.#headerElement = this.#shadow.querySelector('.header');
        this.#contentElement = this.#shadow.querySelector('.content');
        this.#toggleButton = this.#shadow.querySelector('.toggle');
        this.#titleElement = this.#shadow.querySelector('.title');
        this.#subTitleElement = this.#shadow.querySelector('.sub-title');
    }

    #setupEvents() {
        if (this.hasAttribute('toggleable')) {
            this.#headerElement.addEventListener('click', () => {
                if (this.hasAttribute('collapsed')) {
                    this.removeAttribute('collapsed');
                } else {
                    this.setAttribute('collapsed', '');
                }
            });
        }
    }

    #syncState() {
        if (!this.#contentElement) return;

        const isCollapsed = this.hasAttribute('collapsed');
        this.#contentElement.style.display = isCollapsed ? 'none' : 'block';
        if (this.#toggleButton) {
            this.#toggleButton.textContent = isCollapsed ? '+' : '−';
        }
    }

    #syncHeader() {
        if (!this.#titleElement) return;

        const header = this.getAttribute('header') || 'Панель';
        this.#titleElement.textContent = header;
    }

    #syncSubHeader() {
        if (!this.#subTitleElement) return;

        const subHeader = this.getAttribute('sub-header') || '';
        this.#subTitleElement.textContent = subHeader;
    }
}

customElements.define('my-panel', MyPanel);