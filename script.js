const calendar = document.getElementById('calendar');
const monthYear = document.getElementById('monthYear');
const days = document.getElementById('days');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');
const modal = document.getElementById('myModal');
const modalContent = document.querySelector('.modal-content');

let currentDate = new Date();

function renderCalendar(date){
    const year = date.getFullYear();
    const month = date.getMonth();
    const today = new Date(); //Função para criar o ano actual

    monthYear.textContent = `${date.toLocaleString('pt-PT',
        {month: 'long'})} ${year}`;

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDayOfMonth = new Date(year, month +1, 0).getDate();

    days.innerHTML = '';

    for(let i =0; i<firstDayOfMonth; i++){
        days.innerHTML += '<div></div>'
    }

    for(let i=1; i<=lastDayOfMonth; i++){
        const dayElement = document.createElement('div');
        dayElement.textContent = i;

        if(year == today.getFullYear()
            && month == today.getMonth()
            && i == today.getDate())
            {
            dayElement.classList.add('active');
        }

        const dayOfweek = new Date(year, month, i).getDay();

        if(dayOfweek == today.getDay()){
            dayElement.classList.add('highlight');
        }

        
        days.appendChild(dayElement);
    }

}

//ALETERAÇÃO DOS MESES
//########################################
//MÊS ANTERIOR
prevMonthButton.addEventListener('click', ()=>{

    currentDate.setMonth(currentDate.getMonth() -1)
    renderCalendar(currentDate); 
});

//########################################
//MÊS SEGUINTE
nextMonthButton.addEventListener('click', ()=>{

    currentDate.setMonth(currentDate.getMonth() +1)
    renderCalendar(currentDate);
});

renderCalendar(currentDate);


// function renderCalendar(month, year) {

//     monthYear.textContent = `${date.toLocaleString('pt-PT',
//         {month: 'long'})} ${year}`;

//     daysContainer.innerHTML = ''; // Limpar os dias anteriores

//     // Criar os dias
//     let date = new Date(year, month, 1);
//     let daysInMonth = getDaysInMonth(year, month);
//     let firstDay = getFirstDayOfMonth(year, month);

//     // Preencher os dias vazios do início do mês
//     for (let i = 0; i < firstDay; i++) {
//         const dayElement = document.createElement('div');
//         dayElement.classList.add('empty-day');
//         daysContainer.appendChild(dayElement);
//     }

//     // Criar os dias do mês
//     for (let i = 1; i <= daysInMonth; i++) {
//         const dayElement = document.createElement('div');
//         dayElement.textContent = i;

//         // Verificar se há algum evento para este dia
//         // ... (sua lógica para verificar eventos)

//         daysContainer.appendChild(dayElement);
//         date.setDate(date.getDate() + 1);
//     }
// }

// // Função para abrir o modal
// function openModal(event) {
//     // ... (implementação para mostrar o modal com os detalhes do evento)
// }

// // Função para fechar o modal
// function closeModal() {
//     modal.style.display = 'none';
// }

// // Eventos
// prevMonthButton.addEventListener('click', () => {
//     currentDate.setMonth(currentDate.getMonth() - 1);
//     generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
// });

// nextMonthButton.addEventListener('click', () => {
//     currentDate.setMonth(currentDate.getMonth() + 1);
//     generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
// });

// closeButton.addEventListener('click', closeModal);

// // Gerar o calendário inicial
// generateCalendar(currentDate.getMonth(), currentDate.getFullYear());