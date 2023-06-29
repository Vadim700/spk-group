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
		document.querySelector('.actions-header__list').classList.remove('open')
	}
});

// onClick Menu
const menuHeader = document.querySelector('.menu');
menuHeader.addEventListener("click", event => {
	const target = event.target;

	if (target.closest('.menu__list')) {
		event.preventDefault();
		menuHeader.querySelector('.menu__sublist').classList.add('active');
	}

	if (target.closest('.menu__subitem')) {
		menuHeader.querySelectorAll('.menu__subitem').forEach(elem => {
			elem.classList.remove('selected');
		});
		target.parentNode.classList.add('selected');
	}
});