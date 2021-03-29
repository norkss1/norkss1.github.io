import API from "/modules/API.js";
import {cardObjCreate} from '/modules/sendDataFormOnServer'
import {getVisits} from "./getVisitsFromServer";
import {Modal} from "./ClassModal"
import {formLogin} from "./classInputs";
import {Select} from "./classSelect"
import {
    Form,
    FormCardiolog,
    FormDentist,
    FormTherapist
} from "./classForms";


//форма авторизации
function renderModalform() {
    const modalLogin = new Modal('Войти', formLogin(), '.header',)
    modalLogin.renderModal()
    Form.formValid()
}

// отправка запроса авторизации
function responseEnter() {
    const getBtn = document.getElementById('submit');
    const email = document.querySelector('[name="email"]')
    const password = document.querySelector('[name="password"]')
    getBtn.addEventListener('click', () => {
        API.auth({
            email:
            email.value
            // "comandLink@gmail.com"
            ,
            password:
            // "1234567890"
            password.value

        }).then(r => errorResponse(r)
        )
            .then(token => {
                localStorage.setItem('token', `${token}`)

                newForm()
                getVisits();
            })
    })
}

// Обработка ошибок при отпраавке запроса
function errorResponse(res) {
    if (res.ok) {
        return res.text()
    }
    return res.text().then(error => {
        const e = new Error('Упс  , что то пошло не так...')
        e.data = error
        throw e
    })
}

// создаем форму в модальном окне и выводим туда список выбора докторов
function newForm() {
    const enter = document.getElementById('button-enter')
    const modal = document.querySelector('.btn-close')

    if (localStorage.getItem('token')) {

        const elemSelect=new Select("form-select","doctor","Выбор Врача,Кардиолог,Стоматолог,Терапевт,doctor")

        const  ModalLogin = new Modal('Создать Визит', elemSelect.renderSelect(), '.header')
        ModalLogin.renderModal()
        enter.remove()

        modal.click()
    }
    let returnValue = 0;
    let selector = document.querySelector('[name="doctor"]');
    selector.addEventListener('change', function () {
        returnValue = this.value
        additionalForm(this.value)
    }, false)
    cardObjCreate()
}

// функция вычисления значения селекта выбора докторов
function element() {
    let selector = document.querySelector('[name="doctor"]');
    let returnValue = 0;

    selector.addEventListener('change', function () {
        returnValue = this.value
    }, false)
}

// функция определения времени. Чтобы вставить в нашу форму на позицию текущей даты
function dateNow() {
    let name_input
    document.addEventListener('DOMContentLoaded', function () {
        let d = new Date();
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        name_input = document.getElementById('dateNow')
        name_input.value = day + "-" + month + "-" + year;
    });
    return name_input;
}

//    Функция генерации дополнительныъ полей ввода в модальном окне после выбора доктора
function additionalForm(value) {

    const enterAdd = document.querySelector('[name="doctor"]')

    let renderForm = '';
    const elementsArr = document.querySelectorAll('.clear')

    elementsArr.forEach((elem) => {
        elem.remove()
    })

    if (value === 'Кардиолог') {
        renderForm =new FormCardiolog()


    } else if (value === 'Стоматолог') {
        renderForm =new FormDentist()


    } else if (value === 'Терапевт') {
        renderForm = new FormTherapist()

    }const SiblingsInput=new Form()
    dateNow()
    enterAdd.insertAdjacentHTML('afterend', `${SiblingsInput.renderDoctor()}${renderForm.renderDoctor()}`)
    Form.formValid()
}



export default {
    additionalForm,
    renderModalform,
    responseEnter,
    element,
    newForm,
    errorResponse
}

export {errorResponse}
