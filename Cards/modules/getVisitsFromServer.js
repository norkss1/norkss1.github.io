import API from "/modules/API.js";
import {visitLayout} from '/filters/filters.js';
import {arrayVisitsView} from '/scripts/index.js';
import {VisitCardiologist, VisitDentist, VisitTherapist} from "../models/visitsModel";


function getVisits() {

    API.getCards()
        .then(responses => {
               responses.forEach(response => {
           createVisitForView(response)

        })
            visitLayout(arrayVisitsView)
})
}

function createVisitForView(object){           //создает обьект согласно нужного класса. Добавялет обьект в массив для отображения

    let cardObjView = {}

    if(object.doctor === 'Стоматолог'){
        cardObjView = new VisitDentist(object)
    }else
    if (object.doctor === 'Кардиолог'){
        cardObjView = new VisitCardiologist(object)
    }else
    if (object.doctor === 'Терапевт'){
        cardObjView = new VisitTherapist(object)
    }

    arrayVisitsView.push(cardObjView)

}


export {getVisits}
export {createVisitForView}
