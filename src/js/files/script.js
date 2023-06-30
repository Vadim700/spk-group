// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";





document.addEventListener('click', event => {
	const target = event.target;
	const locationList = document.querySelector('.actions-header__list');

	// onClickIconLocation
	if (target.closest('.actions-header__item_icon_location')) {
		locationList.classList.toggle('open');
	} else {
		locationList.classList.remove('open');
	}
});

// onClickEscape
document.addEventListener('keydown', event => {
	if (event.code === 'Escape') {
		document.querySelector('.actions-header__list').classList.remove('open');
		document.querySelector('.menu__grid').classList.remove('active')
		document.querySelector('.menu__grid').classList.add('close')
	}
});

// onClick Menu
const menuHeader = document.querySelector('.menu');
menuHeader.addEventListener("click", event => {
	const target = event.target;

	const menuHeaderItem = menuHeader?.querySelector('.menu__item');
	const menuGrid = menuHeader?.querySelector('.menu__grid');
	const subMenu = menuHeader?.querySelector('.menu__sublist');
	const subSubMenu = menuHeader?.querySelector('.menu__sub-sublist');



	if (target.closest('.menu__link')) {
		menuGrid.classList.toggle('active')
	}

	if (target.closest('.menu__link')) {

		menuHeader.querySelector('.menu__item').classList.add('active');
	}
});