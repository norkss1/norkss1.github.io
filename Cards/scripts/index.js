import testLayaut from "/modules/Layout";

if ((localStorage.getItem('token')) != ''){

    document.querySelector('.visits__item-wrapper').insertAdjacentHTML("afterbegin", `<h2>No items have been added</h2>`)
}

let arrayVisitsView = [];

testLayaut.renderModalform()    // 1. выводим форму авторизации

testLayaut.responseEnter()    //  2. отправляем данные авторизации

function elementDeleteINArray(array, deleteID){
    for (let i = array.length - 1; i >= 0; i--) {
        if (array[i].id === deleteID) {
            array.splice(i, 1);
            break;
        }
    }
}

export {arrayVisitsView};
export {elementDeleteINArray};