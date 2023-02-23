class CellHtml extends Cell {
	cellElem; // html input element

	constructor() {
		super();
		this.create();
		this.addEventClick();
	}

	create() {
		const input = document.createElement('input');
		input.classList.add('table__input');
		this.cellElem = input;
	}

	addEventClick() {
		this.cellElem.addEventListener('input', () => {
			this.setValue(this.cellElem.value);
		});
	}

	remove_element() { this.cellElem.remove(); }

	get_element() { return this.cellElem; }
}