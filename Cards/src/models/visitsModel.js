import API from "../modules/API";
import {arrayVisitsView} from "../scripts";
import {visitLayout} from "../filters/filters";
import {renderForm} from "../views/visitsView";
import {elementDeleteINArray} from "../scripts";

class Visit {
    constructor({id, doctor, date, title, description, urgency, fullName}) {
        this.id = id;
        this.doctor = doctor;
        this.date = date;
        this.title = title;
        this.description = description;
        this.urgency = urgency;
        this.fullName = fullName;
    }


    deleteVisit(visit) {
        const deleteIcon = document.getElementById(`${visit.id}`).querySelector('.fa-trash-alt');
        deleteIcon.addEventListener('click', (elem) => {
            elem.preventDefault();
            const deleteID = visit.id;
            API.delCards(deleteID)
                .then((res) => {
                    if (res.ok) {
                        elem.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
                    }
                });
            elementDeleteINArray(arrayVisitsView, deleteID)
            visitLayout(arrayVisitsView)
        })
    }


    editVisit(visit) {
        const editIcon = document.getElementById(`${visit.id}`).querySelector('.fa-edit');
        editIcon.addEventListener('click', (elem) => {
            elem.preventDefault();

            const editID = visit.id;

            renderForm(this, editID)

        })
    }

}

class VisitCardiologist extends Visit {
    constructor({id, doctor, date, title, description, urgency, fullName, pressure, bodyMass, disease, age}) {
        super({id, doctor, date, title, description, urgency, fullName});
        this.pressure = pressure;
        this.bodyMass = bodyMass;
        this.disease = disease;
        this.age = age;
    }

    renderCardiologist(visit) {

        return `<div class="visit__item" >
                       <div  id="${visit.id}"> <ul class="visit__base">
                            
                            <div class="visit__item-title">
                                    <div class="visit__base--title" name="${visit.id}">Visit Cards</div>  
                                    
                                    <div class="edit__button">
                                    <i class="fas fa-edit" ></i>
                                    <i class="fas fa-trash-alt"></i>
                                    </div>
                                       
                            </div>
                            <li class="visit__fullName"><span class="span">ФИО:</span><p>${visit.fullName}</p></li>  
                            <li class="visit__doctor"><span class="span">Доктор:</span><p>${visit.doctor}</p></li>
                        </ul>
                        <input type="button" value="Показать больше" class="button__more">
                        <ul class="visit__option">
                            <li class="visit__title"><span class="span">Цель визита: </span><p>${visit.title}</p></li>
                            <li class="visit__description"><span class="span">Описание визита: </span><p>${visit.description}</p></li>
                            <li class="visit__urgency"><span class="span">Срочность: </span><p>${visit.urgency}</p></li>
                            <li class="visit__date"><p>${visit.date ? `<span class="span">Дата визита: </span>${visit.date}` : ''}</p></li>
                            <li class="visit__pressure"><p>${(visit.pressure) ? `<span class="span">Давление: </span> ${visit.pressure}` : ''}</p></li>
                            <li class="visit__weight"><p>${visit.weight ? `<span class="span">Вес: </span>${visit.weight}` : ''}</p></li>
                            <li class="visit__disease"><p>${visit.disease ? `<span class="span">Перенесенные заболевания: </span>${visit.disease}` : ''}</p></li>
                            <li class="visit__age"><p>${visit.age ? `<span class="span">Возраст: </span>${visit.age}` : ``}</p></li>                                               
                        </ul></div>
                        <div  id="test${visit.id}"></div>
                    </div>
            `;
    }

    deleteVisit(visit) {
        super.deleteVisit(visit);
    }

    editVisit(visit) {
        super.editVisit(visit);
    }

}

class VisitDentist extends Visit {
    constructor({id, doctor, date, title, description, urgency, fullName, dateOfLastVisit}) {
        super({id, doctor, date, title, description, urgency, fullName});
        this.dateOfLastVisit = dateOfLastVisit;
    }

    renderDentist(visit) {

        return `<div class="visit__item" >
                       <div  id="${visit.id}"> <ul class="visit__base">
                            
                            <div class="visit__item-title">
                                    <div class="visit__base--title" name="${visit.id}">Visit Cards</div>  
                                   
                                    <div class="edit__button">
                                    <i class="fas fa-edit" ></i>
                                    <i class="fas fa-trash-alt"></i>
                                    </div>
                                       
                            </div>
                            <li class="visit__fullName"><span class="span">ФИО:</span><p>${visit.fullName}</p></li>  
                            <li class="visit__doctor"><span class="span">Доктор:</span><p>${visit.doctor}</p></li>
                        </ul>
                        <input type="button" value="Показать больше" class="button__more">
                        <ul class="visit__option">
                            <li class="visit__title"><span class="span">Цель визита: </span><p>${visit.title}</p></li>
                            <li class="visit__description"><span class="span">Описание визита: </span><p>${visit.description}</p></li>
                            <li class="visit__urgency"><span class="span">Срочность: </span><p>${visit.urgency}</p></li>
                            <li class="visit__date"><p>${visit.date ? `<span class="span">Дата визита: </span>${visit.date}` : ''}</p></li>
                            <li class="visit__date"><p>${visit.dateOfLastVisit ? `<span class="span">Последний визит: </span>${visit.dateOfLastVisit}` : ''}</p></li>                                                             
                        </ul></div>
                        <div  id="test${visit.id}"></div>
                    </div>
            `;
    }

    deleteVisit(visit) {
        super.deleteVisit(visit);
    }

    editVisit(visit) {
        super.editVisit(visit);
    }

}

class VisitTherapist extends Visit {
    constructor({id, doctor, date, title, description, urgency, fullName, age}) {
        super({id, doctor, date, title, description, urgency, fullName});
        this.age = age;
    }

    renderTherapist(visit) {

        return `<div class="visit__item" >
                       <div  id="${visit.id}"> <ul class="visit__base">
                            
                            <div class="visit__item-title">
                                    <div class="visit__base--title" name="${visit.id}">Visit Cards</div>  
                                    
                                    <div class="edit__button">
                                    <i class="fas fa-edit" ></i>
                                    <i class="fas fa-trash-alt"></i>
                                    </div>
                                       
                            </div>
                            <li class="visit__fullName"><span class="span">ФИО:</span><p>${visit.fullName}</p></li>  
                            <li class="visit__doctor"><span class="span">Доктор:</span><p>${visit.doctor}</p></li>
                        </ul>
                        <input type="button" value="Показать больше" class="button__more">
                        <ul class="visit__option">
                            <li class="visit__title"><span class="span">Цель визита: </span><p>${visit.title}</p></li>
                            <li class="visit__description"><span class="span">Описание визита: </span><p>${visit.description}</p></li>
                            <li class="visit__urgency"><span class="span">Срочность: </span><p>${visit.urgency}</p></li>
                            <li class="visit__date"><p>${visit.date ? `<span class="span">Дата визита: </span>${visit.date}` : ''}</p></li>
                            <li class="visit__age"><p>${visit.age ? `<span class="span">Возраст: </span>${visit.age}` : ``}</p></li>                                               
                        </ul></div>
                        <div  id="test${visit.id}"></div>
                    </div>
            `;
    }

    deleteVisit(visit) {
        super.deleteVisit(visit);
    }

    editVisit(visit) {
        super.editVisit(visit);
    }

}


export {Visit};
export {VisitCardiologist};
export {VisitDentist};
export {VisitTherapist};
