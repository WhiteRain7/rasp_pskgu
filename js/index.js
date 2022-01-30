
async function main(find_name, group_name) {

    function find_substr_in_array_of_str(arr, sub) {
        sub = sub.toLowerCase()
        found = []
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].toLowerCase().indexOf(sub) != -1) {
                found.push(arr[i])
            }
        }
        found.sort()
        return found
    }

    let RASP = document.getElementById('Group_Rasp')
    let GROUPSLIST = document.getElementById('Groups_List')

    if (find_name) {

        let list_names = await get_list_groups()
        groups_found = find_substr_in_array_of_str(list_names, find_name)
        generate_list(groups_found, GROUPSLIST)

    } else if (group_name) {
        let group = await get_group_info(group_name)

        // Вставка имени группы
        rasp_add_group_name(group.name, RASP)

        let days_length = Object.keys(group.days).length

        // Проверка на пустоту
        if (days_length == 0) {
            rasp_add_empty(RASP)
            return
        }

        // Генерация таблиц
        let first_date = Object.keys(group.days)[0]
        let last_date = new Date(Object.keys(group.days)[days_length - 1])
        let day = get_monday(first_date)

        while (new Date(day) <= last_date) {
            generate_table(RASP, group, day)
            day = get_next_day(day, 7)
        }
    }
}


window.onload = async function () {
    const params = new URLSearchParams(window.location.search)
    let find_name = params.get("find_group_name")
    let group_name = params.get("group_name")
    await main(find_name, group_name)
}
