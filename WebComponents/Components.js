// Definição do Calendar Component (Componente do Calendário)
class CalendarComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.currentDate = new Date();

        this.eventos = [{
                data: '2024-03-04',
                titulo: 'Glow Fashion Party',
                descricao: 'Local: Estádio da Nossa Senhora do Monte\nIngressos:\nÁrea normal: 8.000 Kz\nÁrea VIP: 15.000 Kz\nMesas: 50.000 Kz, 80.000 Kz, 150.000 Kz'
            },
            {
                data: '2024-03-04',
                titulo: 'Teatro e poesia com Levart Huíla',
                descricao: 'Local: Centro de Artes do Lubango\nIngressos: Área normal: 1.500 Kz'
            },
            {
                data: '2024-03-04',
                titulo: 'Workshop de Empreendedorismo',
                descricao: 'Local: Mediateca do Lubango\nEntrada: Gratuita'
            },
            {
                data: '2024-12-15',
                titulo: 'Festa X',
                descricao: 'No dia 15 de Dezembro de 2024'
            },
            {
                data: '2024-12-25',
                titulo: 'Natal',
                descricao: 'Comemoração do Natal'
            },
            {
                data: '2024-12-31',
                titulo: 'Réveillon',
                descricao: 'Celebração de Ano Novo'
            },
        ];
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
/* Estilos gerais */
body {
    font-family: "Arial", sans-serif;
    display: flex;
    justify-content: center;
    background-color: #888;
    margin: 0;
    text-align: center;
}

/* Contêiner do calendário */
.calendar {
    width: 360px;
    margin: 0 auto;
    border: 1px solid #ccc;
    padding: 20px;
    background-color: #fbfdff;
    border-radius: 8px;
    box-shadow: rgba(0,0,0,0.16) 0px 3px 6px, rgbga(0, 0, 0.23) 0px 3px, 6px;
}
/*###################################################################*/



/*###################################################################*/
/* Cabeçalho do calendário */
.header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    background-color: #d5d7da42;
    font-weight: 900;
    border-bottom: 1px solid #888;
    text-transform: capitalize;
}

/*Setas do cabeçalho do calendário*/
.header button{
    background: none;
    font-size: 18px;
    font-weight: 900;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 10px;
    border: none;
    transition: background-color 0.3s, color 0.3s; /*Para dar efeito quando passar o cursor nas setas*/
}

.header button:hover{
    background-color: #333;
    color: #ffffff;
}

/*###################################################################*/
/* Dias da semana */
.weekdays {
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
    
}
.weekdays div {
    width: 14.28%;
    text-align: center;
    padding: 5px;
    font-weight: bold;
}
/*###################################################################*/


/*###################################################################*/
/* Dias do mês */
#days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    /* color: #cccccc; */
}
#days div {
    padding: 10px;
    /* border: 1px solid #ccc; */
    text-align: center;
    transition: background-color 0.3s, color 0.3s; /*Para dar efeito quando passar o cursor nos dias*/
}

#days div:hover{
    background-color: #444444;
    color: #f7f1f1;
    transform: scale(1.1);
}

#days div.active{
    background-color: #9c1212;
    color: #f7f1f1;
    
}

/* Destacar dias com eventos */
.event-day {
    position: relative;
    cursor: pointer;
}

.event-day::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    background-color: red;
    border-radius: 50%;
}
                    
            </style>
            <div class="calendar">
                <div class="header">
            <button id="prev-month">&#10094;</button>
            <div id="monthYear">Dezembro</div>
            <button id="next-month">&#10095;</button>
                </div>
                        <div class="weekdays">
            <div>Dom</div>
            <div>Seg</div>
            <div>Ter</div>
            <div>Qua</div>
            <div>Qui</div>
            <div>Sex</div>
            <div>Sáb</div>
        </div>
        <div id="days"></div>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.renderCalendar();
        this.addEventListeners();
    }

    renderCalendar() {
        const monthYear = this.shadowRoot.getElementById('monthYear');
        const days = this.shadowRoot.getElementById('days');
        const date = this.currentDate;

        monthYear.textContent = `${date.toLocaleString('pt-PT', { month: 'long' })} ${date.getFullYear()}`;
        days.innerHTML = '';

        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            days.innerHTML += `<div></div>`;
        }

        for (let i = 1; i <= lastDate; i++) {
            const dataFormatada = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const eventDay = this.eventos.some(e => e.data === dataFormatada);

            const day = document.createElement('div');
            day.classList.add('days');
            if (eventDay) {
                day.classList.add('event-day');
                day.addEventListener('click', () => this.dispatchEvent(new CustomEvent('day-click', {
                    detail: {
                        date: dataFormatada
                    }
                })));
            }
            day.textContent = i;
            days.appendChild(day);
        }
    }

    addEventListeners() {
        this.shadowRoot.getElementById('prev-month').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendar();
        });

        this.shadowRoot.getElementById('next-month').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
        });
    }
}

// Definição do Modal Component (Componente do Modal)
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
customElements.define('calendar-component', CalendarComponent);

