// При клике кнопок в блоке -Our Services- меняются вкладки и текст
let tab = document.querySelectorAll('.tabs-title');

tab.forEach(function (elem) {
    elem.addEventListener('click', function () {
        let currentTab = document.querySelector(`.tab-content[data-tab-content="${elem.dataset.tab}"]`);
        document.querySelector('.tab-content.content-active').classList.remove('content-active');
        document.querySelector('.tabs-title.active').classList.remove('active');
        document.querySelector('.tabs-title-img.current').classList.remove('current')

        currentTab.classList.add('content-active');
        elem.classList.add('active');
        elem.querySelector('.tabs-title-img').classList.add('current');
    });
});


// Переменные для  сортировки картинок в блоке -Our Amazing Work-
const workBtn = document.querySelectorAll('.work-btn');
const buttonAll = document.getElementById('all');
const buttonGraphicDesign = document.getElementById('graphicDesign');
const buttonWebDesign = document.getElementById('webDesign');
const buttonLandingPages = document.getElementById('landingPages');
const buttonWordPress = document.getElementById('wordpress');
const workMainImg = document.querySelectorAll('.work-main-img');

let workImage;

function reloadArrImg() {
    workImage = document.querySelectorAll('.work-image');
}
reloadArrImg();



let currentButton = buttonAll;
let currentTab = '.work-image';


// Сортировка картинок в блоке -Our Amazing Work-
function closeWorkBtn() {
    for (let i = 0; i < workBtn.length; i++) {
        workBtn[i].classList.remove('active');
    }
}

function closeWorkImg() {
    buttonAll.classList.remove('active'); // задаю кнопке All цвет (для симуляции не активированной кнопки)

    for (let i = 0; i < workImage.length; i++) {
        workImage[i].style.display = 'none';
    }
    closeWorkBtn();
}

function showCurrentTab(tab) {
    elements = document.querySelectorAll(tab);
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = 'inline';
    }
}


function event(button, tab) {
    button.addEventListener('click', function () {
        sortImages(button, tab);
    });
}

// функция при клике проверяет нажата ли кнопка All, если да, то показывает все картинки, если нажата другая кнопка,
// то удаляет все блоки с картинками и после этого формирует блоки с картинками с выбраной темой
function sortImages(button, tab) {
    if (button === buttonAll) {
        closeWorkBtn();
        document.querySelector('.work-main-img').style.display = 'flex';
        buttonAll.classList.add('active');
    } else {
        closeWorkImg();
        buttonAll.classList.remove('active');
        button.classList.add('active');
    }
    showCurrentTab(tab);
    currentButton = button;
    currentTab = tab;
}


function eventGo() {
    event(buttonAll, '.work-image');
    event(buttonGraphicDesign, '.graphic-design');
    event(buttonWebDesign, '.web-design');
    event(buttonLandingPages, '.landing-page');
    event(buttonWordPress, '.wordpress');
}

eventGo(); // тут функцию визываем для отработки при начальных загруженных картинках


// Подгрузка по нажатии кнопки #workImageBtn еще 12 картинок
const workImageBtn = document.getElementById('workImageBtn');

const classNameList = ['graphic-design', 'web-design', 'landing-page', 'wordpress'];
let quantityClick = 0;

workImageBtn.addEventListener('click', function () {

    function randNumberImg() {
        let choiceImg = 0;
        for (let i = 0; i < 12; i++) {
            let ind = Math.floor(Math.random() * 4); // Находит число 0-4 при выборе случайной темы для картинок в массиве classNameList
            choiceImg++;
            if (choiceImg > 10) {
                choiceImg = choiceImg - 3;
            }

            let div = document.createElement('div');
            div.className = `work-image ${classNameList[ind]}`;
            div.innerHTML = `<img class="work-image-picture" src=\"images/our-amazing-work/${classNameList[ind]}/${choiceImg}.jpg\" alt=\"#\"/> ${workMainImg[0].outerHTML}`;

            document.querySelector('.work-image-wrapper').append(div);

            workImageBtn.style.visibility = 'visible';
            barWrapper.style.display = 'none';

            reloadArrImg();
            sortImages(currentButton, currentTab);


            // Считаем сколько раз нажали кнопку, если уже 2, то убираем кнопку
            if (quantityClick === 2) {
                workImageBtn.style.display = 'none';
            }
        }
    }

    // Задержка срабатывания подгрузки картинок
    let barWrapper = document.querySelector('.bar-wrapper');

    function first() {
        setTimeout(() => randNumberImg(), 2000);
        quantityClick++;
    }

    function second() {
        workImageBtn.style.visibility = 'hidden';
        barWrapper.style.display = 'inline-block';
    }

    first();
    second();
});


// Slider
const slider = $('.slider');
const sliderBig = $('.slider-big');

$(document).ready(function () {

    slider.slick({
        adaptiveHeight: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 1000,
        autoplay: false,
        autoplaySpeed: 3000,
        centerMode: false,
        variableWidth: false,
        asNavFor: ".slider-big"
    });

    sliderBig.slick({
        arrows: false,
        fade: true,
        asNavFor: ".slider"
    });

    document.querySelectorAll('.customer-icon-small').forEach((elem) => {
        elem.setAttribute('onclick', 'clickSmallImg(this)');
    });
})


function clickSmallImg(itemImg) {
    // функция для перехода на нужную картинку в big-slider при клике в маленьком slider
    const index = itemImg.getAttribute('data-slick-index');
    $('.slider-big').slick('goTo', index);
    $('.slider').slick('goTo', index);
}




// Masonry
let $bestImages = $('.best-images-wrapper');
$(document).ready(function () {


    $bestImages.masonry({
        columnWidth: '.best-images-sizer',
        itemSelector: '.best-images-item',
        percentPosition: true,
        gutter: '.best-images-gutter',
    })


    let $itemMidWrap = $('.item-middle-wrapper').masonry({
        columnWidth: 180,
        itemSelector: '.item-middle',
        gutter: 3
    })

    let $itemSmallWrap = $('.item-small-wrapper').masonry({
        columnWidth: 120,
        itemSelector: '.item-small',
        percentPosition: true,
        gutter: '.best-images-gutter-small',
    });


    // layout Masonry after each image loads
    $bestImages.imagesLoaded().progress(function () {
        $bestImages.masonry();
    });
    $itemMidWrap.imagesLoaded().progress(function () {
        $itemMidWrap.masonry();
    });
    $itemSmallWrap.imagesLoaded().progress(function () {
        $itemSmallWrap.masonry();
    });
});


$(function () {
    const hiddenBestImages = $('.best-images-wrapper-hidden').toArray();
    const loadbestImages = $('#bestImagesBtn');
    const bestImgBtnWrap = document.querySelector('.best-images-btn-wrapper');
    let countСlickBtn = 0;

    $(loadbestImages).on('click', function () {
        countСlickBtn = countСlickBtn + 1;

        // $(hiddenBestImages).removeClass('best-images-wrapper-hidden').slideDown( "1000" );
        function createImgMasonry() {
            if (countСlickBtn === 1) {
                for (let i = 0; i < 15; i++) {
                    $(hiddenBestImages[i]).removeClass('best-images-wrapper-hidden').slideDown("1000");

                    $('.best-images-wrapper').masonry({
                        columnWidth: '.best-images-sizer',
                        itemSelector: '.best-images-item',
                        percentPosition: true,
                        gutter: '.best-images-gutter',
                    });
                }
            } else if (countСlickBtn === 2) {
                for (let i = 15; i <= 30; i++) {
                    $(hiddenBestImages[i]).removeClass('best-images-wrapper-hidden').slideDown("1000");

                    $('.best-images-wrapper').masonry({
                        columnWidth: '.best-images-sizer',
                        itemSelector: '.best-images-item',
                        percentPosition: true,
                        gutter: '.best-images-gutter',
                    });
                }
            }

            bestImgBtnWrap.querySelector('.best-images-btn').style.visibility = 'visible';
            bestImgBtnWrap.querySelector('.preloader').style.display = 'none';

            if (countСlickBtn === 2) {
                $("#bestImagesBtn").fadeOut('slow');
            }
        }

        // Задержка срабатывания подгрузки картинок
        function firstMasonryBtn() {
            setTimeout(() => createImgMasonry(), 3000);

        }

        function secondMasonryBtn() {
            bestImgBtnWrap.querySelector('.best-images-btn').style.visibility = 'hidden';
            bestImgBtnWrap.querySelector('.preloader').style.display = 'block';
        }

        firstMasonryBtn();
        secondMasonryBtn();
    });
});

