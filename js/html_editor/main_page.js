function generate_main_page()
{
    document.getElementById("MAIN").innerHTML=`
    <div id='favorite_list' onclick='open_favorite_list()'>
        <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
        <div id='favorite_content' class='hidden'></div>
    </div>
    <div class="enable_setting_menu" style='position: absolute; top: 6px; right: 6px;'>
        <svg name='special' onclick="Switch('setting_menu');" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
        <div class="background_of_setting_menu hidden" id='setting_menu'>
            <div class="setting_menu">
                <div class="switcher" onclick="Switch('setting_menu');">
                    <svg name='special' xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                </div>
                <div class="switcher-info" onclick="">
                    <label style='color: var(--color-additionaly)'>Справка</label>
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                </div>
                <div class="switcher-mode" onclick="switch_theme_list();">
                    <div>    
                        <label>Выбрать цветовую тему</label>
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg>
                    </div>
                    <div id="theme_list" class="clr_theme_list hidden"></div>
                </div>
                <div class="switcher-issue_form" onclick="switch_issue_report();">
                    <label>Сообщить об ошибке</label>
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                </div>
            </div>
        </div>
    </div>
    <h1 class="title">Расписание<br>ПсковГУ</h1>
    <div class="search" id="Search_Group">
        <form class="search-form">
            <svg class="search-form-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            <input class="search-form-input" name="find_group_name" type="search" autocomplete="off" placeholder="группа/преподаватель" />
            <button class="search-form-button" type="submit">Поиск</button>
        </form>
        <a class="search-showall" href="?list">Показать всё</a>
    </div>
    <footer class="footer">
        <a class="footer-link" href="http://rasp.pskgu.ru">Оригинал расписания</a>
        <div class="footer-authors">© MrGick, KGlebB, WhiteRain7<br>сайт создан используя <a class="footer-authors-link" href="https://github.com/mrgick/pskgu_api">API</a></div>
    </footer>
    <aside id="theme_editor" class="theme_aside_editor hidden">
    </aside>
    <aside id="issue_form" class="aside_form hidden">
    </aside>
    `
}

function generate_search_page(text)
{
    document.getElementById("MAIN").innerHTML=`
    <div class="enable_setting_menu" style='position: absolute; top: 6px; right: 6px;'>
        <svg name='special' onclick="Switch('setting_menu');" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
        <div class="background_of_setting_menu hidden" id='setting_menu'>
            <div class="setting_menu">
                <div class="switcher" onclick="Switch('setting_menu');">
                    <svg name='special' xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                </div>
                <div class="switcher-info" onclick="">
                    <label style='color: var(--color-additionaly)'>Справка</label>
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                </div>
                <div class="switcher-mode" onclick="switch_theme_list();">
                    <div>    
                        <label>Выбрать цветовую тему</label>
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg>
                    </div>
                    <div id="theme_list" class="clr_theme_list hidden"></div>
                </div>
                <div class="switcher-issue_form" onclick="switch_issue_report();">
                    <label>Сообщить об ошибке</label>
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                </div>
            </div>
        </div>
    </div>
    <header class="header">
        <h1 class="title title--top"><a href="${window.location.pathname}">Расписание<br>ПсковГУ</a></h1>
        <div class="search search--top" id="Search_Group">
            <form class="search-form">
                <input class="search-form-input" value="${text}" name="find_group_name" type="search" autocomplete="off" placeholder="группа/преподаватель" />
                <svg class="search-form-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                <button class="search-form-button" type="submit">Поиск</button>
            </form>
        </div>
    </header>
    <div class="groups" id="Groups_List">
        <p class="groups-text">Поиск соответствий...</p>
    </div>
    <aside id="theme_editor" class="theme_aside_editor hidden">
    </aside>
    <aside id="issue_form" class="aside_form hidden">
    </aside>
    `
}

function generate_rasp_page(group)
{
    document.getElementById("MAIN").innerHTML=`
    <header class="header header--rasp" style="z-index: 3">
        <h1 class="title title--top"><a href="${window.location.pathname}">Расписание<br>ПсковГУ</a></h1>
        <div class="header-main">
            <h2 class="group_name" id="Group_Name">${group.prefix[0]=="преподаватель" ? "Преподаватель" : "Группа"} ${group.name.replace("_", " ")}</h2>
            <div class="header-main-right">
                <div name='menu_content'>
                    <div class="enable_alt_click" onclick="switch_alt_click();" title='Выделять схожие элементы в таблице по нажатию. Аналогично alt + ЛКМ.'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                    </div>
                    <div class="enable_setting_menu" style='position: relative'>
                        <svg name='special' onclick="Switch('setting_menu');" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                        <div class="background_of_setting_menu hidden" id='setting_menu'>
                            <div class="setting_menu">
                                <div class="switcher" onclick="Switch('setting_menu');">
                                    <svg name='special' xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                                </div>
                                <div class="switcher-info" onclick="">
                                    <label style='color: var(--color-additionaly)'>Справка</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                                </div>
                                <div class="switcher-favorite" onclick="switch_favorite()">
                                    <label>Добавить в избранное</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                                </div>
                                <div class="switcher-timetrack" onclick="change_tracking_status();">
                                    <label>Отслеживание времени</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg>
                                </div>
                                <div class="switcher-editbar" onclick="editbarOpen();">
                                    <label>Настроить фильтры</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg>
                                </div>
                                <div class="switcher-mode" onclick="switch_theme_list();">
                                    <div>    
                                        <label>Выбрать цветовую тему</label>
                                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg>
                                    </div>
                                    <div id="theme_list" class="clr_theme_list hidden"></div>
                                </div>
                                <div class="switcher-print" onclick="open_print_page()">
                                    <label>Распечатать</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                                </div>
                                <div class="switcher-issue_form" onclick="switch_issue_report();">
                                    <label>Сообщить об ошибке</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                                </div>
                                <div id='date_of_last_update'>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <a class="header-main-back" href="${group.page_url}">Оригинал</a>
            </div>
        </div>
    </header>
    <container class="rpage">
        <div class="switcher-weekbar" onclick="Switch('Weekbar');">
            <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/></svg>
        </div>
        <aside class="weekbar hidden" id="Weekbar">
            <p class="weekbar-title">Список недель:</p>
            <div class="weekbar-list" id="Weekbar_List"></div>
        </aside>
        <aside class="editbar hidden" id="Editbar">
            <p class="editbar-title">Настройки отображения пар</p>
            <a class="asidebar-close" onclick="editbarClose();">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"></svg>
            </a>
            <div class="editbar-main">
                <div class="editbar-main-choice" id="EditOrder">
                </div>
                <div class="editbar-main-menu">
                    <a class="editbar-main-menu__button editbar-main-menu__button--accept" onclick="save_settings();">Применить</a>
                    <a class="editbar-main-menu__button editbar-main-menu__button--disabled editbar-main-menu__button--import" disabled>Импортировать</a>
                    <a class="editbar-main-menu__button editbar-main-menu__button--disabled editbar-main-menu__button--export" disabled>Экспортировать</a>
                    <a class="editbar-main-menu__button editbar-main-menu__button--cancel" onclick="load_settings();">Отменить</a>
                    <div class="editbar-main-menu__button editbar-main-menu__button--recommendations">
                        <a>Рекомендации</a>
                        <div class='editbar-main-menu__rec_list' id='rec_list'></div>
                    </div>
                    <a class="editbar-main-menu__button editbar-main-menu__button--clear" onclick="set_clear_styles()">Сбросить</a>
                </div>
            </div>
        </aside>
        <aside class="filterbar hidden" id="Filterbar">
        <a class="asidebar-close" onclick="filterbarClose();">
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"></svg>
        </a>
            <p class="filterbar-title">Пользовательские фильтры</p>
            <div class="filterbar-main">
                <div class="filterbar-main-choice" id="Filters_List">
                </div>
            </div>
        </aside>
        <aside id="issue_form" class="aside_form hidden">
        </aside>
        <aside id="theme_editor" class="theme_aside_editor hidden">
        </aside>
        <aside id='aside_warning' class='hidden'>
            <div id='AW_header'><h1>Предупреждение</h1></div>
            <div id='AW_content'><p>Все занятия по данному расписанию закончились, а последнее обновление было больше месяца назад. Возможно, оно более не используется.</p></div>
            <div id='AW_OK'><button onclick='document.getElementById("aside_warning").classList.add("hidden")'>хорошо</button></div>
        </aside>
        <div id="Group_Rasp">
        </div>
    </container>
    `
}

function generate_groups_list()
{
    document.getElementById("MAIN").innerHTML=`
    <div class="enable_setting_menu" style='position: absolute; top: 6px; right: 6px;'>
        <svg name='special' onclick="Switch('setting_menu');" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
        <div class="background_of_setting_menu hidden" id='setting_menu'>
            <div class="setting_menu">
                <div class="switcher" onclick="Switch('setting_menu');">
                    <svg name='special' xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                </div>
                <div class="switcher-info" onclick="">
                    <label style='color: var(--color-additionaly)'>Справка</label>
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                </div>
                <div class="switcher-mode" onclick="switch_theme_list();">
                    <div>    
                        <label>Выбрать цветовую тему</label>
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg>
                    </div>
                    <div id="theme_list" class="clr_theme_list hidden"></div>
                </div>
                <div class="switcher-issue_form" onclick="switch_issue_report();">
                    <label>Сообщить об ошибке</label>
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                </div>
            </div>
        </div>
    </div>
    <h1 class="title title--top"><a href="${window.location.pathname}">Расписание ПсковГУ</a></h1>
    <div id="Lists">
        <div class="possible_list" id="Education_Form">
        </div>
    </div>
    <aside id="theme_editor" class="theme_aside_editor hidden">
    </aside>
    <aside id="issue_form" class="aside_form hidden">
    </aside>
    `
}

function generate_print_preview()
{
    document.getElementById("MAIN").innerHTML=`
    <div id="Group_Rasp">
    </div>
    <aside id="print_panel" class="print_aside_form">
        <div class="switcher-print" onclick="print()" style='text-align: left'>
            <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
            <label style='margin-left: 0px;'>Печать</label>
        </div>
        <div id='PP_content'>
            <div class='PP_subcontent'>
                <label>Боковые отступы (мм)</label>
                <div class='padding_setters'>
                    <input id='side_padding_setter-range' type='range'  min="0" max="20" value="5" step="1" onchange='set_table_padding("side", this)' oninput='document.getElementById("side_padding_setter-input").value = this.value'>
                    <input id='side_padding_setter-input' type='number' min="0" max="20" value="5" step="1" onchange='set_table_padding("side", this)'>
                </div>
            </div>
            <div class='PP_subcontent'>
                <label>Верхний отступ (мм)</label>
                <div class='padding_setters'>
                    <input id='top_padding_setter-range' type='range'  min="0" max="20" value="5" step="1" onchange='set_table_padding("top", this)' oninput='document.getElementById("top_padding_setter-input").value = this.value'>
                    <input id='top_padding_setter-input' type='number' min="0" max="20" value="5" step="1" onchange='set_table_padding("top", this)'>
                </div>
            </div>
            <div class='PP_subcontent'>
                <label>Нижний отступ (мм)</label>
                <div class='padding_setters'>
                    <input id='bottom_padding_setter-range' type='range'  min="0" max="20" value="5" step="1" onchange='set_table_padding("bottom", this)' oninput='document.getElementById("bottom_padding_setter-input").value = this.value'>
                    <input id='bottom_padding_setter-input' type='number' min="0" max="20" value="5" step="1" onchange='set_table_padding("bottom", this)'>
                </div>
            </div>
            <div class='PP_subcontent' id='light_theme_using'>
                <input type='checkbox' name='use_light_theme' onchange='switch_theme_using(this)' checked>
                <label for='use_light_theme'>Светлая тема</label>
            </div>
            <div class='PP_subcontent' id='filters_using'>
                <input type='checkbox' name='use_filters' onchange='switch_filters_using(this)'>
                <label for='use_filters'>Фильтры</label>
            </div>
            <div class='PP_subcontent' id='group_name_display'>
                <input type='checkbox' name='display_group_name' onchange='switch_group_name_display(this)' checked>
                <label for='display_group_name'>Принадлежность</label>
            </div>
            <div class='PP_subcontent' id='without_saturday'>
                <input type='checkbox' name='display_saturday' onchange='switch_saturday(this)'>
                <label for='display_saturday'>скрывать субботу</label>
            </div>
            <div class='PP_subcontent' id='without_sunday'>
                <input type='checkbox' name='display_sunday' onchange='switch_sunday(this)'>
                <label for='display_sunday'>скрывать воскресенье</label>
            </div>
            <p>Рекомендуем при печати выставить альбомную ориентацию страницы и выключить отображение полей.</p>
        </div>
    </aside>
    `
}
