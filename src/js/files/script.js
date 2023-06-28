// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";





document.addEventListener('click', event => {
	const target = event.target;
	const location = document.querySelector('.actions-header__item_icon_location');
	const locationList = document.querySelector('.actions-header__list');

	if (target.closest('.actions-header__item_icon_location')) {
		locationList.classList.toggle('open');
	} else {
		locationList.classList.remove('open');
	}
});

document.addEventListener('keydown', event => {
	if (event.code === 'Escape') {
		document.querySelector('.actions-header__list').classList.remove('open')
	}
});