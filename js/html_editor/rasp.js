/* Работа с Group_Rasp элементом */

function rasp_add_empty() {
    let empty = document.createElement('h2');
    empty.innerHTML = empty.innerHTML + 'Расписание пустое';
    document.getElementById('Group_Rasp').appendChild(empty);
}

function generate_table(group, day, week_number) {
    let rasp = document.createElement('div');
    rasp.classList.add('rasp');
    rasp.id = `Week_${week_number}`
    const dayDate = new Date(day).getDate();
    const dayMonth = monthNames[new Date(day).getMonth()];
    const nextDayDate = new Date(get_next_day(day, 6)).getDate();
    const nextDayMonth = monthNames[new Date(get_next_day(day, 6)).getMonth()];
    rasp.innerHTML=`<h3 class="rasp-title">${week_number}-я неделя (${dayDate} ${dayMonth} - ${nextDayDate} ${nextDayMonth})</h3>`;
    let table = document.createElement('table');
    table.classList.add('rasp-table');
    let tbody = document.createElement('tbody');

    document.getElementById("Weekbar_List").insertAdjacentHTML("beforeend",`<a class="weekbar-list__item" href="#Week_${week_number}" onclick="Switch('Weekbar');"> ${week_number}. ${dayDate} ${dayMonth} - ${nextDayDate} ${nextDayMonth}</a>`)

    generate_top(tbody)
    for (let i = 0; i < 7; i++) {
        let day_date = get_next_day(day, i)
        gen_row_data(tbody, day_date, group.days[day_date], group.prefix[0])
    }
    used_class_names = create_used_class_names()

    //========================================= should to be remade in future =========================================//
    let i = 1
    while (document.getElementById('Week_' + i)) {
        try {
            eval(`Week_${i}.children[1].children[0].children[7].children[7].style['border-radius'] = '0px 0px 20px 0px'`)
            i++
        } catch {break}
    }
    //========================================= should to be remade in future =========================================//

    table.appendChild(tbody);
    rasp.appendChild(table);
    let div = document.createElement('br');
    rasp.appendChild(div);
    document.getElementById('Group_Rasp').appendChild(rasp);
}

function generate_printable_table(group, day, week_number) {
    let rasp = document.createElement('div');
    rasp.classList.add('Printable_rasp');
    rasp.id = `Week_${week_number}`
    const dayDate = new Date(day).getDate();
    const dayMonth = monthNames[new Date(day).getMonth()];
    const nextDayDate = new Date(get_next_day(day, 6)).getDate();
    const nextDayMonth = monthNames[new Date(get_next_day(day, 6)).getMonth()];
    rasp.innerHTML  = `
    <div>
        <h3 class="rasp-title">${week_number}-я неделя (${dayDate} ${dayMonth} - ${nextDayDate} ${nextDayMonth})</h3>
        <h3 class="rasp-group">${group.name.replaceAll('_', ' ')}</h3>
    </div>
    `;
    let table = document.createElement('table');
    table.classList.add('rasp-table');
    let tbody = document.createElement('tbody');

    generate_top(tbody)
    for (let i = 0; i < 7; i++) {
        let day_date = get_next_day(day, i)
        gen_row_data(tbody, day_date, group.days[day_date], group.prefix[0])
    }
    used_class_names = create_used_class_names()

    //========================================= should to be remade in future =========================================//
    let i = 1
    while (document.getElementById('Week_' + i)) {
        try {
            eval(`Week_${i}.children[1].children[0].children[7].children[7].style['border-radius'] = '0px 0px 20px 0px'`)
            i++
        } catch {break}
    }
    //========================================= should to be remade in future =========================================//

    table.appendChild(tbody);
    rasp.appendChild(table);
    let div = document.createElement('br');
    rasp.appendChild(div);
    document.getElementById('Group_Rasp').appendChild(rasp);
}


// Генерация шапки таблицы
num_cls = ['1-я пара', '2-я пара', '3-я пара', '4-я пара', '5-я пара', '6-я пара', '7-я пара']
time_cls = ['08:30-10:00', '10:15-11:45', '12:30-14:00', '14:15-15:45', '16:00-17:30', '18:00-19:30', '19:40-21:10']

function generate_top(table) {

    function div_in_td(txt1, txt2, tr, class_name) {
        let td = document.createElement('td');
        td.classList.add(class_name);
        add_div(txt1, td, class_name + '-pair')
        add_div(txt2, td, class_name + '-time')
        tr.appendChild(td)
    }

    let tr = document.createElement('tr');
    add_td('<p>Дата</p>', tr, 'rasp-table-date')
    for (let i = 0; i < 7; i++) {
        div_in_td(num_cls[i], time_cls[i], tr, 'rasp-table-shedule')
    }
    table.appendChild(tr)
}

function set_table_padding (side, input) {
    if (input.value < 0 ) input.value = 0
    if (input.value > 20) input.value = 20
    document.documentElement.style.setProperty(`--table-${side}_padding`, input.value+"mm")
    document.getElementById(side+'_padding_setter-range').value = input.value
    document.getElementById(side+'_padding_setter-input').value = input.value
}

function switch_theme_using (input) {
    if (input.checked) set_clr_theme('light', true, false)
    else {
        MODE = readCookie('mode')
        if (MODE) MODE = MODE.split('|')[0]
        else MODE = 'light'
        set_clr_theme(MODE, true, false)
    }
}

function switch_filters_using (input) {
    let styles = document.getElementsByTagName('style')

    if (input.checked) for (style of styles) {
        if (ignored_styles.indexOf(style.getAttribute('id')) !== -1) continue
        style.removeAttribute('media')
    }
    else for (style of styles) {
        if (ignored_styles.indexOf(style.getAttribute('id')) !== -1) continue
        style.setAttribute('media', '1')
    }
}

function switch_group_name_display (input) {
    let group_names = document.getElementsByClassName('rasp-group')

    if (input.checked) for (group of group_names) group.classList.remove('rasp-group--hidden')
    else for (group of group_names) group.classList.add('rasp-group--hidden')
}

function switch_saturday (input) {
    let timetables = document.getElementsByClassName('Printable_rasp')

    if (input.checked) for (timetable of timetables) {
        timetable.children[1].children[0].children[6].classList.add('hidden')
    }
    else for (timetable of timetables) {
        timetable.children[1].children[0].children[6].classList.remove('hidden')
    }
}

function switch_sunday (input) {
    let timetables = document.getElementsByClassName('rasp-table')

    if (input.checked) for (timetable of timetables) {
        timetable.children[0].children[7].classList.add('hidden')
    }
    else for (timetable of timetables) {
        timetable.children[0].children[7].classList.remove('hidden')
    }
}
