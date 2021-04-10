import {cardObjEdit} from "/modules/sendDataFormOnServer";
import {visitLayout} from "../filters/filters";
import {arrayVisitsView} from "../scripts";


function visitOneView(visit){

    let visitHTML = document.querySelector('.visits__item-wrapper');

    if(visit.doctor === 'Стоматолог'){
        visitHTML.insertAdjacentHTML("afterbegin", visit.renderDentist(visit))
    }else
    if (visit.doctor === 'Кардиолог'){
        visitHTML.insertAdjacentHTML("afterbegin", visit.renderCardiologist(visit))
    }else
    if (visit.doctor === 'Терапевт'){
        visitHTML.insertAdjacentHTML("afterbegin", visit.renderTherapist(visit))
    }
    visit.deleteVisit(visit)
   visit.editVisit(visit)
}

function visitsView(visitsArray) {

    let visitHTML = document.querySelector('.visits__item-wrapper');
    visitHTML.innerHTML = '';

    if (!visitsArray.length){
        visitHTML.insertAdjacentHTML("afterbegin", `<h2>No items have been added</h2>`)
    }else {
        visitsArray.forEach(visit => {
            visitOneView(visit)
        })
    }

    const items = document.querySelectorAll('.button__more');

    for (const item of items) {
        item.addEventListener('click', () => {
           shoowInput(item)
        })
    }
    function shoowInput(element) {
        element.nextElementSibling.classList.toggle('visible');
        if (element.value === "Показать больше") {
            element.value = "Скрыть";
        } else {
            element.value = "Показать больше";
        }
    }

}

function renderForm(arg, editID) {

    const elem = document.getElementById(`${editID}`)
    const form = document.getElementById(`test${editID}`)
    elem.style.display = "none"

    if (arg.doctor === "Стоматолог") {

        const {doctor, id, urgency, date, title, description, dateOfLastVisit, fullName} = arg;

        form.insertAdjacentHTML('afterend',
            ` 
                            <h4>Визит к ${doctor}у</h4>
                            <form id="form__edit_${id}">
                            <select id="selectDoctors"  class="form-select"  style="display: none" name="doctor" aria-label="Default select example">
                              <option value="Стоматолог" selected>Стоматолог</option>
                            </select>
                            <select class="form-select clear" name="urgency" aria-label="Выберите срочность">
                              <option selected>Срочность</option>
                              <option value="Обычная" ${urgency === "Обычная" ? "selected" : ""} >Обычная</option>
                              <option value="Приоритетная" ${urgency === "Приоритетная" ? "selected" : ""}>Приоритетная</option>
                              <option value="Неотложная" ${urgency === "Неотложная" ? "selected" : ""}>Неотложная</option>
                            </select>                                                    
                            <input class="form-control clear" name="date" type="date" value=${date} id="dateNow" title="Введите дату посещения врача">
                            <input class="form-control clear" name="title" type="text" value='${title}' placeholder="Цель визита" title="Введите цель визита">
                            <input class="form-control clear" name="description" type="text" value='${description}' placeholder="Краткое описание визита" title="Введите краткое описание визита">
                            <input class="form-control clear" name="fullName" type="text" value='${fullName}' placeholder="ФИО" title="Введите Фамилию Имя Отчество">
                            <input class="form-control clear" name="dateOfLastVisit" type="date" value=${dateOfLastVisit} placeholder="Дата последнего визита" title="Введите дату последнего посещения">
                          </form> 
                         <button  class="button__edit">Сохранить изменения</button>
                         <button  class="button__undo">Отмена</button>
                        `)
    }
    if (arg.doctor === 'Кардиолог') {

        const {age, id, bodyMass, date, description, disease, doctor, fullName, pressure, title, urgency} = arg;

        form.insertAdjacentHTML('afterend',
            `
                             <h4>Визит к ${doctor}у</h4>
                            <form id="form__edit_${id}">  
                            <select id="selectDoctors"  class="form-select" style="display: none" name="doctor" aria-label="Default select example">
                              <option value="Кардиолог" selected>Кардиолог</option>
                            </select>
                            <select class="form-select clear" name="urgency" aria-label="Выберите срочность">
                              <option selected>Срочность</option>
                              <option value="Обычная" ${urgency === "Обычная" ? "selected" : ""} >Обычная</option>
                              <option value="Приоритетная" ${urgency === "Приоритетная" ? "selected" : ""}>Приоритетная</option>
                              <option value="Неотложная" ${urgency === "Неотложная" ? "selected" : ""}>Неотложная</option>
                            </select>
                            <input class="form-control clear" name="date" value=${date} type="date" id="dateNow" title="Введите дату посещения врача">
                            <input class="form-control clear" name="title" value='${title}' type="text" placeholder="Цель визита" title="Введите цель визита">
                            <input class="form-control clear" name="description" value='${description}' type="text" placeholder="Краткое описание визита" title="Введите краткое описание визита">
                            <input class="form-control clear" name="fullName" value='${fullName}' type="text" placeholder="ФИО" title="Введите Фамилию Имя Отчество">
                            <input class="form-control clear" name="pressure" value='${pressure}' type="text" placeholder="Обычное давление" title="Введите давление в формате XXX/XX">
                            <input class="form-control clear" name="bodyMass" value='${bodyMass}' type="text" placeholder="Масса тела" title="Введите массу тела">
                            <input class="form-control clear" name="disease" value='${disease}' type="text" placeholder="Заболевания" title="Введите перенесенные заболевания сердечно-сосудистой системы">
                            <input class="form-control clear" name="age" value=${age} type="text" placeholder="Возраст" title="Введите возраст пациента">
                            </form>
                        <button  class="button__edit">Сохранить изменения</button>
                        <button  class="button__undo">Отмена</button>
                        `)
    }
    if (arg.doctor === 'Терапевт') {
        const {age, id, date, description, doctor, fullName, title, urgency} = arg;

        form.insertAdjacentHTML('afterend',
            `
                              <h4>Визит к ${doctor}у</h4>
                            <form id="form__edit_${id}">
                            <select id="selectDoctors"  class="form-select" style="display: none" name="doctor" aria-label="Default select example">
                              <option value="Терапевт" selected>Терапевт</option>
                            </select>
                            <select class="form-select clear" name="urgency" aria-label="Выберите срочность">
                              <option selected>Срочность</option>
                              <option value="Обычная" ${urgency === "Обычная" ? "selected" : ""} >Обычная</option>
                              <option value="Приоритетная" ${urgency === "Приоритетная" ? "selected" : ""}>Приоритетная</option>
                              <option value="Неотложная" ${urgency === "Неотложная" ? "selected" : ""}>Неотложная</option>
                            </select>
                            <input class="form-control clear" name="date" value=${date} type="date" id="dateNow" title="Введите дату посещения врача">
                            <input class="form-control clear" name="title" value='${title}' type="text" placeholder="Цель визита" title="Введите цель визита">
                            <input class="form-control clear" name="description" value='${description}' type="text" placeholder="Краткое описание визита" title="Введите краткое описание визита">
                            <input class="form-control clear" name="fullName" type="text" value='${fullName}' placeholder="ФИО" title="Введите Фамилию Имя Отчество">
                            <input class="form-control clear" name="age" value=${age} type="text" placeholder="Возраст" title="Введите возраст пациента">
                            </form>
                      <button  class="button__edit">Сохранить изменения</button>
                      <button  class="button__undo">Отмена</button>
                        `)

    }


    form.parentElement.querySelector('.button__edit').addEventListener(`click`, () => {
        cardObjEdit(editID)
    })

    form.parentElement.querySelector('.button__undo').addEventListener(`click`, () => {
        visitLayout(arrayVisitsView)
    })

}

function errorResponse(res) {
    if (res.ok) {
        return res.json()
    }
    return res.text().then(error => {
        const e = new Error('Упс  , что то пошло не так...')
        e.data = error
        throw e
    })
}

export {visitsView};
export  {visitOneView};
export {renderForm};
export {errorResponse};
