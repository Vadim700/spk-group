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
		document.querySelectorAll('.menu__grid').forEach(item => item.animate([
			{ clip: 'rect(0, 655px, 520px, 0)' },
			{ clip: 'rect(0, 263px, 520px, 0)' },
			{ clip: 'rect(0, 263px, 0, 0)' },
		], {
			duration: 0,
			iterations: 1,
			fill: "forwards",
		}));
	}
});

// onClick Menu
const menuHeader = document.querySelector('.menu');
menuHeader.addEventListener("click", event => {
	const target = event.target;
	const menuGrid = menuHeader?.querySelector('.menu__grid');

	const fullOpen = [
		{ clip: 'rect(0, 263px, 260px, 0)' },
		{ clip: 'rect(0, 263px, 520px, 0)' },
		{ clip: 'rect(0, 655px, 520px, 0)' }
	];

	const hulfOpen = [
		{ clip: 'rect(0, 263px, 0, 0)' },
		{ clip: 'rect(0, 263px, 260px, 0)' },
		{ clip: 'rect(0, 263px, 260px, 0)' },
	];

	const fullClose = [
		{ clip: 'rect(0, 655px, 520px, 0)' },
		{ clip: 'rect(0, 263px, 520px, 0)' },
		{ clip: 'rect(0, 263px, 0, 0)' },
	];

	const hulfClose = [
		{ clip: 'rect(0, 263px, 260px, 0)' },
		{ clip: 'rect(0, 263px, 0, 0)' },
		{ clip: 'rect(0, 263px, 0, 0)' },
	];

	const options = {
		duration: 700,
		iterations: 1,
		fill: "forwards",
		easing: "ease-out",
	};

	if (target.closest('.menu__item')) {
		menuHeader.querySelectorAll('.menu__item')
			.forEach(item => item.classList.remove('active'));
		target.parentNode.classList.toggle('active');


		menuHeader.querySelectorAll('.menu__grid')
			.forEach(item => item.animate(fullClose, {
				duration: 0,
				iterations: 1,
				fill: "forwards",
			}));
		target.parentElement.lastElementChild.animate(hulfOpen, options);

		// setTimeout(() => {
		// 	target.parentElement.lastElementChild.classList.toggle('open');
		// }, 50);

		// if (target.parentElement.lastElementChild.classList.contains('open')) {
		// 	target.parentElement.lastElementChild.animate(hulfClose, {
		// 		duration: 400,
		// 		iterations: 1,
		// 		fill: "forwards",
		// 	});
		// }
	}




	if (target.closest('.menu__subitem')) {
		menuHeader.querySelectorAll('.menu__subitem')
			.forEach(item => item.classList.remove('selected'));
		target.parentNode.classList.add('selected');

		target.parentElement.parentElement.parentElement.animate(fullOpen, options);
	}

	if (target.closest('.menu__sub-subitem')) {
		target.parentElement.parentElement.parentElement.animate(fullClose, {
			duration: 500,
			iterations: 1,
			fill: "forwards",
			easing: "ease-out",
		});
	}
});








