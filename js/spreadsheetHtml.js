class SpreadsheetHtml{
	tableElem; // html div element
	spreadsheet; // new Spreadsheet(rows, colls)
	celect_color = '#ffffff';
	celect_cell = null;
	
	constructor(rows, colls) {
		this.spreadsheet = new Spreadsheet(rows, colls);

		this.create_toolbar_html();
		this.create_table_html(rows, colls);
	}

	create_toolbar_html() {
		const [toolbar, row_add_rem, coll_add_rem, coll_swap, row_swap, color] = Toolbar.create_tool_bar();
	
		this.listener_row_add_rem(row_add_rem);
		this.listener_row_swap(row_swap);
		this.listener_coll_add_rem(coll_add_rem);
		this.listener_coll_swap(coll_swap);
		this.listener_color(color);

		document.body.appendChild(toolbar);
	}

	listener_row_add_rem(row_add_rem) {
		const input = row_add_rem[1];

		// add row
		const add_button = row_add_rem[2];
		add_button.addEventListener('click', () => {
			const index = input.value;
			this.spreadsheet.addRow(index);
		});
		
		// remove row
		const rem_button = row_add_rem[3];
		rem_button.addEventListener('click', () => {
			const index = input.value;
			this.spreadsheet.removeRow(Number(index));
		});
	}
	listener_coll_add_rem(coll_add_rem) {
		const input = coll_add_rem[1];
		// add coll
		const add_button = coll_add_rem[2];
		add_button.addEventListener('click', () => {
			this.spreadsheet.addColl(Number(input.value));
			this.css_set_grid(this.spreadsheet.matrix[0].length);
		});
		
		// remove coll
		const rem_button = coll_add_rem[3];
		rem_button.addEventListener('click', () => {
			this.spreadsheet.removeColl(Number(input.value));
			this.css_set_grid(this.spreadsheet.matrix[0].length);
		});
	}
	listener_coll_swap(coll_swap) {
		const input_1 = coll_swap[1];
		const input_2 = coll_swap[2];
		const swap_button = coll_swap[3];

		swap_button.addEventListener('click', () => {
			this.spreadsheet.swapColls(Number(input_1.value), Number(input_2.value));
		});
	} 
	listener_row_swap(row_swap) {
		const input_1 = row_swap[1];
		const input_2 = row_swap[2];
		const swap_button = row_swap[3];
		swap_button.addEventListener('click', () => {
			this.spreadsheet.swapRows(Number(input_1.value), Number(input_2.value));
		});
	}
	listener_color(color) {
		color.addEventListener('input', () => {
			if (this.celect_cell == null) { return; }
			this.celect_color = color.value;
		});
	}

	create_table_html(rows, colls) {
		this.tableElem = document.createElement('div');
		this.tableElem.classList.add('table');
		
		this.css_set_grid(colls);
		this.add_cells_in_spreadsheet_html(rows, colls);
		this.add_event();

		document.body.appendChild(this.tableElem);
	}

	add_event() {
		this.tableElem.addEventListener('click', (e) => {
			if (e.target == this.tableElem) {return;}
			this.celect_cell = e.target;
			this.celect_cell.style.backgroundColor = this.celect_color;
		});
	}

	add_cells_in_spreadsheet_html(rows, colls) {
		for (let r = 0; r < rows; ++r) {
			for (let c = 0; c < colls; ++c) {
				let cell = this.spreadsheet.matrix[r][c];
				// cell.cellElem.placeholder = `${r} : ${c}`; // debug
				this.tableElem.appendChild(cell.get_element());
			}
		}
	}

	css_set_grid(colls_count) {
		this.tableElem.style.gridTemplateColumns = `repeat(${colls_count}, 100px)`;
	}
}