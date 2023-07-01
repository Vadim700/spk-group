// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";



document.querySelector('.actions-header').addEventListener('click', event => {
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
		document.querySelectorAll('.menu__grid').forEach(item => item.style.animation = '');
	}
});

// onClick Menu
const menuHeader = document.querySelector('.menu');
menuHeader.addEventListener("click", event => {
	const target = event.target;
	const menuGrid = menuHeader?.querySelector('.menu__grid');

	if (target.closest('.menu__item')) {
		menuHeader.querySelectorAll('.menu__item').forEach(item => item.classList.remove('active'));
		target.parentNode.classList.toggle('active');

		document.querySelectorAll('.menu__grid')
			.forEach(item => item.style.animation = '')
		target.parentElement.lastElementChild.style.animation = 'menuHulfOpen 0.7s ease-out forwards 0s';
	}

	if (target.closest('.menu__subitem')) {
		document.querySelectorAll('.menu__subitem')
			.forEach(item => item.classList.remove('selected'));
		target.parentNode.classList.add('selected');

		target.parentElement.parentElement.parentElement
			.style.animation = 'menuFullOpen 0.7s ease-out forwards 0s';
	}

	if (target.closest('.menu__sub-subitem')) {
		target.parentElement.parentElement.parentElement
			.style.animation = 'menuFullClose 0.7s ease-out forwards 0s';
	}
});

