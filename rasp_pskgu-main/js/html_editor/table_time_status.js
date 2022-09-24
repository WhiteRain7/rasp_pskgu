/* */

function colorize_cell (lesson, status) {
    let cell = document.getElementById(lesson)
    if (cell) switch (status) {
        case 'usual':
            try {cell.removeAttribute('style')}
            catch {}
            break

        case 'disable': 
            cell.style['background'] = 'rgba(128, 128, 128, 0.25)'
            cell.style['opacity'] = '0.5' 
            break

        case 'active': 
            cell.style['background'] = 'var(--color-time_tracking)'
            break

        case 'part_active': 
            let p = get_lesson_percentage()
            cell.style['background'] = `linear-gradient(to right, var(--color-time_tracking) ${p}%, transparent ${p}%)`
            break

        case 'in_future': 
        default:
            cell.style['backgroundColor'] = 'transparent'
            break
    }
}

function days_between (day_1, day_2) {
    return Math.floor(Math.abs(new Date(day_2) - new Date(day_1))/1000/60/60/24)
    //let days_in_months = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31].map(i=>x+=i, x=-31)
    //day_1 = days_in_months[day_1.slice(-5, -3)-1] + Number(day_1.slice(-2))
    //day_2 = days_in_months[day_2.slice(-5, -3)-1] + Number(day_2.slice(-2))
    //return Math.abs(day_1 - day_2)
}

const lessons_time =   ['08:30', '10:00', 
                        '10:15', '11:45', 
                        '12:30', '14:00', 
                        '14:15', '15:45', 
                        '16:00', '17:30', 
                        '18:00', '19:30', 
                        '19:40', '21:10']

function get_lesson_number_at (time = 'now') {
    if (time == 'now') {
        time = new Date()
        time = time.getHours().toString().padStart(2, '0') + ':' + 
               time.getMinutes().toString().padStart(2, '0')
    }

    if (time < lessons_time[0]) return -1

    for (let lsi = 0; lsi < lessons_time.length-1; lsi++) {
        if (lessons_time[lsi] <= time && time < lessons_time[lsi+1]) {
            return Math.floor(lsi/2)
        }
    }

    return Math.floor(lessons_time.length/2)
}

function check_lesson_time (lesson) {
    lesson--
    return lesson == get_lesson_number_at('now')
}
function day_not_started () {
    let crnt_time = new Date()
    //let crnt_time = new Date(2022, 1, 22, 8, 0)
    crnt_time = crnt_time.getHours().toString().padStart(2, '0') + ':' + 
                crnt_time.getMinutes().toString().padStart(2, '0')
    if (crnt_time < '08:30') return true
    else return false
}

function to_minutes (time) {return Number(time.slice(0, 2))*60 + Number(time.slice(3, 5))}

function get_lesson_percentage () {
    let crnt_time = new Date()
    //let crnt_time = new Date(2022, 1, 16, 10, 10)
    crnt_time = Number(crnt_time.getHours()*60) + Number(crnt_time.getMinutes())
                
    for (let lsi = 0; lsi < lessons_time.length-1; lsi++) {
        if (to_minutes(lessons_time[lsi]) <= crnt_time && crnt_time < to_minutes(lessons_time[lsi+1])) {
            if (lsi%2 == 0) return Math.floor((crnt_time-to_minutes(lessons_time[lsi]))/90*100)
            else return 100
        }
    }
}

function renew_table_time_status (enabled = tracking_status) {
    if (first_day > last_day) return

    let number_of_days = days_between(first_day, last_day)
    let day = new Date(first_day) 
    let iter_day = ''
    let crnt_time = new Date()
    let crnt_day = (crnt_time.getFullYear()+'-'+
                   (Number(crnt_time.getMonth())+1).toString().padStart(2, '0')+'-'+
                   crnt_time.getDate().toString().padStart(2, '0'))

    if (crnt_day < first_day) return

    if (enabled) {
        for (let i = 0; i <= number_of_days; i++) {
            iter_day = (day.getFullYear()+'-'+
                        (Number(day.getMonth())+1).toString().padStart(2, '0')+'-'+
                        day.getDate().toString().padStart(2, '0'))
            
            for (let lesson = 1; lesson <= 7; lesson++) {
                if (iter_day == crnt_day) {
                    if (day_not_started()) return
                    if (check_lesson_time(lesson)) {
                        colorize_cell(iter_day + '-' + lesson, 'part_active')
                        return
                    }
                    colorize_cell(iter_day + '-' + lesson, 'active')
                }
                else colorize_cell(iter_day + '-' + lesson, 'disable')
            }
    
            //colorize_cell(iter_day, 'disable')
            if (iter_day == crnt_day) return
            day.setDate(day.getDate()+1)
        }
    }
    else {
        for (let i = 0; i <= number_of_days; i++) {
            iter_day = (day.getFullYear()+'-'+
                        (Number(day.getMonth())+1).toString().padStart(2, '0')+'-'+
                        day.getDate().toString().padStart(2, '0'))
            
            for (let lesson = 1; lesson <= 7; lesson++) colorize_cell(iter_day + '-' + lesson, 'usual')

            if (iter_day == crnt_day) return
            day.setDate(day.getDate()+1)
        }
    }
}
