class Toolbar {
	constructor() { throw new Error('Not create object Toolbar type'); }
	static create_tool_bar() { // main method
		// <div class="tool-bar"></div>
		const toolbar = Toolbar.CE('div', 'tool-bar');

		const row_add_rem = Toolbar.row_add_rem();
		const coll_add_rem = Toolbar.coll_add_rem();
		const cool_swap = Toolbar.coll_swap();
		const row_swap = Toolbar.row_swap();
		const color = Toolbar.color();
		
		toolbar.appendChild(row_add_rem[0]);
		toolbar.appendChild(coll_add_rem[0]);
		toolbar.appendChild(cool_swap[0]);
		toolbar.appendChild(row_swap[0]);
		toolbar.appendChild(color);

		return [toolbar, row_add_rem, coll_add_rem, cool_swap, row_swap, color];
	}

	static row_add_rem() {
		return Toolbar.add_rem('row');
	}
	
	static coll_add_rem() {
		return Toolbar.add_rem('coll');
	}

	static coll_swap() {
		return Toolbar.swap('coll');
	}
	
	static row_swap(){
		return Toolbar.swap('row');
	}

	static color() {
    // <input class="color" type="color">
		const color = Toolbar.CE('input', 'color');
		color.type = 'color';
		color.value = '#ffffff';

		return color;
	}

	static CE(name, clas) { // Create Element
		const elem = document.createElement(name);
		elem.classList.add(clas);

		return elem;
	}

	static add_rem(name) {
		// <div class="${name}_add_rem">
		//   <input class="${name}_add_rem_input" type="number" placeholder="${name} index">
		//   <button class="${name}_add_rem_add">add ${name}</button>
		//   <button class="${name}_add_rem_rem">remove ${name}</button>
		// </div>
		const add_rem = Toolbar.CE('div', `${name}_add_rem`);
		const input = Toolbar.CE('input', `${name}_row_add_rem_input`);
		input.type = 'number';
		input.placeholder = `${name} index`;

		const add_row = Toolbar.CE('button', `${name}_add_rem_add`);
		add_row.innerText = `add ${name}(in develop..)`;
		add_row.disabled = true;

		const rem_row = Toolbar.CE('button', `${name}_add_rem_rem`);
		rem_row.innerText = `remove ${name}`;

		add_rem.appendChild(input);
		add_rem.appendChild(add_row);
		add_rem.appendChild(rem_row);

		return [add_rem, input, add_row, rem_row];
	}
	
	static swap(name) {
		// <div class="${name}_swap">
		// 	<input class="${name}_swap_input_1" type="number" placeholder="first ${name} index">
		// 	<input class="${name}_swap_input_2" type="number" placeholder="second ${name} index">
		// 	<button class="${name}_swap_swap">swap ${name}s</button>
		// </div> 
		const swap = Toolbar.CE('div', `${name}_swap`);

		const input_1 = Toolbar.CE('input', `${name}_swap_input_1`);
		input_1.type = 'number';
		input_1.placeholder = `first ${name} index`;
		
		const input_2 = Toolbar.CE('input', `${name}_swap_input_2`);
		input_2.type = 'number';
		input_2.placeholder = `second ${name} index`;
		
		const button = Toolbar.CE('button', `${name}_swap_swap`);
		button.innerText = `swap ${name}s`;
		
		swap.appendChild(input_1);
		swap.appendChild(input_2);
		swap.appendChild(button);

		return [swap, input_1, input_2, button];
	}
};