import {Input} from "./classInputs";
import {Select} from "./classSelect"
import {Textarea} from "./classTextarea";

class Form{
    constructor() {

    }
    renderDoctor() {const form = document.createElement('div')
        const elemSelect = new Select("form-select", "urgency", 'Срочность,Обычная,Приоритетная,Неотложная,clear')
        const elemCreate2 = new Input("text", "form-control", "title", "Введите цель визита")
        const elemCreate4 = new Input("text", "form-control", "fullName", "Введите Фамилию Имя Отчество")
        const elemTextarea = new Textarea("5", "58", "description", "Краткое описание визита","clear")
        return form.innerHTML = `

${elemSelect.renderSelect()} 
${elemCreate2.renderInput()}
${elemCreate4.renderInput()}
${elemTextarea.renderTextarea()}` }
    static formValid(){
        const form = document.querySelector('#form')

        const formReq = document.querySelectorAll('.form-control')

        form.addEventListener('submit', function (event) {
            event.preventDefault()
            const errors = form.querySelectorAll('.error')

            for (let i = 0; i < errors.length; i++) {
                errors[i].remove()
            }

            for (let i = 0; i < formReq.length; i++) {
                if (!formReq[i].value) {
                    const error = document.createElement('div')
                    error.className = 'error'
                    error.style.color = 'red'
                    error.innerHTML = 'Не заполненое поле '
                    form[i].parentElement.insertBefore(error, formReq[i])
                }
            }
        })
    }
}
class FormCardiolog extends Form{
    constructor() {
        super();
    } renderDoctor() {

        const form = document.createElement('div')

        const elemCreate1 = new Input("date", "form-control", "date", "Введите дату визита ")
        const elemCreate5 = new Input("text", "form-control", "pressure", "Введите давление в формате XXX/XX")
        const elemCreate6 = new Input("text", "form-control", "bodyMass", "Введите массу тела")
        const elemCreate7 = new Input("text", "form-control", "disease", "Введите перенесенные заболевания сердечно-сосудистой системы")
        const elemCreate8 = new Input("text", "form-control", "age", "Введите возраст пациента")

        return form.innerHTML = `

${elemCreate1.renderInput()}
${elemCreate5.renderInput()}
${elemCreate6.renderInput()}
${elemCreate7.renderInput()}
${elemCreate8.renderInput()}
`

    }
}
class FormDentist extends Form{constructor() {
    super();
}
    renderDoctor() {
        const form = document.createElement('div')

        const elemCreate1 = new Input("date", "form-control", "date", "Введите дату визита ")
        const elemCreate5 = new Input("date", "form-control", "dateOfLastVisit", "Введите дату последнего визита ")

        return form.innerHTML = `
${elemCreate1.renderInput()}
${elemCreate5.renderInput()}

`

    }
}
class  FormTherapist extends Form{constructor() {
    super();
}
    renderDoctor(){
        const form = document.createElement('div')

        const elemCreate1 = new Input("date", "form-control", "date", "Введите дату визита ")
        const elemCreate8 = new Input("text", "form-control", "age", "Введите возраст пациента")

        return form.innerHTML = `
${elemCreate1.renderInput()}
${elemCreate8.renderInput()}
`

    }
}

export {
    Form,
    FormCardiolog,
    FormDentist,
    FormTherapist
}