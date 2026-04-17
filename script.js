// --- 1. БАЗА ДАННЫХ ВСЕХ ПРЕДМЕТОВ ---
const MODULES_DB = [
    // ПОНЕДЕЛЬНИК (day: 2)
    {
        id: 'prob-stats-lec',
        title: 'Probability and Statistics',
        type: 'lecture',
        icon: 'fas fa-chart-bar',
        dayStr: 'Monday',
        day: 2,
        row: 2, // 08:00
        span: 2,
        timeStr: 'Mon 08:00-09:25',
        teacher: 'Mr. Meezan Chand',
        room: 'B101'
    },
    {
        id: 'cnt-lab-1',
        title: 'Computer Networks and Telecommunication',
        type: 'lab',
        icon: 'fas fa-network-wired',
        dayStr: 'Monday',
        day: 2,
        row: 5, // 10:15
        span: 3,
        timeStr: 'Mon 10:15-12:25',
        teacher: 'Mr. Imtiyaz Gulbarga',
        room: 'B211 LAB'
    },
    {
        id: 'hist-kg-lec',
        title: 'History of Kyrgyzstan',
        type: 'lecture',
        icon: 'fas fa-republican',
        dayStr: 'Monday',
        day: 2,
        row: 9, // 13:15
        span: 2,
        timeStr: 'Mon 13:15-14:40',
        teacher: 'Mr. Alimzhan Zakirov',
        room: 'B101'
    },

    // ВТОРНИК (day: 3)
    {
        id: 'ethical-hacking-lec',
        title: 'Ethical Hacking and Penetration Testing',
        type: 'lecture',
        icon: 'fas fa-user-secret',
        dayStr: 'Tuesday',
        day: 3,
        row: 2, // 08:00
        span: 2,
        timeStr: 'Tue 08:00-09:25',
        teacher: 'Mr. Imtiyaz Gulbarga',
        room: 'B211'
    },

    // СРЕДА (day: 4)
    {
        id: 'vr-design-lec',
        title: 'VR Design (WEB BASED)',
        type: 'lecture',
        icon: 'fas fa-vr-cardboard',
        dayStr: 'Wednesday',
        day: 4,
        row: 2, // 08:00
        span: 4, // 160 min
        timeStr: 'Wed 08:00-11:00',
        teacher: 'Dr. Ruslan Isaev / Dr. Andrei Ermakov',
        room: 'B111-Lab WeB'
    },
    {
        id: 'design-thinking-lec',
        title: 'Design Thinking for product solutions',
        type: 'lecture',
        icon: 'fas fa-lightbulb',
        dayStr: 'Wednesday',
        day: 4,
        row: 9, // 13:15
        span: 3,
        timeStr: 'Wed 13:15-15:25',
        teacher: 'Dr. Andrei Ermakov',
        room: 'B109'
    },

    // ЧЕТВЕРГ (day: 5)
    {
        id: 'discrete-math-lec',
        title: 'Discrete Mathematics',
        type: 'lecture',
        icon: 'fas fa-calculator',
        dayStr: 'Thursday',
        day: 5,
        row: 2,
        span: 3,
        timeStr: 'Thu 08:00-10:10',
        teacher: 'Ms. Liliya Abdieva',
        room: 'B201'
    },
    {
        id: 'prog-lang-lab',
        title: 'Programming language 2',
        type: 'lab',
        icon: 'fas fa-code',
        dayStr: 'Thursday',
        day: 5,
        row: 6, // 11:00
        span: 3,
        timeStr: 'Thu 11:00-13:10',
        teacher: 'Ms. Azhar Kazakbaeva',
        room: 'BIGLAB'
    },

    // ПЯТНИЦА (day: 6)
    {
        id: 'soft-arch-lab',
        title: 'Software Architecture and Design Patterns',
        type: 'lab',
        icon: 'fas fa-sitemap',
        dayStr: 'Friday',
        day: 6,
        row: 2,
        span: 3,
        timeStr: 'Fri 08:00-10:10',
        teacher: 'Mr. Nurlan Mukambaev',
        room: 'B111 LAB'
    },
    {
        id: 'backend-lab',
        title: 'Back-end',
        type: 'lab',
        icon: 'fas fa-server',
        dayStr: 'Friday',
        day: 6,
        row: 5,
        span: 3,
        timeStr: 'Fri 10:15-12:25',
        teacher: 'Mr. Talgat Mendekov',
        room: 'B110 LAB'
    },
    {
        id: 'calculus-lec',
        title: 'Calculus 2',
        type: 'lecture',
        icon: 'fas fa-infinity',
        dayStr: 'Friday',
        day: 6,
        row: 9,
        span: 3,
        timeStr: 'Fri 13:15-15:25',
        teacher: 'Mr. Hussein Chebsi',
        room: 'B107'
    },
    {
        id: 'ai-dl-lab',
        title: 'Artificial Intellegence and Deep Learning',
        type: 'lab',
        icon: 'fas fa-brain',
        dayStr: 'Friday',
        day: 6,
        row: 12, // 15:30
        span: 3,
        timeStr: 'Fri 15:30-17:40',
        teacher: 'Dr. Tauheed Khan',
        room: 'LAB5(213)'
    },
    {
        id: 'ai-dl-lec',
        title: 'AI and Deep Learning',
        type: 'lecture',
        icon: 'fas fa-brain',
        dayStr: 'Friday',
        day: 6,
        row: 12, // 15:30
        span: 3,
        timeStr: 'Fri 15:30-17:40',
        teacher: 'Dr. Tauheed Khan',
        room: 'LAB5(213)'
    }
];

// Словарь преподавателей
const TEACHER_CANONICAL = {
    'dr. daniyar satybaldiev':          'Dr. Daniiar Satybaldiev',
    'mr. erustan erkebulanov':          'Mr. Erustan Erkebulanov',
    'dr. sheraly matanov':              'Dr. Sherali Matanov',
};

document.addEventListener('DOMContentLoaded', () => {

    // --- 0. ИНИЦИАЛИЗАЦИЯ ИЗ LOCAL STORAGE (МНОЖЕСТВО ТАБЛИЦ) ---
    // Загружаем все сохраненные драфты (или создаем дефолтный)
    let allSchedules = JSON.parse(localStorage.getItem('isa_schedules_db')) || {
        'draft_1': { name: 'Retake Plan', subjects: [] }
    };
    let currentDraftId = localStorage.getItem('isa_current_draft') || 'draft_1';

    // МИГРАЦИЯ: Если есть старые данные из предыдущей версии скрипта, переносим их
    const oldSavedData = localStorage.getItem('alatoo_isa_schedule');
    if (oldSavedData && !localStorage.getItem('isa_schedules_db')) {
        allSchedules['draft_1'].subjects = JSON.parse(oldSavedData);
    }

    // Рабочий массив всегда указывает на предметы текущего драфта
    let mySchedule = allSchedules[currentDraftId].subjects;

    // Функция сохранения в базу браузера
    function saveToLocalStorage() {
        allSchedules[currentDraftId].subjects = mySchedule; // Синхронизируем текущий массив с базой
        localStorage.setItem('isa_schedules_db', JSON.stringify(allSchedules));
        localStorage.setItem('isa_current_draft', currentDraftId);
    }

    // --- Определение сегодняшнего дня ---
    const today = new Date();
    let currentDayOfWeek = today.getDay(); 
    if (currentDayOfWeek === 0 || currentDayOfWeek === 6) currentDayOfWeek = 1; 

    const activeCol = currentDayOfWeek + 1; 
    const daysArr = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const shortDaysArr = ["", "Mon", "Tue", "Wed", "Thu", "Fri"];
    const monthsArr = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    const daySelect = document.getElementById('daySelect');
    if (daySelect) {
        for (let i = 1; i <= 5; i++) {
            const option = document.createElement('option');
            option.text = daysArr[i] + (i === currentDayOfWeek ? " ★" : "");
            if (i === currentDayOfWeek) option.selected = true;
            daySelect.appendChild(option);
        }
    }

    const headers = document.querySelectorAll('.grid-header');
    headers.forEach(h => {
        const gridArea = h.style.gridArea || "";
        if (gridArea.includes("1 /")) {
            const match = gridArea.match(/1 \/ (\d)/);
            if (match) {
                const col = parseInt(match[1]);
                if (col >= 2 && col <= 6) {
                    if (col === activeCol) {
                        h.classList.add('active-day-header');
                        h.innerHTML = `${daysArr[currentDayOfWeek].toUpperCase()}, ${today.getDate()} ${monthsArr[today.getMonth()]} ★`;
                    } else {
                        h.classList.remove('active-day-header');
                        h.innerHTML = shortDaysArr[col - 1];
                    }
                }
            }
        }
    });

    const teacherSelect = document.getElementById('teacherSelect');
    if (teacherSelect) {
        const uniqueTeachers = [...new Set(Object.values(TEACHER_CANONICAL))].sort();
        uniqueTeachers.forEach(teacher => {
            const option = document.createElement('option');
            option.value = teacher;
            option.textContent = teacher;
            teacherSelect.appendChild(option);
        });
    }

    // --- ЭЛЕМЕНТЫ DOM ---
    const timetableGrid = document.getElementById('timetableGrid');
    const searchInput = document.getElementById('searchInput');
    const moduleList = document.getElementById('moduleList');
    const savingStatus = document.getElementById('savingStatus');
    
    // Элементы управления драфтами
    const draftSelect = document.getElementById('draftSelect');
    const scheduleNameInput = document.getElementById('scheduleNameInput');
    const newTableBtn = document.getElementById('newTableBtn');

    // --- 2. ГЕНЕРАЦИЯ СПИСКА ПРЕДМЕТОВ ИЗ БАЗЫ ДАННЫХ ---
    function renderAvailableModules() {
        moduleList.innerHTML = ''; 
        
        const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

        weekDays.forEach(day => {
            const dayGroup = document.createElement('div');
            dayGroup.className = 'day-group';
            dayGroup.setAttribute('data-day', day);
            
            let groupHTML = `<div class="day-header">${day}</div>`;
            const dayModules = MODULES_DB.filter(m => m.dayStr === day);
            
            if (dayModules.length === 0) {
                groupHTML += `<div class="empty-day-text">No modules found for this day.</div>`;
            } else {
                dayModules.forEach(mod => {
                    groupHTML += `
                        <div class="module-card ${mod.type}">
                            <div class="card-header">
                                <span class="subject-name"><i class="${mod.icon} icon-muted"></i>${mod.title}</span>
                                <span class="badge ${mod.type}">${mod.type.toUpperCase()}</span>
                            </div>
                            <div class="card-details">
                                <div><i class="far fa-calendar-alt"></i> ${mod.timeStr}</div>
                                <div class="teacher-name"><i class="far fa-user"></i> ${mod.teacher} | ${mod.room}</div>
                            </div>
                            <button class="btn-add" data-id="${mod.id}" data-title="${mod.title}" data-type="${mod.type}" data-icon="${mod.icon}" data-day="${mod.day}" data-row="${mod.row}" data-span="${mod.span}">+ Add to my ISA</button>
                        </div>
                    `;
                });
            }
            
            dayGroup.innerHTML = groupHTML;
            moduleList.appendChild(dayGroup);
        });

        attachAddListeners();
    }

    // --- Отрисовка пустых ячеек (линий сетки) ---
    function drawEmptyGrid() {
        for (let row = 2; row <= 15; row++) { 
            for (let col = 2; col <= 6; col++) {
                const cell = document.createElement('div');
                cell.className = (col === activeCol) ? 'grid-cell bg-active-day' : 'grid-cell';
                cell.style.gridArea = `${row} / ${col} / span 1 / span 1`;
                timetableGrid.appendChild(cell);
            }
        }
    }
    drawEmptyGrid();

    // --- Логика отрисовки расписания ---
    function renderSchedule() {
        document.querySelectorAll('.grid-event, .conflict-banner').forEach(el => el.remove());

        mySchedule.forEach(item => {
            const eventDiv = document.createElement('div');
            eventDiv.className = `grid-event event ${item.type}`;
            eventDiv.style.gridArea = `${item.row} / ${item.day} / span ${item.span} / span 1`;
            
            eventDiv.innerHTML = `
                <div class="event-top">
                    <span class="badge ${item.type}"><i class="${item.icon}"></i> ${item.type.toUpperCase()}</span>
                    <span class="event-close" data-id="${item.id}" title="Remove"><i class="fas fa-times"></i></span>
                </div>
                <div class="event-title">${item.title}</div>
                <div class="event-teacher"><i class="far fa-user"></i> ${item.teacher}</div>
                <div class="event-room"><i class="far fa-building"></i> ${item.room}</div>
                <i class="fas fa-cog config-icon"></i>
            `;
            
            timetableGrid.appendChild(eventDiv);
        });

        attachDeleteListeners();
        saveToLocalStorage(); // <-- Теперь сохраняет в нужный драфт!
        updateButtonStates();
    }

    // --- Обновление визуального статуса кнопок ---
    function updateButtonStates() {
        const addButtons = document.querySelectorAll('.btn-add');
        addButtons.forEach(btn => {
            const id = btn.getAttribute('data-id');
            const isAdded = mySchedule.some(item => item.id === id);
            
            if (isAdded) {
                btn.innerHTML = '<i class="fas fa-check"></i> In ISA';
                btn.classList.add('added');
                btn.disabled = true; 
            } else {
                btn.innerHTML = '+ Add to my ISA';
                btn.classList.remove('added');
                btn.disabled = false; 
            }
        });
    }

    // --- Добавление предмета ---
    function attachAddListeners() {
        const addButtons = document.querySelectorAll('.btn-add');
        addButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const data = {
                    id: btn.getAttribute('data-id'),
                    title: btn.getAttribute('data-title'),
                    type: btn.getAttribute('data-type'),
                    icon: btn.getAttribute('data-icon'),
                    day: parseInt(btn.getAttribute('data-day')),
                    row: parseInt(btn.getAttribute('data-row')),
                    span: parseInt(btn.getAttribute('data-span'))
                };

                const conflict = mySchedule.find(item => {
                    const sameDay = item.day === data.day;
                    const timeOverlap = (data.row < item.row + item.span) && (data.row + data.span > item.row);
                    return sameDay && timeOverlap;
                });

                if (conflict) {
                    showConflictWarning(data, conflict);
                    return;
                }

                mySchedule.push(data);
                renderSchedule();
                showSavedStatus();
            });
        });
    }

    function attachDeleteListeners() {
        const closeButtons = document.querySelectorAll('.event-close');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idToRemove = e.currentTarget.getAttribute('data-id');
                mySchedule = mySchedule.filter(item => item.id !== idToRemove);
                renderSchedule();
                showSavedStatus();
            });
        });
    }

    function showConflictWarning(newData, oldData) {
        document.querySelectorAll('.conflict-banner').forEach(el => el.remove());
        const conflictDiv = document.createElement('div');
        conflictDiv.className = 'conflict-banner';
        conflictDiv.style.gridArea = `${newData.row} / ${newData.day} / span ${newData.span} / span 1`;
        conflictDiv.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right: 5px;"></i> Conflict: ${newData.title} overlaps with ${oldData.title}`;
        
        timetableGrid.appendChild(conflictDiv);
        setTimeout(() => conflictDiv.remove(), 3500);
    }

    // --- Поиск ---
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const dayGroups = document.querySelectorAll('.day-group');
            
            dayGroups.forEach(group => {
                let hasVisibleCards = false;
                const cards = group.querySelectorAll('.module-card');
                
                cards.forEach(card => {
                    const subjectName = card.querySelector('.subject-name').textContent.toLowerCase();
                    const teacherName = card.querySelector('.teacher-name').textContent.toLowerCase();
                    
                    if (subjectName.includes(query) || teacherName.includes(query)) {
                        card.style.display = 'block';
                        hasVisibleCards = true;
                    } else {
                        card.style.display = 'none';
                    }
                });

                group.style.display = (!hasVisibleCards && cards.length > 0) ? 'none' : 'flex';
            });
        });
    }

    // --- Очистка и визуальное сохранение ---
    const clearDraftBtn = document.getElementById('clearDraftBtn');
    if (clearDraftBtn) {
        clearDraftBtn.addEventListener('click', () => {
            if (mySchedule.length === 0) return;
            if (confirm('Are you sure you want to clear your entire ISA Draft?')) {
                mySchedule = [];
                renderSchedule(); 
            }
        });
    }

    function showSavedStatus() {
        if(!savingStatus) return;
        savingStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        setTimeout(() => {
            savingStatus.innerHTML = '<i class="fas fa-check" style="color: green;"></i> Saved';
        }, 500);
    }

    const saveBrowserBtn = document.getElementById('saveBrowserBtn');
    if (saveBrowserBtn) {
        saveBrowserBtn.addEventListener('click', () => {
            saveToLocalStorage();
            showSavedStatus();
        });
    }

    // ==========================================
    // ЛОГИКА ДЛЯ НЕСКОЛЬКИХ ТАБЛИЦ (MY DRAFTS)
    // ==========================================

    // Функция отрисовки списка селектора
    function renderDraftList() {
        if (!draftSelect) return;
        draftSelect.innerHTML = ''; 
        for (let id in allSchedules) {
            const option = document.createElement('option');
            option.value = id;
            option.textContent = allSchedules[id].name;
            if (id === currentDraftId) option.selected = true;
            draftSelect.appendChild(option);
        }
        if (scheduleNameInput) {
            scheduleNameInput.value = allSchedules[currentDraftId].name;
        }
    }

    // Переключение между таблицами
    if (draftSelect) {
        draftSelect.addEventListener('change', function() {
            currentDraftId = this.value; 
            mySchedule = allSchedules[currentDraftId].subjects; // Меняем рабочий массив
            
            if (scheduleNameInput) {
                scheduleNameInput.value = allSchedules[currentDraftId].name; 
            }
            
            saveToLocalStorage();
            renderSchedule(); // Перерисовываем таблицу с новыми данными
        });
    }

    // Изменение имени текущей таблицы
    if (scheduleNameInput) {
        scheduleNameInput.addEventListener('input', function(e) {
            const newName = e.target.value || "Untitled Schedule";
            
            allSchedules[currentDraftId].name = newName;
            const selectedOption = draftSelect.options[draftSelect.selectedIndex];
            if (selectedOption) selectedOption.textContent = newName;
            
            saveToLocalStorage();
        });
    }

    // Создание новой таблицы
    if (newTableBtn) {
        newTableBtn.addEventListener('click', function() {
            const newId = 'draft_' + Date.now();
            const newName = 'New Schedule';

            // Создаем новый пустой объект в базе
            allSchedules[newId] = {
                name: newName,
                subjects: []
            };
            
            currentDraftId = newId;
            mySchedule = allSchedules[currentDraftId].subjects;
            
            renderDraftList(); 
            saveToLocalStorage();
            renderSchedule(); 
        });
    }

    // ==========================================
    // ЛОГИКА УДАЛЕНИЯ ТЕКУЩЕЙ ТАБЛИЦЫ
    // ==========================================
    const deleteDraftBtn = document.getElementById('deleteDraftBtn');
    
    if (deleteDraftBtn) {
        deleteDraftBtn.addEventListener('click', function() {
            const draftName = allSchedules[currentDraftId].name;
            
            // Запрашиваем подтверждение
            const isConfirmed = confirm(`Are you sure you want to delete "${draftName}"? \nThis action cannot be undone.`);
            
            if (isConfirmed) {
                // Удаляем текущий драфт из базы
                delete allSchedules[currentDraftId];
                
                // Проверяем, остались ли еще драфты
                const remainingDrafts = Object.keys(allSchedules);
                
                if (remainingDrafts.length === 0) {
                    // Если мы удалили последний драфт, создаем новый пустой
                    const newId = 'draft_' + Date.now();
                    allSchedules[newId] = {
                        name: 'New Schedule',
                        subjects: []
                    };
                    currentDraftId = newId;
                } else {
                    // Если остались другие, просто переключаемся на первый попавшийся
                    currentDraftId = remainingDrafts[0];
                }
                
                // Обновляем рабочий массив и интерфейс
                mySchedule = allSchedules[currentDraftId].subjects;
                
                saveToLocalStorage();
                renderDraftList();
                renderSchedule();
            }
        });
    }

    // --- ЗАПУСК ВСЕХ ФУНКЦИЙ ---
    renderDraftList();        // 1. Отрисовываем селектор драфтов
    renderAvailableModules(); // 2. Отрисовываем левое меню из базы
    renderSchedule();         // 3. Отрисовываем таблицу из памяти (текущего драфта)
});