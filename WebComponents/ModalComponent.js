class ModalComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set content(data) {
        this.render(data);
    }

    render(data) {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                /* Modal geral */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%;
    text-align: left;
    overflow-y: auto;
    max-height: 80vh;
}

.modal-content h2 {
    text-align: center;
    margin-bottom: 15px;
}

.close {
    position: absolute;
    /* top: 0px; */
    /* right: 15px; */
    font-size: 35px;
    cursor: pointer;
    color: #000000;
}

/* Caixa de cada evento */
.event-container {
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 15px;
    padding: 15px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.event-container h3 {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
    color: #333;
}

.event-container p {
    margin: 5px 0;
    white-space: pre-line; /* Mantém quebras de linha */
    color: #272626;
    font-size: 14px;
}
            </style>
            <div class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>Eventos do Dia</h2>
                    ${data.map(event => `
                        <div class="event-container">
                            <h3>${event.titulo}</h3>
                            <p>${event.descricao}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.shadowRoot.querySelector('.close').addEventListener('click', () => this.remove());
    }
}

customElements.define('modal-component', ModalComponent);
