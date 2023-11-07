// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";


// onClickIconLocation
document.querySelector('.actions-header').addEventListener('click', event => {
	const target = event.target;
	const locationList = document.querySelector('.actions-header__list');

	let count = 0;
	if (target.closest('.actions-header__item_icon_location') || target.closest('.actions-header__item_location')) {
		for (let i of locationList.children) {
			count += i.clientHeight + parseInt(window.getComputedStyle(i).marginBottom);
		}

		count + 30;

		locationList.animate([
			{ clip: 'rect(0, 150px, 0px, 0)' },
			{ clip: `rect(0, 150px, ${count / 2}px, 0)` },
			{ clip: `rect(0, 150px, ${count}px, 0)` },
		], {
			duration: 250,
			iterations: 1,
			fill: "forwards",
		})
	} else {
		for (let i of locationList.children) {
			count += i.clientHeight + parseInt(window.getComputedStyle(i).marginBottom);
		}
		locationList.animate([
			{ clip: `rect(0, 150px, ${count}px, 0)` },
			{ clip: `rect(0, 150px, ${count / 2}px, 0)` },
			{ clip: 'rect(0, 150px, 0px, 0)' },
		], {
			duration: 250,
			iterations: 1,
			fill: "forwards",
		})
	}
});


// onClick location
const actionHeader = document.querySelector('.actions-header');

const toUp = () => {
	actionHeader.querySelector('.actions-header__item_icon_location')
		.style.transform = 'translateY(-5px)';
}

actionHeader
	.querySelector('.actions-header__item_location')
	.addEventListener('mouseover', toUp);

actionHeader.querySelector('.actions-header__item_location').addEventListener('mouseout', () => {
	actionHeader.querySelector('.actions-header__item_icon_location')
		.style.transform = '';
});


// onClickEscape
document.addEventListener('keydown', event => {
	if (event.code === 'Escape') {
		document.querySelector('.actions-header__list').animate([
			{ clip: 'rect(0, 150px, 500px, 0)' },
			{ clip: 'rect(0, 150px, 250px, 0)' },
			{ clip: 'rect(0, 150px, 0px, 0)' },
		], {
			duration: 0,
			iterations: 1,
			fill: "forwards",
		});

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

	let leftListHeight = 0;
	let rightListHeight = 0;

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

	if (target.parentElement.classList.contains('menu__item')) {
		menuHeader.querySelectorAll('.menu__item')
			.forEach(item => item.classList.remove('active'));
		target.parentNode.classList.toggle('active');

		for (let i of target.parentElement.lastElementChild.firstElementChild.children) {
			leftListHeight += i.clientHeight + parseInt(window.getComputedStyle(i).marginBottom);
		}

		leftListHeight += parseInt(window.getComputedStyle(menuGrid).paddingTop) + 28;


		menuHeader.querySelectorAll('.menu__grid')
			.forEach(item => item.animate(fullClose, {
				duration: 0,
				iterations: 1,
				fill: "forwards",
			}));

		target.parentElement.lastElementChild.animate([
			{ clip: 'rect(0, 263px, 0, 0)' },
			{ clip: `rect(0, 263px, ${leftListHeight}px, 0)` },
			{ clip: `rect(0, 263px, ${leftListHeight}px, 0)` },
		], options);
	}

	if (target.parentElement.classList.contains('menu__subitem')) {
		menuHeader.querySelectorAll('.menu__subitem')
			.forEach(item => item.classList.remove('active'));
		target.parentNode.classList.add('active');

		console.log()

		for (let i of target.parentElement.parentElement.parentElement.firstElementChild.children) {
			leftListHeight += i.clientHeight + parseInt(window.getComputedStyle(i).marginBottom);
		}
		leftListHeight += parseInt(window.getComputedStyle(menuGrid).paddingTop) + 28;

		target.parentElement.parentElement.parentElement.animate([
			{ clip: `rect(0, 263px, ${leftListHeight}px, 0)` },
			{ clip: 'rect(0, 263px, 520px, 0)' },
			{ clip: 'rect(0, 655px, 520px, 0)' }
		], options);
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








