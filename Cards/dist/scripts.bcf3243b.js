// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"modules/API.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const LINK = {
  cards: 'https://ajax.test-danit.com/api/v2/cards',
  login: 'https://ajax.test-danit.com/api/v2/cards/login'
};

function authorization() {
  const headersTemplate = {
    'Content-type': 'application/json',
    'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : undefined
  };
  return headersTemplate;
}

const auth = user => {
  return fetch(LINK.login, {
    method: 'POST',
    headers: authorization(),
    body: JSON.stringify(user)
  });
};

const getCards = () => {
  return fetch(LINK.cards, {
    headers: authorization()
  }).then(r => r.json());
};

const getOneCards = ip => {
  return fetch(`${LINK.cards}/${ip}`, {
    method: 'GET',
    headers: authorization()
  });
};

const addCard = cardObj => {
  return fetch(LINK.cards, {
    method: 'POST',
    body: JSON.stringify(cardObj),
    headers: authorization()
  });
};

const delCards = ip => {
  return fetch(`${LINK.cards}/${ip}`, {
    method: 'DELETE',
    headers: authorization()
  });
};

function changeCard(ip, changeObj) {
  return fetch(`${LINK.cards}/${ip}`, {
    method: 'PUT',
    headers: authorization(),
    body: JSON.stringify(changeObj)
  }).then(res => res.text()).then(response => response);
}

var _default = {
  getOneCards,
  changeCard,
  delCards,
  auth,
  getCards,
  addCard,
  authorization
};
exports.default = _default;
},{}],"views/visitsView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visitsView = visitsView;
exports.visitOneView = visitOneView;
exports.renderForm = renderForm;
exports.errorResponse = errorResponse;

var _sendDataFormOnServer = require("/modules/sendDataFormOnServer");

var _filters = require("../filters/filters");

var _scripts = require("../scripts");

function visitOneView(visit) {
  let visitHTML = document.querySelector('.visits__item-wrapper');

  if (visit.doctor === 'Стоматолог') {
    visitHTML.insertAdjacentHTML("afterbegin", visit.renderDentist(visit));
  } else if (visit.doctor === 'Кардиолог') {
    visitHTML.insertAdjacentHTML("afterbegin", visit.renderCardiologist(visit));
  } else if (visit.doctor === 'Терапевт') {
    visitHTML.insertAdjacentHTML("afterbegin", visit.renderTherapist(visit));
  }

  visit.deleteVisit(visit);
  visit.editVisit(visit);
}

function visitsView(visitsArray) {
  let visitHTML = document.querySelector('.visits__item-wrapper');
  visitHTML.innerHTML = '';

  if (!visitsArray.length) {
    visitHTML.insertAdjacentHTML("afterbegin", `<h2>No items have been added</h2>`);
  } else {
    visitsArray.forEach(visit => {
      visitOneView(visit);
    });
  }

  const items = document.querySelectorAll('.button__more');

  for (const item of items) {
    item.addEventListener('click', () => {
      shoowInput(item);
    });
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
  const elem = document.getElementById(`${editID}`);
  const form = document.getElementById(`test${editID}`);
  elem.style.display = "none";

  if (arg.doctor === "Стоматолог") {
    const {
      doctor,
      id,
      urgency,
      date,
      title,
      description,
      dateOfLastVisit,
      fullName
    } = arg;
    form.insertAdjacentHTML('afterend', ` 
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
                        `);
  }

  if (arg.doctor === 'Кардиолог') {
    const {
      age,
      id,
      bodyMass,
      date,
      description,
      disease,
      doctor,
      fullName,
      pressure,
      title,
      urgency
    } = arg;
    form.insertAdjacentHTML('afterend', `
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
                        `);
  }

  if (arg.doctor === 'Терапевт') {
    const {
      age,
      id,
      date,
      description,
      doctor,
      fullName,
      title,
      urgency
    } = arg;
    form.insertAdjacentHTML('afterend', `
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
                        `);
  }

  form.parentElement.querySelector('.button__edit').addEventListener(`click`, () => {
    (0, _sendDataFormOnServer.cardObjEdit)(editID);
  });
  form.parentElement.querySelector('.button__undo').addEventListener(`click`, () => {
    (0, _filters.visitLayout)(_scripts.arrayVisitsView);
  });
}

function errorResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return res.text().then(error => {
    const e = new Error('Упс  , что то пошло не так...');
    e.data = error;
    throw e;
  });
}
},{"/modules/sendDataFormOnServer":"modules/sendDataFormOnServer.js","../filters/filters":"filters/filters.js","../scripts":"scripts/index.js"}],"filters/filters.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visitLayout = visitLayout;

var _visitsView = require("/views/visitsView");

const STATUS_FILTER = ['All', 'open', 'done'];
const PRIORITY_FILTER = ['All', 'Неотложная', 'Приоритетная', 'Обычная']; // Рендер страницы с формами и списком выбора фильтра

function visitLayout(filterArray) {
  function renderFilters() {
    // Рендер страницы с формами
    let html = '<div><div class="filters-header" id="filtersHeader">';
    html += `<div class="container"><div class="row">
                <div class="col-sm">
                    <label class="status-label">Status:</label>
                        <select class="form-select" id="status-filter">
                                    ${STATUS_FILTER.map(option => `
                            <option value="${option}">${option}</option>`)}
                        </select>
                </div>`;
    html += `<div class="col-sm">
                <label class="status-label">Priority:</label>
                <select class="form-select" id="priority-filter">
                           ${PRIORITY_FILTER.map(option => `
                    <option value="${option}">
                        ${option}
                    </option>`)}
                </select>
             </div>`;
    html += `<div class="search col-sm">
                <label for="session-search" class="form-label">Search:</label>
                <input class="search-input" id="cardsSearch" type="search" value="" />
             </div>`;
    html += '</div></div>';
    document.querySelector('.filters').innerHTML = html;
  }

  renderFilters(); // Фильтр

  const filter = document.getElementById('filtersHeader');
  filter.addEventListener('input', statusGoods);
  outputGoods(filterArray); // запуск функции для начального отображения

  function statusGoods() {
    let status = document.getElementById('status-filter').value;
    let priority = document.getElementById('priority-filter').value;
    const search = document.getElementById('cardsSearch').value.toString().toLowerCase(); // Проверка на наличие текста и если текст есть, то картинку не показывать

    if (search !== '') {
      document.getElementById('cardsSearch').style.background = 'none';
    } else {
      document.getElementById('cardsSearch').style.background = 'url(https://img.icons8.com/plasticine/30/000000/google-web-search.png) no-repeat';
    }

    let currentDate = new Date().getTime();
    outputGoods(filterArray.filter(n => (priority === 'All' || n.urgency === priority) && ( // фильтр по приоритету
    status === 'All' || // фильтр по статусу
    new Date(n.date).getTime() < currentDate && status === 'done' || new Date(n.date).getTime() > currentDate && status === 'open') && ( // фильтр по вводу текста
    n.doctor.toLowerCase().includes(search) || n.description.toLowerCase().includes(search) || n.fullName.toLowerCase().includes(search))));
  }

  function outputGoods(goods) {
    (0, _visitsView.visitsView)(goods);
  }
}
},{"/views/visitsView":"views/visitsView.js"}],"models/visitsModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisitTherapist = exports.VisitDentist = exports.VisitCardiologist = exports.Visit = void 0;

var _API = _interopRequireDefault(require("../modules/API"));

var _scripts = require("../scripts");

var _filters = require("../filters/filters");

var _visitsView = require("../views/visitsView");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Visit {
  constructor({
    id,
    doctor,
    date,
    title,
    description,
    urgency,
    fullName
  }) {
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
    deleteIcon.addEventListener('click', elem => {
      elem.preventDefault();
      const deleteID = visit.id;

      _API.default.delCards(deleteID).then(res => {
        if (res.ok) {
          elem.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
        }
      });

      (0, _scripts.elementDeleteINArray)(_scripts.arrayVisitsView, deleteID);
      (0, _filters.visitLayout)(_scripts.arrayVisitsView);
    });
  }

  editVisit(visit) {
    const editIcon = document.getElementById(`${visit.id}`).querySelector('.fa-edit');
    editIcon.addEventListener('click', elem => {
      elem.preventDefault();
      const editID = visit.id;
      (0, _visitsView.renderForm)(this, editID);
    });
  }

}

exports.Visit = Visit;

class VisitCardiologist extends Visit {
  constructor({
    id,
    doctor,
    date,
    title,
    description,
    urgency,
    fullName,
    pressure,
    bodyMass,
    disease,
    age
  }) {
    super({
      id,
      doctor,
      date,
      title,
      description,
      urgency,
      fullName
    });
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
                            <li class="visit__pressure"><p>${visit.pressure ? `<span class="span">Давление: </span> ${visit.pressure}` : ''}</p></li>
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

exports.VisitCardiologist = VisitCardiologist;

class VisitDentist extends Visit {
  constructor({
    id,
    doctor,
    date,
    title,
    description,
    urgency,
    fullName,
    dateOfLastVisit
  }) {
    super({
      id,
      doctor,
      date,
      title,
      description,
      urgency,
      fullName
    });
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

exports.VisitDentist = VisitDentist;

class VisitTherapist extends Visit {
  constructor({
    id,
    doctor,
    date,
    title,
    description,
    urgency,
    fullName,
    age
  }) {
    super({
      id,
      doctor,
      date,
      title,
      description,
      urgency,
      fullName
    });
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

exports.VisitTherapist = VisitTherapist;
},{"../modules/API":"modules/API.js","../scripts":"scripts/index.js","../filters/filters":"filters/filters.js","../views/visitsView":"views/visitsView.js"}],"modules/getVisitsFromServer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVisits = getVisits;
exports.createVisitForView = createVisitForView;

var _API = _interopRequireDefault(require("/modules/API.js"));

var _filters = require("/filters/filters.js");

var _index = require("/scripts/index.js");

var _visitsModel = require("../models/visitsModel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getVisits() {
  _API.default.getCards().then(responses => {
    responses.forEach(response => {
      createVisitForView(response);
    });
    (0, _filters.visitLayout)(_index.arrayVisitsView);
  });
}

function createVisitForView(object) {
  //создает обьект согласно нужного класса. Добавялет обьект в массив для отображения
  let cardObjView = {};

  if (object.doctor === 'Стоматолог') {
    cardObjView = new _visitsModel.VisitDentist(object);
  } else if (object.doctor === 'Кардиолог') {
    cardObjView = new _visitsModel.VisitCardiologist(object);
  } else if (object.doctor === 'Терапевт') {
    cardObjView = new _visitsModel.VisitTherapist(object);
  }

  _index.arrayVisitsView.push(cardObjView);
}
},{"/modules/API.js":"modules/API.js","/filters/filters.js":"filters/filters.js","/scripts/index.js":"scripts/index.js","../models/visitsModel":"models/visitsModel.js"}],"modules/sendDataFormOnServer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cardObjCreate = cardObjCreate;
exports.cardObjEdit = cardObjEdit;

var _API = _interopRequireDefault(require("/modules/API.js"));

var _getVisitsFromServer = require("/modules/getVisitsFromServer.js");

var _Layout = require("/modules/Layout.js");

var _Layout2 = _interopRequireDefault(require("/modules/Layout"));

var _filters = require("../filters/filters");

var _scripts = require("../scripts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Функция формирования обьекта запроса
//Функция отправки запроса на создание визита на серевере + получение ответа сервера
function cardObjCreate() {
  const form = document.querySelector('#form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    let testObj = {};
    const formData = new FormData(form);

    for (let [key, value] of formData.entries()) {
      testObj[key] = value;

      if (value === '') {
        return false;
      }
    }

    _API.default.addCard(testObj).then(r => (0, _Layout.errorResponse)(r)).then(res => {
      form.reset();

      _Layout2.default.newForm();

      (0, _getVisitsFromServer.createVisitForView)(JSON.parse(res));
      (0, _filters.visitLayout)(_scripts.arrayVisitsView);
    });
  });
}

function cardObjEdit(id) {
  const form = document.getElementById(`form__edit_${id}`);
  let cardObj = {};
  const formData = new FormData(form);

  for (let [key, value] of formData.entries()) {
    cardObj[key] = value;

    if (value === '') {
      return false;
    }
  }

  _API.default.changeCard(id, cardObj).then(response => {
    return JSON.parse(response);
  }).then(res => {
    (0, _scripts.elementDeleteINArray)(_scripts.arrayVisitsView, res.id);
    (0, _getVisitsFromServer.createVisitForView)(res);
    (0, _filters.visitLayout)(_scripts.arrayVisitsView);
  });
}
},{"/modules/API.js":"modules/API.js","/modules/getVisitsFromServer.js":"modules/getVisitsFromServer.js","/modules/Layout.js":"modules/Layout.js","/modules/Layout":"modules/Layout.js","../filters/filters":"filters/filters.js","../scripts":"scripts/index.js"}],"modules/ClassModal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = void 0;

class Modal {
  constructor(title, content, selector) {
    this.selector = selector;
    this.title = title;
    this.content = content;
  }

  renderModal() {
    const modal = document.querySelector(this.selector);
    modal.insertAdjacentHTML('afterbegin', `<button type="button" id='button-enter' class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                          ${this.title}
                        </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">${this.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <form id="form"><div class="modal-body">
                  ${this.content}
                  </div>
                  <div class="modal-footer">
                    <button type="submit" id="submit" class="btn btn-primary">Отправить</button>
                  </div></form>
                </div>
              </div>
     </div>`);
  }

}

exports.Modal = Modal;
},{}],"modules/classInputs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formLogin = formLogin;
exports.Input = void 0;

class Input {
  constructor(typeInput, classInput, nameInput, label) {
    this.typeInput = typeInput;
    this.classInput = classInput;
    this.name = nameInput;
    this.label = label;
  }

  renderInput() {
    return `<label  class="form-label clear">${this.label}</label>
<input type=${this.typeInput} class="clear ${this.classInput}" name=${this.name}>`;
  }

}

exports.Input = Input;

function loginForm() {
  const elem1 = new Input("email", "form-control", "email", "Емейл");
  const elem2 = new Input("password", "form-control", "password", "Пароль");
  return `${elem1.renderInput()} ${elem2.renderInput()}`;
}

function formLogin() {
  const form = document.createElement('div');
  return form.innerHTML = loginForm();
}
},{}],"modules/classSelect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Select = void 0;

class Select {
  constructor(classSelect, nameSelect, stringSelect) {
    this.classSelect = classSelect;
    this.nameSelect = nameSelect;
    this.stringSelect = stringSelect;
  }

  renderSelect() {
    const comma = ',';
    const arrayString = this.stringSelect.split(comma);
    return `<select   class="${arrayString[4]} ${this.classSelect}" name=${this.nameSelect} >
            <option selected >${arrayString[0]}</option>
            <option value="${arrayString[1]}">${arrayString[1]}</option>
            <option value="${arrayString[2]}">${arrayString[2]}</option>
            <option value="${arrayString[3]}">${arrayString[3]}</option>
        </select> 
`;
  }

}

exports.Select = Select;
},{}],"modules/classTextarea.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Textarea = void 0;

class Textarea {
  constructor(rows, cols, name, label, classTextarea) {
    this.rows = rows;
    this.cols = cols;
    this.name = name;
    this.label = label;
    this.class = classTextarea;
  }

  renderTextarea() {
    return `  <label  class="form-label clear">${this.label}</label>
  <textarea rows=${this.rows} class=${this.class} cols=${this.cols} name=${this.name}></textarea>`;
  }

}

exports.Textarea = Textarea;
},{}],"modules/classForms.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormTherapist = exports.FormDentist = exports.FormCardiolog = exports.Form = void 0;

var _classInputs = require("./classInputs");

var _classSelect = require("./classSelect");

var _classTextarea = require("./classTextarea");

class Form {
  constructor() {}

  renderDoctor() {
    const form = document.createElement('div');
    const elemSelect = new _classSelect.Select("form-select", "urgency", 'Срочность,Обычная,Приоритетная,Неотложная,clear');
    const elemCreate2 = new _classInputs.Input("text", "form-control", "title", "Введите цель визита");
    const elemCreate4 = new _classInputs.Input("text", "form-control", "fullName", "Введите Фамилию Имя Отчество");
    const elemTextarea = new _classTextarea.Textarea("5", "58", "description", "Краткое описание визита", "clear");
    return form.innerHTML = `

${elemSelect.renderSelect()} 
${elemCreate2.renderInput()}
${elemCreate4.renderInput()}
${elemTextarea.renderTextarea()}`;
  }

  static formValid() {
    const form = document.querySelector('#form');
    const formReq = document.querySelectorAll('.form-control');
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const errors = form.querySelectorAll('.error');

      for (let i = 0; i < errors.length; i++) {
        errors[i].remove();
      }

      for (let i = 0; i < formReq.length; i++) {
        if (!formReq[i].value) {
          const error = document.createElement('div');
          error.className = 'error';
          error.style.color = 'red';
          error.innerHTML = 'Не заполненое поле ';
          form[i].parentElement.insertBefore(error, formReq[i]);
        }
      }
    });
  }

}

exports.Form = Form;

class FormCardiolog extends Form {
  constructor() {
    super();
  }

  renderDoctor() {
    const form = document.createElement('div');
    const elemCreate1 = new _classInputs.Input("date", "form-control", "date", "Введите дату визита ");
    const elemCreate5 = new _classInputs.Input("text", "form-control", "pressure", "Введите давление в формате XXX/XX");
    const elemCreate6 = new _classInputs.Input("text", "form-control", "bodyMass", "Введите массу тела");
    const elemCreate7 = new _classInputs.Input("text", "form-control", "disease", "Введите перенесенные заболевания сердечно-сосудистой системы");
    const elemCreate8 = new _classInputs.Input("text", "form-control", "age", "Введите возраст пациента");
    return form.innerHTML = `

${elemCreate1.renderInput()}
${elemCreate5.renderInput()}
${elemCreate6.renderInput()}
${elemCreate7.renderInput()}
${elemCreate8.renderInput()}
`;
  }

}

exports.FormCardiolog = FormCardiolog;

class FormDentist extends Form {
  constructor() {
    super();
  }

  renderDoctor() {
    const form = document.createElement('div');
    const elemCreate1 = new _classInputs.Input("date", "form-control", "date", "Введите дату визита ");
    const elemCreate5 = new _classInputs.Input("date", "form-control", "dateOfLastVisit", "Введите дату последнего визита ");
    return form.innerHTML = `
${elemCreate1.renderInput()}
${elemCreate5.renderInput()}

`;
  }

}

exports.FormDentist = FormDentist;

class FormTherapist extends Form {
  constructor() {
    super();
  }

  renderDoctor() {
    const form = document.createElement('div');
    const elemCreate1 = new _classInputs.Input("date", "form-control", "date", "Введите дату визита ");
    const elemCreate8 = new _classInputs.Input("text", "form-control", "age", "Введите возраст пациента");
    return form.innerHTML = `
${elemCreate1.renderInput()}
${elemCreate8.renderInput()}
`;
  }

}

exports.FormTherapist = FormTherapist;
},{"./classInputs":"modules/classInputs.js","./classSelect":"modules/classSelect.js","./classTextarea":"modules/classTextarea.js"}],"modules/Layout.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorResponse = errorResponse;
exports.default = void 0;

var _API = _interopRequireDefault(require("/modules/API.js"));

var _sendDataFormOnServer = require("/modules/sendDataFormOnServer");

var _getVisitsFromServer = require("./getVisitsFromServer");

var _ClassModal = require("./ClassModal");

var _classInputs = require("./classInputs");

var _classSelect = require("./classSelect");

var _classForms = require("./classForms");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init() {
  const token = localStorage.getItem('token');

  if (token) {
    newForm();
    (0, _getVisitsFromServer.getVisits)();
  } else {
    document.querySelector('.visits__item-wrapper').insertAdjacentHTML("afterbegin", `<h2>No items have been added</h2>`);
    renderModalform();
    responseEnter();
  }
} //форма авторизации


function renderModalform() {
  const modalLogin = new _ClassModal.Modal('Войти', (0, _classInputs.formLogin)(), '.header');
  modalLogin.renderModal();

  _classForms.Form.formValid();
} // отправка запроса авторизации


function responseEnter() {
  const getBtn = document.getElementById('submit');
  const email = document.querySelector('[name="email"]');
  const password = document.querySelector('[name="password"]');
  getBtn.addEventListener('click', () => {
    _API.default.auth({
      email: email.value // "comandLink@gmail.com"
      ,
      password: // "1234567890"
      password.value
    }).then(r => errorResponse(r)).then(token => {
      localStorage.setItem('token', `${token}`);
      init();
    });
  });
} // Обработка ошибок при отпраавке запроса


function errorResponse(res) {
  if (res.ok) {
    return res.text();
  }

  return res.text().then(error => {
    const e = new Error('Упс  , что то пошло не так...');
    e.data = error;
    throw e;
  });
} // создаем форму в модальном окне и выводим туда список выбора докторов


function newForm() {
  const enter = document.getElementById('button-enter');
  const modal = document.querySelector('.btn-close');
  const buttonCreateVisit = document.querySelector('.header');
  const btnExit = document.querySelector(".btn-exit");
  const elemSelect = new _classSelect.Select("form-select", "doctor", "Выбор Врача,Кардиолог,Стоматолог,Терапевт,doctor");
  const ModalCreate = new _ClassModal.Modal('Создать Визит', elemSelect.renderSelect(), '.header');
  ModalCreate.renderModal();

  if (btnExit) {
    btnExit.remove();
  }

  if (enter) {
    enter.remove();
    modal.click();
  }

  const buttonExit = document.createElement('input');
  buttonExit.classList.add("btn-exit");
  buttonExit.type = "button";
  buttonExit.value = "Выйти";
  buttonCreateVisit.prepend(buttonExit);
  exit();
  let returnValue = 0;
  let selector = document.querySelector('[name="doctor"]');
  selector.addEventListener('change', function () {
    returnValue = this.value;
    additionalForm(this.value);
  }, false);
  (0, _sendDataFormOnServer.cardObjCreate)();
} // функция вычисления значения селекта выбора докторов


function element() {
  let selector = document.querySelector('[name="doctor"]');
  let returnValue = 0;
  selector.addEventListener('change', function () {
    returnValue = this.value;
  }, false);
} // функция определения времени. Чтобы вставить в нашу форму на позицию текущей даты


function dateNow() {
  let name_input;
  document.addEventListener('DOMContentLoaded', function () {
    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    name_input = document.getElementById('dateNow');
    name_input.value = day + "-" + month + "-" + year;
  });
  return name_input;
} //    Функция генерации дополнительныъ полей ввода в модальном окне после выбора доктора


function additionalForm(value) {
  const enterAdd = document.querySelector('[name="doctor"]');
  let renderForm = '';
  const elementsArr = document.querySelectorAll('.clear');
  elementsArr.forEach(elem => {
    elem.remove();
  });

  if (value === 'Кардиолог') {
    renderForm = new _classForms.FormCardiolog();
  } else if (value === 'Стоматолог') {
    renderForm = new _classForms.FormDentist();
  } else if (value === 'Терапевт') {
    renderForm = new _classForms.FormTherapist();
  }

  const SiblingsInput = new _classForms.Form();
  dateNow();
  enterAdd.insertAdjacentHTML('afterend', `${SiblingsInput.renderDoctor()}${renderForm.renderDoctor()}`);

  _classForms.Form.formValid();
}

function exit() {
  const btnExit = document.querySelector(".btn-exit");
  btnExit.addEventListener('click', () => {
    localStorage.removeItem('token');
    location.reload();
  });
}

var _default = {
  additionalForm,
  renderModalform,
  responseEnter,
  element,
  init,
  exit,
  newForm,
  errorResponse
};
exports.default = _default;
},{"/modules/API.js":"modules/API.js","/modules/sendDataFormOnServer":"modules/sendDataFormOnServer.js","./getVisitsFromServer":"modules/getVisitsFromServer.js","./ClassModal":"modules/ClassModal.js","./classInputs":"modules/classInputs.js","./classSelect":"modules/classSelect.js","./classForms":"modules/classForms.js"}],"scripts/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elementDeleteINArray = elementDeleteINArray;
exports.arrayVisitsView = void 0;

var _Layout = _interopRequireDefault(require("/modules/Layout"));

var _getVisitsFromServer = require("../modules/getVisitsFromServer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Layout.default.init();

let arrayVisitsView = [];
exports.arrayVisitsView = arrayVisitsView;

function elementDeleteINArray(array, deleteID) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i].id === deleteID) {
      array.splice(i, 1);
      break;
    }
  }
}
},{"/modules/Layout":"modules/Layout.js","../modules/getVisitsFromServer":"modules/getVisitsFromServer.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59873" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/index.js"], null)
//# sourceMappingURL=/scripts.bcf3243b.js.map