let total = 5000,
	time = 1,
	hourRate;

const 	cms = 2500,
		changes = 1000,
		block = 500,
		page = 2500
		land = 5000,
		corp = 12000;

tabLeft = document.querySelector('.tab-left'),
tabRight = document.querySelector('.tab-right'),
blocksBlock = document.getElementById('blocks-block'),
pagesBlock = document.getElementById('pages-block'),
counterBlocks = document.getElementById('counter-blocks'),
counterPages = document.getElementById('counter-pages'),
counterHours = document.getElementById('counter-hours'),
counterRate = document.getElementById('counter-rate'),
changesCheck = document.getElementById('changes-check'),
cmsCheck = document.getElementById('cms-check'),
totalValue = document.getElementsByClassName('total-count')[0],
input = document.getElementsByTagName('input');


window.addEventListener('DOMContentLoaded', function() {

	function deleteAllValues () {
		for (let i=0; i<input.length; i++) {
			input[i].value = '';
		}
		if (changesCheck.checked) {	changesCheck.checked = false;}
		if (cmsCheck.checked) { cmsCheck.checked = false;}
	}

	tabLeft.addEventListener('click', () => {
		blocksBlock.style.display = 'flex';
		pagesBlock.style.display = 'none';

		tabLeft.classList.add('active');
		tabRight.classList.remove('active');

		deleteAllValues();

		total = land;
		totalValue.value = total;
	})

	tabRight.addEventListener('click', () => {
		blocksBlock.style.display = 'none';
		pagesBlock.style.display = 'flex';

		tabLeft.classList.remove('active');
		tabRight.classList.add('active');

		deleteAllValues();

		total = corp;
		totalValue.value = total;
	})

	counterBlocks.addEventListener('change', () => {
		counterHours.value = '';
		counterRate.value = '';
		total = counterBlocks.value * block;
		totalValue.value = total;
	})

	counterPages.addEventListener('change', () => {
		counterHours.value = '';
		counterRate.value = '';
		total = counterPages.value * page;
		totalValue.value = total;
	})

	counterHours.addEventListener('change', () => {
		counterBlocks.value = '';
		counterPages.value = '';
		total = 0;
		time = counterHours.value;
		hourRate = time * counterRate.value;
		totalValue.value = hourRate;
		total = hourRate;
	})

	counterRate.addEventListener('change', () => {
		counterBlocks.value = '';
		counterPages.value = '';
		total = 0;
		hourRate = time * counterRate.value;
		totalValue.value = hourRate;
		total = hourRate;
	})

	changesCheck.addEventListener('change', () => {
		if (changesCheck.checked) {
			total += changes;
		} else {
			total -= changes;
		}
		totalValue.value = total;
	})

	cmsCheck.addEventListener('change', () => {
		if (cmsCheck.checked) {
			total += cms;
		} else {
			total -= cms;
		}
		totalValue.value = total;
	})

})