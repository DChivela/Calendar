// Adicionando eventos ao calendário
const calendar = document.getElementById('calendar');
const monthYear = document.getElementById('monthYear');
const days = document.getElementById('days');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');

let currentDate = new Date();

// Array de eventos simulados
const eventos = [
    { data: '2024-03-04', titulo: 'Glow Fashion Party', descricao: 'Local: Estádio da Nossa Senhora do Monte\nIngressos:\nÁrea normal: 8.000 Kz\nÁrea VIP: 15.000 Kz\nMesas: 50.000 Kz, 80.000 Kz, 150.000 Kz' },
    { data: '2024-03-04', titulo: 'Teatro e poesia com Levart Huíla', descricao: 'Local: Centro de Artes do Lubango\nIngressos: Área normal: 1.500 Kz' },
    { data: '2024-03-04', titulo: 'Workshop de Empreendedorismo', descricao: 'Local: Mediateca do Lubango\nEntrada: Gratuita' },
    { data: '2024-12-15', titulo: 'Festa X', descricao: 'No dia 15 de Dezembro de 2024' },
    { data: '2024-12-25', titulo: 'Natal', descricao: 'Comemoração do Natal' },
    { data: '2024-12-31', titulo: 'Réveillon', descricao: 'Celebração de Ano Novo' },
];

// Renderizar calendário
function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    monthYear.textContent = `${date.toLocaleString('pt-PT', { month: 'long' })} ${year}`;

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

    days.innerHTML = '';

    for (let i = 0; i < firstDayOfMonth; i++) {
        days.innerHTML += '<div></div>';
    }

    for (let i = 1; i <= lastDayOfMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = i;

        const dataFormatada = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

        // Verificar se há evento neste dia
        const evento = eventos.find(e => e.data === dataFormatada);
        if (evento) {
            dayElement.classList.add('event-day');
            dayElement.addEventListener('click', () => exibirDetalhesEvento(evento));
        }

        days.appendChild(dayElement);
    }
}

// Exibir detalhes do evento
function exibirDetalhesEvento(evento) {
    const modal = document.createElement('div');
    modal.className = 'modal';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const closeBtn = document.createElement('span');
    closeBtn.className = 'close';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => modal.remove());

    const eventTitle = document.createElement('h2');
    eventTitle.textContent = evento.titulo;

    const eventDescription = document.createElement('p');
    eventDescription.textContent = evento.descricao;

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(eventTitle);
    modalContent.appendChild(eventDescription);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

// Alteração dos meses
prevMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});

renderCalendar(currentDate);
