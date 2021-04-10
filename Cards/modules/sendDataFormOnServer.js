import API from "/modules/API.js";
import {createVisitForView} from "/modules/getVisitsFromServer.js"
import {errorResponse} from "/modules/Layout.js"
import Layout from "/modules/Layout";
import {visitLayout} from "../filters/filters";
import {arrayVisitsView, elementDeleteINArray} from "../scripts";

//Функция формирования обьекта запроса
//Функция отправки запроса на создание визита на серевере + получение ответа сервера

function cardObjCreate() {

    const form = document.querySelector('#form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let testObj = {}
        const formData = new FormData(form);

        for (let [key, value] of formData.entries()) {
            testObj[key] = value;
            if (value === '') {
                return false
            }
        }

        API.addCard(testObj)
            .then(r => errorResponse(r)
            )
            .then((res) => {
                form.reset()
                Layout.newForm()
                createVisitForView(JSON.parse(res))
                visitLayout(arrayVisitsView)
            })
    })
}

function cardObjEdit(id) {

    const form = document.getElementById(`form__edit_${id}`);
    let cardObj = {}
    const formData = new FormData(form);

    for (let [key, value] of formData.entries()) {
        cardObj[key] = value;
        if (value === '') {
            return false
        }
    }

    API.changeCard(id, cardObj)
        .then(response => {
            return JSON.parse(response)
        })
        .then((res) => {
            elementDeleteINArray(arrayVisitsView, res.id)
            createVisitForView(res)
            visitLayout(arrayVisitsView)
        })
}

export {cardObjCreate};
export {cardObjEdit};
